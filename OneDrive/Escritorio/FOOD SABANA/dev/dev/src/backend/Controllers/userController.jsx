
const admin = require('../Config/firebaseAdmin');

// Obtener información de usuario
const getUserInfo = async (req, res) => {
  const uid = req.params.uid;

  try {
    const userRecord = await admin.auth().getUser(uid);
    res.status(200).json({
      uid: userRecord.uid,
      email: userRecord.email,
      role: userRecord.customClaims?.role || 'sin rol',
    });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el usuario' });
  }
};
const assignRoleToUser = async (req, res) => {
  const { uid, role } = req.body; // Ahora toma el rol desde la solicitud

  if (!role || !uid) {
    return res.status(400).json({ error: 'Faltan parámetros (uid o rol)' });
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { role }); // Usando el rol dinámico
    res.status(200).json({ message: `Rol ${role} asignado al usuario ${uid}` });
  } catch (error) {
    res.status(500).json({ error: 'Error al asignar rol' });
  }
};

const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    console.log('Token decodificado:', decodedToken);

    req.user = decodedToken;
    req.userRole = decodedToken.role || null; // ✅ Corrige aquí

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};



module.exports = {
  getUserInfo,
  assignRoleToUser,
  verifyToken,
};
