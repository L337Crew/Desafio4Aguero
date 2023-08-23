import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  // Define los campos de tu esquema para la colección carts
  userId: String,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al ID del producto usando el tipo ObjectId
        ref: 'Product', // Referencia a la colección 'Product'
      },
      quantity: Number, // Cantidad del producto en el carrito
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
