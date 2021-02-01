const express = require('express');
const router = express.Router();

const productController = require('../controllers/productsController');

// página sólo de productos
router.get('/', productController.index);
//muestra la pagina de listado de productos del carrito
router.get('/productsCart', productController.productsCart);
//muestra la descripción de un producto
router.get('/productDescription', productController.productDescription);


/**************METODOS CRUD PARA PRODUCTOS************************ */
router.get('/', controller.index);//lista todos los producto
router.get('/create', controller.create);//pantalla para crear un producto (ejs)
router.get('/:id', controller.show);
router.post('/', controller.store);
router.get('/:id/edit', controller.edit);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);


module.exports = router;