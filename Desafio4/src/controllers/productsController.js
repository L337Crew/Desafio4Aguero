import { generateUniqueId } from '../commonModules/commonModules'; // Solo importamos generateUniqueId

// Importamos las funciones del modelo
import {
  getAllProducts as getAllProductsFromModel,
  getProductById as getProductByIdFromModel,
  addProduct as addProductToModel,
  updateProduct as updateProductInModel,
  deleteProduct as deleteProductFromModel
} from '../dao/models/productModel.js';

// Resto de las funciones del controlador

const productController = {
  getAllProducts: getAllProductsFromModel,
  getProductById: getProductByIdFromModel,
  addProduct: async (req, res) => {
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

    try {
      await addProductToModel(newProduct); // Usamos la función del modelo para agregar el producto
      res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto' });
    }
  },
  updateProduct: async (req, res) => {
    const pid = req.params.pid;
    const updatedFields = req.body;

    try {
      const updatedProduct = await updateProductInModel(pid, updatedFields); // Usamos la función del modelo para actualizar el producto
      if (updatedProduct) {
        res.json({ message: 'Producto actualizado exitosamente', product: updatedProduct });
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto' });
    }
  },
  deleteProduct: async (req, res) => {
    const pid = req.params.pid;

    try {
      const deletedProduct = await deleteProductFromModel(pid); // Usamos la función del modelo para eliminar el producto
      if (deletedProduct) {
        res.json({ message: 'Producto eliminado exitosamente' });
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto' });
    }
  }
};

export default productController;
