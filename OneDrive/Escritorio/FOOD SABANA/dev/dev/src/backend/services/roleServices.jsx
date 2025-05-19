const admin = require('../Config/firebaseAdmin');

const assignRoleToUser = async (uid, role) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`Rol ${role} asignado al usuario ${uid}`);
  } catch (error) {
    console.error('Error al asignar el rol:', error);
  }
};

module.exports = { assignRoleToUser };
