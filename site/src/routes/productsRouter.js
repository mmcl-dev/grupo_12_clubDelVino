const express = require('express');
const router = express.Router();

const productController = require('../controllers/productsController');

//muestra la pagina de listado de productos del carrito
router.get('/productsCart', productController.productsCart);
//muestra la descripción de un producto
router.get('/productDescription', productController.productDescription);

/** A futuro hay que hacer las rutas para el admin de la pagina ABM y su correspondiente pagina*/

module.exports = router;