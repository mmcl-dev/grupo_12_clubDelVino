const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../controllers/productsController');

//muestra la pagina de listado de productos del carrito
router.get('/productCart', controller.cart);
//muestra la descripción de un producto
router.get('/productDescription', controller.description);

module.exports = router;