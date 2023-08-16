import { fs, generateUniqueId } from './commonModules.js';

function getProductsFromFile() {
  const data = fs.readFileSync('../productos.json');
  return JSON.parse(data);
}

function saveProductsToFile(products) {
  const data = JSON.stringify(products, null, 2);
  fs.writeFileSync('../productos.json', data);
}

async function getAllProducts(req, res) {
  const products = getProductsFromFile();
  res.json(products);
}

async function getProductById(req, res) {
  const pid = req.params.pid;
  const products = getProductsFromFile();
  const product = products.find((p) => p.id === pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
}

async function addProduct(req, res) {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;

  // Validación de datos
  if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const newId = generateUniqueId();

  const newProduct = {
    id: newId,
    title,
    description,
    code,
    price,
    status: status || true,
    stock,
    category,
    thumbnails
  };

  const products = getProductsFromFile();
  products.push(newProduct);
  saveProductsToFile(products);

  res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
}

async function updateProduct(req, res) {
  const pid = req.params.pid;
  const updatedFields = req.body;

  const products = getProductsFromFile();
  const product = products.find((p) => p.id === pid);
  if (product) {
    Object.assign(product, updatedFields);
    saveProductsToFile(products);
    res.json({ message: 'Producto actualizado exitosamente', product });
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
}

async function deleteProduct(req, res) {
  const pid = req.params.pid;
  const products = getProductsFromFile();
  const productIndex = products.findIndex((p) => p.id === pid);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    saveProductsToFile(products);
    res.json({ message: 'Producto eliminado exitosamente' });
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
}

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
