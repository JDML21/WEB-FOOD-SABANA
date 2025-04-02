const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Datos en memoria
let products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Teclado", price: 45 }
];

// GET /products → Devuelve todos los productos
app.get('/products', (req, res) => {
    res.json(products);
});

// GET /products/:id → Devuelve un producto por ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
});

// POST /products → Agrega un nuevo producto
app.post('/products', (req, res) => {
    const { id, name, price } = req.body;

    // Validar que el ID sea único
    if (products.some(p => p.id === id)) {
        return res.status(400).json({ error: "El ID ya existe" });
    }
    
    const newProduct = { id, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
