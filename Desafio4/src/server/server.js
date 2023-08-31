import express from 'express';
import handlebars from 'express-handlebars';
import helmet from 'helmet';
import { connectToDB } from '../dao/db.js'; // Importar la función de conexión
import { __dirname } from './utils.js';
import path from 'path';
import productsRouter from '../routes/products.js';
import cartsRouter from '../routes/cart.js';
import { Server } from 'socket.io'; // Importar Server desde socket.io
import Message from '../dao/models/messageModel'; // Importar el modelo de mensaje
import viewsRouter from '../routes/viewsRouter.js';

const app = express();
const port = 8080;
const httpServer = app.listen(port,()=>console.log(`Server listening on port ${port}`));  
const io = new Server(httpServer); // Crear instancia de Server

let messages=[];  
io.on("connection",(socket)=>{
  console.log("nuevo cliente conectado");

  socket.on("authenticated",async(msg)=>{
      const messages = await chatModel.find();
      socket.emit("messageHistory", messages);
      socket.broadcast.emit("newUser", msg);
  });

  //recibir el mensaje del cliente
  socket.on("message",async(data)=>{
      console.log("data", data);
      const messageCreated = await chatModel.create(data);
      const messages = await chatModel.find();
      //cada vez que recibamos este mensaje, enviamos todos los mensajes actualizados a todos los clientes conectados
      io.emit("messageHistory", messages);
  })
});

app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "/views"));

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

