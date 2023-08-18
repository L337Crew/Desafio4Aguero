import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  // Define los campos de tu esquema para la colección carts
  userId: String,
  products: [
    {
      productId: String,
      quantity: Number,
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
