const express = require('express');
const router = express.Router();
const apiController = require('../../controllers/api/productsController');

router.get('/listProducts', apiController.listProducts);
router.get('/detailProduct/:id', apiController.detailProduct);
router.post('/createProduct', apiController.createProduct);
router.patch('/updateProduct/:id', apiController.updateProduct);
router.delete('/deleteProduct', apiController.destroyProduct);
module.exports = router;