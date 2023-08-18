// productModel.js

import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(new URL('../data/productos.json', import.meta.url).pathname);


function getAllProducts() {
  const data = fs.readFileSync(productsFilePath, 'utf8');
  return JSON.parse(data);
}

function getProductById(productId) {
  const products = getAllProducts();
  return products.find((p) => p.id === productId);
}

function addProduct(newProduct) {
  const products = getAllProducts();
  products.push(newProduct);
  saveProductsToFile(products);
}

function updateProduct(productId, updatedFields) {
  const products = getAllProducts();
  const product = products.find((p) => p.id === productId);
  if (product) {
    Object.assign(product, updatedFields);
    saveProductsToFile(products);
  }
}

function deleteProduct(productId) {
  const products = getAllProducts();
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    saveProductsToFile(products);
  }
}

function saveProductsToFile(products) {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
