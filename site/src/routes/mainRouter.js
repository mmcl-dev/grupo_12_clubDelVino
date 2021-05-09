const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

const maintenance = require('../middlewares/maintenance');


// Para poner en mantenimiento todas las rutas, descomentar la siguiente línea
//router.use(maintenance);

// Definición de rutas Main Home
router.get('/', mainController.index);
router.get('/home', mainController.index);

module.exports = router;