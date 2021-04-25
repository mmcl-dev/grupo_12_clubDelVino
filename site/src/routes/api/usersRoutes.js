const express = require('express');
const router = express.Router();
const apiController = require('../../controllers/api/usersController');

router.get('/users', apiController.showALL);
router.get('/users/detail/:id', apiController.detail);
router.post('/users/create', apiController.create);  
router.put('/users/update/:id', apiController.update);
router.delete('/users/delete/:id', apiController.destroy);
router.get('/users/search', apiController.search);

module.exports = router;
