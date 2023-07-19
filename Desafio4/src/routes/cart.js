const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartController');

router.post('/', cartsController.createCart);
router.get('/:cid', cartsController.getCartProducts);
router.post('/:cid/product/:pid', cartsController.addProductToCart);

module.exports = router;
