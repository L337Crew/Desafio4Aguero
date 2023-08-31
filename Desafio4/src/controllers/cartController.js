import { generateUniqueId } from '../commonModules/commonModules';
import Cart from '../dao/models/cartModel.js';

const cartController = {
  createCart: async (req, res) => {
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ message: 'El campo "products" debe ser un arreglo' });
    }

    try {
      const newId = generateUniqueId();

      const newCart = await Cart.create({
        _id: newId,
        products: products || []
      });

      res.status(201).json({ message: 'Carrito creado exitosamente', cart: newCart });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el carrito' });
    }
  },

  getCartProducts: async (req, res) => {
    const cid = req.params.cid;
    try {
      const cart = await Cart.findById(cid);
      if (cart) {
        res.json(cart.products);
      } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos del carrito' });
    }
  },

  addProductToCart: async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    if (!cid || !pid) {
      return res.status(400).json({ message: 'Se requiere cid y pid' });
    }

    try {
      const cart = await Cart.findById(cid);

      const existingProduct = cart.products.find((p) => p.product === pid);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }

      await cart.save();

      res.json({ message: 'Producto agregado al carrito exitosamente', cart });
    } catch (error) {
      res.status(500).json({ message: 'Error al agregar el producto al carrito' });
    }
  }
};

export default cartController;
