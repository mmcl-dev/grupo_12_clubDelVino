const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/usersController');
const maintenance = require('../middlewares/maintenance');
const validate = require('../validations/userValidations');

// Para poner en mantenimiento todas las rutas de usuarios, descomentar la siguiente línea
//router.use(maintenance);

//const { now } = require('sequelize/types/lib/utils');

//configuracion de almacenamiento de imagenes
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        let destFolderUser = path.join(__dirname,'../../public/img/users/');
        callback(null, destFolderUser);
    },
    filename: (req, file, callback) =>{
        let filenameUser = 'user-' + Date.now() + path.extname(file.originalname);
        callback(null, filenameUser);
    }
});

const upload = multer({storage});

/**************METODOS CRUD PARA USUARIOS************************ */
//  '/users' es el path ppal

//Login usuario y procesamiento de formulario de login
router.get('/login', userController.login);
router.post('/login-account', validate.login, userController.processLogin);
//router.post('/:id/login', userController.loginValidate);

// Logout
router.get('/logout', userController.logout);

//Registro de usuario y procesamiento del formularios (create)
router.get('/register', userController.register);
router.post('/register', upload.single('image'), validate.register, userController.processRegister);//'image' hace referencia al nombre del id en html donde va la imagen

// RUTA provisoria hasta resolver Perfil sólo para cuando está logueado
router.get('/userprofile', userController.perfil);

// Muestra un usuario
router.get('/:id', userController.detail);

// Rutas GET para edición de perfile de usuario y PUT para modificción del mismo
router.get('/:id/userprofile', userController.userProfile);
router.put('/:id', upload.single('image'), validate.register, userController.updateUser);

//Borrar Usuario
router.delete('/:id/', userController.destroy);

module.exports = router;