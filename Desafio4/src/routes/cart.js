import express from 'express';
import cartController from '../controllers/cartController'; // Cambio aquí

const router = express.Router();

router.post('/', cartController.createCart); // Cambio aquí
router.get('/:cid', cartController.getCartProducts); // Cambio aquí
router.post('/:cid/product/:pid', cartController.addProductToCart); // Cambio aquí

// Manejo de errores
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

export default router;
