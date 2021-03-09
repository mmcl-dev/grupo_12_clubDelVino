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

const upload = multer({storage,
    fileFilter:(req, file, cb) => {//filtro de multer para guardar o no si cumple el formato de imagen (tiene mas validaciones, pero solo usamos el tipo)
        const extension = path.extname(file.originalname).toLowerCase();
        const mimetyp = file.mimetype;
        
        if (extension == '.png' || extension == '.jpg' || extension == '.jpeg') 
        {
            cb(null, true);  // SI guarda imagen
        }else{
            cb(null, false);  // NO guarda imagen
        }
    }
});

/************** METODOS LOGIN y LOGOUT PARA USUARIOS ************************ */
//  '/users' es el path ppal

//Login usuario y procesamiento de formulario de login
router.get('/login', userController.login);
router.post('/login-account', validate.login, userController.processLogin);
//router.post('/:id/login', userController.loginValidate);

// Logout
router.get('/logout', userController.logout);


/**************METODOS CRUD PARA USUARIOS************************ */

//1. y 2. Registro de usuario y procesamiento del formularios (CREATE)
router.get('/register', userController.register);
router.post('/register', upload.single('image'), validate.register, userController.processRegister);//'image' hace referencia al nombre del id en html donde va la imagen

// RUTA provisoria hasta resolver Perfil sólo para cuando está logueado
router.get('/userprofile', userController.perfil);

// 7. Muestra un usuario (DETAIL)
router.get('/:id', userController.detail);

//4. y 5. Rutas GET para edición de perfile de usuario y PUT para modificción del mismo (EDIT)
router.get('/:id/userprofile', userController.userProfile);
router.put('/:id', validate.register, upload.single('image'), userController.updateUser);

//6. Borrar Usuario (DELETE)
router.delete('/:id', userController.destroy);

module.exports = router;

// 1) FORM CREATE USER: /users/create
// 2) CREATE     : /users
// 3) LISTAR USERS : /users   ----> hacemos esta ruta ?
// 4) FORM EDIT USER : /users/:id/edit   
// 5) ACCION DE GUARDAR EDIT USER : /users/:id
// 6) DELETE : /users/:id
// 7) DETAIL USER:  /users/:id
