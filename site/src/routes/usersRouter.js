const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController');

router.get('/login', userController.login);
router.get('/register', userController.register);

/** A futuro hay que hacer las rutas para mostrar los datos del usuario y su correspondiente pagina*/

module.exports = router;