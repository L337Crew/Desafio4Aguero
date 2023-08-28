import express from 'express';
import http from 'http';
import handlebars from 'express-handlebars';
import helmet from 'helmet';
import { connectToDB } from '../dao/db.js'; // Importar la función de conexión
import { __dirname } from './utils.js';
import path from 'path';
import productsRouter from '../routes/products.js';
import cartsRouter from '../routes/cart.js';
import { Server } from 'socket.io'; // Importar Server desde socket.io
import Message from '../dao/models/messageModel.js'; // Importar el modelo de mensaje
import viewsRouter from './viewsrouter.js';

const app = express();
const port = 8080;
const httpServer = http.createServer(app);
const io = new Server(httpServer); // Crear instancia de Server

app.use(helmet());
app.use(express.json());

app.engine('handlebars', handlebars.engine());

app.set('view engine', 'handlebars');

connectToDB();

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

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

// Ruta para guardar un nuevo mensaje en la base de datos
app.post('/api/messages', async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = new Message({
      user,
      message,
    });
    await newMessage.save();
    io.emit('mensajeGeneral', { user, message });
    res.status(200).send('Mensaje guardado con éxito.');
  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    res.status(500).send('Error al guardar el mensaje.');
  }
});

// ... otras rutas y configuraciones ...

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('new-message', async (data) => {
    try {
      const newMessage = new Message({
        user: data.user,
        message: data.message,
      });
      await newMessage.save();
      io.emit('mensajeGeneral', data);
    } catch (error) {
      console.error('Error al almacenar el mensaje:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Hubo un error en el servidor');
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
