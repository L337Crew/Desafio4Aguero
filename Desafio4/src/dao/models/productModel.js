import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
      title: String, // Título del producto (cadena de texto)
      description: String, // Descripción del producto (cadena de texto)
      price: Number, // Precio del producto (número)
      thumbnails: String, // Enlace a la imagen del producto (cadena de texto)
      code: String, // Código único del producto (cadena de texto)
      stock: Number, // Cantidad en inventario del producto (número)
      status: Boolean, // Estado del producto (activo/inactivo)
      category: String,  // Categoría del producto (cadena de texto)
  // Otros campos que necesites
});

const Product = mongoose.model('Product', productSchema);

async function getAllProducts() {
  return await Product.find();
}

async function getProductById(productId) {
  return await Product.findById(productId);
}

async function addProduct(newProduct) {
  return await Product.create(newProduct);
}

async function updateProduct(productId, updatedFields) {
  return await Product.updateOne({ _id: productId }, { $set: updatedFields });
}

async function deleteProduct(productId) {
  return await Product.deleteOne({ _id: productId });
}

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};

export default Product;
