const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

// Definición de rutas Main Home
router.get('/', mainController.index);
router.get('/home', mainController.index);

router.get('/404', mainController.error);

module.exports = router;