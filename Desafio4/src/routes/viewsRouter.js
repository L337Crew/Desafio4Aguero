// views.routes.js
import express from 'express';

const viewsRouter = express.Router();

// Ruta para la página de chat
viewsRouter.get('/chat', (req, res) => {
  res.render('chat');
});

// Ruta para la página de inicio
viewsRouter.get('/', (req, res) => {
  const products = []; // Obtener los productos de tu lógica existente
  res.render('home', { products });
});

// Ruta para la página de productos en tiempo real
viewsRouter.get('/realtimeproducts', (req, res) => {
  const products = []; // Obtener los productos de tu lógica existente
  res.render('realtimeproducts', { products });
});

export default viewsRouter;
