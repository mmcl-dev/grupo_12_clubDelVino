const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/usersController');

router.get('/users', userController.showALL);

// router.get('/listProducts', apiController.listProducts);
// router.get('/detailProduct/:id', apiController.detailProduct);
// router.post('/createProduct', apiController.createProduct);
// router.patch('/updateProduct/:id', apiController.updateProduct);
// router.delete('/deleteProduct', apiController.destroyProduct);
module.exports = router;