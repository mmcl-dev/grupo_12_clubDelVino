const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController');

/**************METODOS CRUD PARA USUARIOS************************ */
//Login usuario
router.get('/login', userController.login);
//router.post('/:id/login', upload.single('image'), userController.loginValidate);

//Registro usuario (create)
router.get('/register', userController.register);
//router.post('/register', upload.single('image'), userController.store);

//Perfil de usuario y modificacion del mismo (edit)
router.get('/userperfil', userController.perfil);
//router.get('/:id/userperfil', userController.perfil);
//router.put('/:id', upload.single('image'), productController.update);


module.exports = router;