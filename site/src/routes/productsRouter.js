const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/productsController');

// Configuración para almacenamiento de archivos
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        destFolder = path.join(__dirname, '../../public/img/');
        callback(null, destFolder);
    },
    filename: (req, file, callback) => {
        callback(null, 'prod-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

//configuracion de validaciones backend.
const {body, check} = require('express-validator');

const validations = [
    body('product_name').notEmpty().withMessage('El campo debe contener el nombre del vino'),
    body('description').notEmpty().withMessage('El campo debe contener una decripcion del producto'),
    body('wine_family').notEmpty().withMessage('El campo debe contener el nombre de la bodega a la que pertenece'),
    body('category').notEmpty().withMessage('Debe seleccionar una categoria del vino'),
    body('year').notEmpty().withMessage('El campo debe tener el año de la cosecha'),
    body('price').notEmpty().withMessage('El campo debe tener el precio del vino'),
    body('image').custom((value, {req})=>{
        let file = req.file;//gracias a multer viaja la info del form por un lado y la imagen por otro (file=imagen)
        let acceptedExtensions = ['.png', '.jpg', '.jpeg'];//extensiones permitidas
        if(!file){ 
            throw new Error ('Es obligatorio seleccionar una imagen');
        }else{
            let extension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(extension)){
                throw new Error ('La extension debe ser: png, jpg, jpeg');
            }
        }       
        return true;
    })
];


// página sólo de productos
/**************METODOS CRUD PARA PRODUCTOS************************ */
//muestra los productos en el home y en pantalla aparte
router.get('/', productController.productsHome);
//router.get('/products', productController.index);//para mostrar un listado de productos filtrados en otra pagina (a futuro)
//muestra la descripción de un producto en una pagina distinta
router.get('/productDescription/:id', productController.productDescription);

// Rutas GET para creación de producto y POST para guardado del nuevo producto
router.get('/create', productController.create);
router.post('/create', upload.single('image'), validations, productController.store);

// Rutas GET para edición de productos y PUT para posterior guardado de los cambios
router.get('/:id/edit', productController.edit);
router.put('/:id', upload.single('image'), productController.update);

// Ruta para listar todos los productos de base de datos y poder elejir cual editar o borrar
router.get('/listProducts', productController.showList);

// Ruta para borrar un producto de la DB
router.delete('/:id', productController.destroy);


//muestra la pagina de listado de productos del carrito
router.get('/productsCart', productController.productsCart);

module.exports = router;