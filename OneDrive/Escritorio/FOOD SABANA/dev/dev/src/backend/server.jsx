const express = require('express');
const cors = require('cors');
const app = express();

const admin = require('./Config/firebaseAdmin');

const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoute');
const historialRoutes = require('./Routes/historialRoutes');
const ventasRoutes = require('./Routes/salesRoutes');

const checkAuth = require('./Middlewares/authMiddleware');
const checkRole = require('./Middlewares/roleMiddleware');

// 1. Lista de orígenes permitidos (sin barras al final)
const allowedOrigins = [
  'http://localhost:3000',          // Frontend local
  'http://localhost:3001',          // Otro puerto local si es necesario
  'https://dev-julians-projects-fa783d41.vercel.app'   
];

// 2. Configuración detallada de CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como apps móviles, Postman, curl)
    if (!origin) return callback(null, true);
    
    // Verificación flexible de orígenes permitidos
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      // Comparación exacta o coincidencia de subdominios/rutas
      return origin === allowedOrigin || 
             origin.startsWith(`${allowedOrigin}/`) || 
             origin.startsWith(`${allowedOrigin}:`);
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn('[CORS] Origen no permitido:', origin);
      callback(new Error('No permitido por CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'X-Requested-With',
    'X-Access-Token'
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false,
  maxAge: 86400 // Cachear opciones CORS por 24 horas
};

// 3. Middlewares esenciales
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Configuración de rutas
app.use('/api/productos', productRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/users', userRoutes);

// 5. Rutas de prueba y verificación
app.get('/public', (req, res) => {
  res.status(200).json({ 
    message: 'Esta es una ruta pública',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    serverTime: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 6. Rutas protegidas con autenticación y roles
app.get('/pos', checkAuth, checkRole('pos'), (req, res) => {
  res.status(200).json({
    message: 'Bienvenido, usuario POS. Esta ruta está protegida',
    user: req.user // Asumiendo que el middleware auth añade el usuario
  });
});

app.get('/cliente', checkAuth, checkRole('cliente'), (req, res) => {
  res.status(200).json({
    message: 'Bienvenido, usuario Cliente. Esta ruta está protegida',
    user: req.user
  });
});

// 7. Manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error('[Error]', err.stack);
  
  if (err.message === 'No permitido por CORS') {
    return res.status(403).json({
      error: 'Acceso prohibido',
      message: 'El origen de la solicitud no está autorizado'
    });
  }

  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'production' 
      ? 'Ocurrió un error' 
      : err.message
  });
});

// 8. Iniciar servidor
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Entorno: ${ENV}`);
  console.log(`Orígenes permitidos: ${allowedOrigins.join(', ')}`);
  console.log(`Hora de inicio: ${new Date().toLocaleString()}`);
});

// 9. Manejo de cierre elegante
process.on('SIGINT', () => {
  console.log('\nRecibida señal SIGINT. Cerrando servidor...');
  process.exit(0);
});