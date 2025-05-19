const express = require('express');
const router = express.Router();
const admin = require('../Config/firebaseAdmin');
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

// ✅ Endpoint seguro para obtener información del usuario
const { getUserInfo, verifyToken } = require('../Controllers/userController');
router.get('/user/:uid', verifyToken, getUserInfo);

// ✅ Nuevo endpoint para asignar el rol leyendo desde Firestore
router.post('/refresh-role', verifyToken, async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: 'El UID es requerido' });
  }

  try {
    // 🔍 Buscar el documento del usuario en Firestore
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Usuario no encontrado en Firestore' });
    }

    const { role } = userDoc.data();
    if (!role) {
      return res.status(400).json({ error: 'El rol no está definido para este usuario' });
    }

    // ✅ Asignar custom claims
    await admin.auth().setCustomUserClaims(uid, { role });

    // 🔁 Verifica los claims asignados
    const user = await admin.auth().getUser(uid);
    console.log(`✅ Claims asignados a ${uid}:`, user.customClaims);

    res.json({ message: `Rol '${role}' asignado correctamente a ${uid}` });
  } catch (error) {
    console.error('❌ Error al asignar rol:', error);
    res.status(500).json({ error: 'Error interno al actualizar rol' });
  }
});

module.exports = router;
