const express = require('express');
const router = express.Router();
const admin = require('firebase-admin'); // <--- IMPORTA admin aquí
const  checkAuth  = require('../Middlewares/authMiddleware');

router.get('/', checkAuth, async (req, res) => {
  const uid = req.user.uid;
  try {
    const snapshot = await admin.database().ref(`historial/${uid}`).once('value');
    const historial = snapshot.val() || [];
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial' });
  }
});

router.post('/', checkAuth, async (req, res) => {
  const uid = req.user.uid;
  const order = req.body;

  try {
    const ref = admin.database().ref(`historial/${uid}`).push();
    await ref.set(order);
    res.status(201).json({ id: ref.key, ...order });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar historial' });
  }
});

module.exports = router;
