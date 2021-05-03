const express = require('express');
const router = express.Router();
const apiController = require('../../controllers/api/productsController');

router.get('/products/list', apiController.list);
router.get('/products/detail/:id', apiController.detail);
router.post('/products/create', apiController.create);
router.put('/products/update/:id', apiController.update);
router.delete('/products/delete/:id', apiController.destroy);
router.get('/products/searchbyproductname', apiController.searchbyproductname);
router.get('/products/searchbycategoryname', apiController.searchbycategoryname);
router.get('/products/searchbywinefamily', apiController.searchbywinefamily);
router.get('/products/listofcategories', apiController.listofcategories);
router.get('/products/prodspercategory', apiController.prodspercategory);
router.get('/products/searchlastproduct', apiController.searchlastproduct);

module.exports = router;