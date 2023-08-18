import express from 'express';
import http from 'http';
import exphbs from 'express-handlebars';
import helmet from 'helmet';
import { connectToDB } from '../dao/db.js'; // Importar la función de conexión
import productsRouter from '../routes/products.js';
import cartsRouter from '../routes/cart.js';
import { Server } from 'socket.io'; // Importar Server desde socket.io

const app = express();
const port = 8080;
const httpServer = http.createServer(app);
const io = new Server(httpServer); // Crear instancia de Server

app.use(helmet());
app.use(express.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

connectToDB();

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', async (req, res, next) => {
  try {
    const products = []; // Obtener los productos de tu lógica existente
    res.render('home', { products });
  } catch (error) {
    next(error);
  }
});

app.get('/realtimeproducts', async (req, res, next) => {
  try {
    const products = []; // Obtener los productos de tu lógica existente
    res.render('realTimeProducts', { products });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Hubo un error en el servidor');
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
