const admin = require('../Config/firebaseAdmin');

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // Extraer token quitando "Bearer " si está presente
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Consultar Firestore para obtener el rol
    const userDoc = await admin.firestore().collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(403).json({ error: 'Usuario no registrado en Firestore' });
    }

    const userData = userDoc.data();

    if (!userData.role) {
      return res.status(403).json({ error: 'Usuario sin rol asignado' });
    }

    // Guardar datos del usuario en req.user para usar en las rutas
    req.user = {
      uid,
      email: decodedToken.email,
      role: userData.role,
    };

    next();
  } catch (error) {
    console.error("Error verificando token:", error);
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = checkAuth;
