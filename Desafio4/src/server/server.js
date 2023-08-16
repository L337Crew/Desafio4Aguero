import express from 'express';
import http from 'http';
import exphbs from 'express-handlebars';
import helmet from 'helmet';
import { connectToDB } from '../dao/db'; // Importar la función de conexión
import productsRouter from '../routes/products.js';
import cartsRouter from '../routes/cart.js';

const app = express();
const port = 8080;
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer);

app.use(helmet()); // Configurar helmet para mejorar la seguridad
app.use(express.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Conectar a la base de datos
connectToDB();

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', async (req, res, next) => {
  try {
    const products = []; // Obtener los productos de tu lógica existente
    res.render('home', { products });
  } catch (error) {
    next(error); // Pasar el error al siguiente middleware (manejador genérico)
  }
});

app.get('/realtimeproducts', async (req, res, next) => {
  try {
    const products = []; // Obtener los productos de tu lógica existente
    res.render('realTimeProducts', { products });
  } catch (error) {
    next(error); // Pasar el error al siguiente middleware (manejador genérico)
  }
});

// Agregar un Manejador de Errores Genérico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Hubo un error en el servidor');
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
