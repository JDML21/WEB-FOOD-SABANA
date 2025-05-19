// backend/Routes/ventasRoutes.js
const express = require('express');
const router = express.Router();
const admin = require('../Config/firebaseAdmin');
const checkAuth = require('../Middlewares/authMiddleware');

// Obtener todas las ventas (opcional: solo ventas del usuario autenticado)
router.get('/', checkAuth, async (req, res) => {
  try {
    // Para todos los usuarios:
    // const snapshot = await admin.database().ref('ventas').once('value');

    // Para solo el usuario autenticado (recomendado):
    const uid = req.user.uid;
    const snapshot = await admin.database().ref(`ventas/${uid}`).once('value');

    const ventas = snapshot.val() || {};
    // Convierte de objeto a array con IDs
    const ventasArray = Object.entries(ventas).map(([id, venta]) => ({
      id,
      ...venta,
    }));

    res.json(ventasArray);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
});

// Obtener una venta por id
router.get('/:id', checkAuth, async (req, res) => {
  const uid = req.user.uid;
  const id = req.params.id;

  try {
    const snapshot = await admin.database().ref(`ventas/${uid}/${id}`).once('value');
    const venta = snapshot.val();
    if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });

    res.json({ id, ...venta });
  } catch (error) {
    console.error('Error al obtener venta:', error);
    res.status(500).json({ error: 'Error al obtener venta' });
  }
});

// Crear una nueva venta
router.post('/', checkAuth, async (req, res) => {
  const uid = req.user.uid;
  const venta = req.body;

  try {
    const ref = admin.database().ref(`ventas/${uid}`).push();
    await ref.set(venta);
    res.status(201).json({ id: ref.key, ...venta });
  } catch (error) {
    console.error('Error al crear venta:', error);
    res.status(500).json({ error: 'Error al crear venta' });
  }
});

// Actualizar estado de una venta
router.put('/:id', checkAuth, async (req, res) => {
  const uid = req.user.uid;
  const id = req.params.id;
  const { status } = req.body;

  if (!status) return res.status(400).json({ error: 'Falta el campo status' });

  try {
    const ventaRef = admin.database().ref(`ventas/${uid}/${id}`);
    const snapshot = await ventaRef.once('value');
    if (!snapshot.exists()) return res.status(404).json({ error: 'Venta no encontrada' });

    await ventaRef.update({ status });
    res.json({ message: 'Estado actualizado' });
  } catch (error) {
    console.error('Error al actualizar venta:', error);
    res.status(500).json({ error: 'Error al actualizar venta' });
  }
});

module.exports = router;
