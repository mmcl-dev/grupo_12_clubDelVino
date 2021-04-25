const express = require('express');
const router = express.Router();
const apiController = require('../../controllers/api/productsController');

router.get('/products/list', apiController.list);
router.get('/products/detail/:id', apiController.detail);
router.post('/products/create', apiController.create);
router.put('/products/update/:id', apiController.update);
router.delete('/products/delete/:id', apiController.destroy);
router.get('/products/search', apiController.search);

module.exports = router;