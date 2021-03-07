const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/usersController');
const maintenance = require('../middlewares/maintenance');

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

//configuracion de validaciones backend.
const {body, check} = require('express-validator');

const validations = [
    body('name').notEmpty().withMessage('El campo nombre no puede estar vacio'),
    body('lastname').notEmpty().withMessage('El campo apellido no puede estar vacio'),
    body('email').notEmpty().withMessage('El campo email no puede estar vacio').bail().isEmail().withMessage("Debe ser un correo valido"),
    body('password').notEmpty().withMessage('El campo password no puede estar vacio'),
    body('image').custom((value, {req})=>{
        let file = req.file;//gracias a multer viaja la info del form por un lado y la imagen por otro (file=imagen)
        let acceptedExtensions = ['.png', '.jpg', '.jpeg'];//extensiones permitidas
        if(file && file.originalname){
            let extension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(extension)){
                throw new Error ('Debe ser una imagen valida del tipo "png, jpg, jpeg"');
            };            
        }
        return true;
        //no es obligacion de que suba una imagen
    })
];

/**************METODOS CRUD PARA USUARIOS************************ */
//Login usuario
router.get('/login', userController.login);
//router.post('/:id/login', userController.loginValidate);

//Registro usuario (create)
router.get('/register', userController.register);
router.post('/register', upload.single('image'), validations, userController.processRegister);//'image' hace referencia al nombre del id en html donde va la imagen

//Perfil de usuario y modificacion del mismo (edit)
router.get('/userperfil', userController.perfil);
//router.get('/:id/userperfil', userController.perfil);
//router.put('/:id', upload.single('image'), productController.update);


module.exports = router;