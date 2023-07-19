const express = require('express');
const app = express();
const port = 8080;

const exphbs = require('express-handlebars');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const productsRouter = require('../routes/products');
const cartsRouter = require('../routes/carts');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
  const products = []; // Obtener los productos de tu lógica existente
  res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
  const products = []; // Obtener los productos de tu lógica existente
  res.render('realTimeProducts', { products });
});

http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
