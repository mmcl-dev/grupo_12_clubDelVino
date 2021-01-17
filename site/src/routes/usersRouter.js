const express = require('express');
const router = express.Router();
const path = require ('path');
const controller = require('../controllers/usersController');

router.get('/login', controller.login);
router.get('/register', controller.register);
//  ----- PARA PROBAR SEGUNDA OPCION DEL REGISTER ----//
router.get('/register2', controller.register2);

module.exports = router;