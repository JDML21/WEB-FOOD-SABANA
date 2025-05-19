const admin = require('../Config/firebaseAdmin');
const db = admin.database();

const getAllProducts = async (req, res) => {
  try {
    const snapshot = await db.ref('productos').once('value');
    const productos = snapshot.val() || {};
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

const getProductById = async (req, res) => {
  try {
    const snapshot = await db.ref(`productos/${req.params.id}`).once('value');
    if (!snapshot.exists()) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(snapshot.val());
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

const createProduct = async (req, res) => {
  try {
    const ref = db.ref('productos').push();
    await ref.set(req.body);
    res.status(201).json({ id: ref.key, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID es obligatorio" });
    }

    if (!updatedFields || Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ error: "Datos para actualizar son requeridos" });
    }

    // Actualizar en Firebase
    await db.ref(`productos/${id}`).update(updatedFields);

    // Obtener producto actualizado
    const snapshot = await db.ref(`productos/${id}`).once('value');
    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json({ id, ...snapshot.val() });
  } catch (error) {
    console.error("Error en updateProduct:", error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};




const deleteProduct = async (req, res) => {
  try {
    await db.ref(`productos/${req.params.id}`).remove();
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
