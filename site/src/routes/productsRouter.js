const express = require('express');
const router = express.Router();

const productController = require('../controllers/productsController');

//muestra la pagina de listado de productos del carrito
router.get('/productsCart', productController.productsCart);
//muestra la descripción de un producto
router.get('/productDescription', productController.productDescription);

module.exports = router;