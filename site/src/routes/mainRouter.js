const express = require('express');
const router = express.Router();
const path = require ('path');
const controller = require('../controllers/mainController');

// Definición de rutas Main Home
router.get('/', controller.index);
router.get('/home', controller.index);

module.exports = router;