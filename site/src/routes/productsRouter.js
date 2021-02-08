const express = require('express');
const router = express.Router();

const productController = require('../controllers/productsController');

// página sólo de productos
/**************METODOS CRUD PARA PRODUCTOS************************ */
//muestra los productos en el home y en pantalla aparte
router.get('/', productController.productsHome);
router.get('/products', productController.index);//para mostrar un listado de productos filtrados en otra pagina (a futuro)
//muestra la descripción de un producto en una pagina distinta
router.get('/productDescription/:id', productController.productDescription);


router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);

/*
router.get('/create', productController.create);//pantalla para crear un producto (ejs)
router.get('/:id', productController.show);
router.post('/', productController.store);
router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);
router.delete('/:id', productController.destroy);
*/

//muestra la pagina de listado de productos del carrito
router.get('/productsCart', productController.productsCart);

module.exports = router;