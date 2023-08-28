import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true
      }, // Título del producto (cadena de texto)
      description: {
        type: String,
        required: true
      }, // Descripción del producto (cadena de texto)
      price: {
        type: Number,
        required: true
      }, // Precio del producto (número)
      thumbnails: {
        type: String,
        required: true
      }, // Enlace a la imagen del producto (cadena de texto)
      code: {
        type: String,
        required: true
      }, // Código único del producto (cadena de texto)
      stock: {
        type: Number,
        required: true
      }, // Cantidad en inventario del producto (número)
      status: {
        type: Boolean,
        required: true
      }, // Estado del producto (activo/inactivo)
      category: {
        type: String,
        required: true
      }  // Categoría del producto (cadena de texto)
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
