const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../Controllers/productController');

const checkAuth = require('../Middlewares/authMiddleware');
const checkRole = require('../Middlewares/roleMiddleware');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', checkAuth, checkRole('POS'), createProduct);
router.put('/:id', checkAuth, checkRole('POS'), updateProduct);
router.delete('/:id', checkAuth, checkRole('POS'), deleteProduct);


module.exports = router;
