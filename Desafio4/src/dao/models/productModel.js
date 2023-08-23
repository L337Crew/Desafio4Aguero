import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
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
