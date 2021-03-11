const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/productsController');

// requiere de la función con todos las propiedades
const jsonTable = require('../database/jsonTable');
// Parametrizo la función con la tabla que necesito
const productsTable = jsonTable('products');

// Para poner en mantenimiento todas las rutas de productos, descomentar la siguiente línea
const maintenance = require('../middlewares/maintenance');
//router.use(maintenance);

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

const upload = multer({storage,
    fileFilter:(req, file, cb) => {//filtro de multer para guardar o no si cumple el formato de imagen (tiene mas validaciones, pero solo usamos el tipo)
        const extension = path.extname(file.originalname).toLowerCase();
       // const mimetyp = file.mimetype;
        
        if (extension == '.png' || extension == '.jpg' || extension == '.jpeg') 
        {
            cb(null, true);  // SI guarda imagen
        }else{
            cb(null, false);  // NO guarda imagen
        }
    }
});


//configuracion de validaciones backend.
const validate = require('../validations/productValidations');

// página sólo de productos
/**************METODOS CRUD PARA PRODUCTOS************************ */
//muestra los productos en el home y en pantalla aparte
router.get('/', productController.productsHome);
//router.get('/products', productController.index);//para mostrar un listado de productos filtrados en otra pagina (a futuro)
//muestra la descripción de un producto en una pagina distinta
router.get('/productDescription/:id', productController.productDescription);

// Rutas GET para creación de producto y POST para guardado del nuevo producto
router.get('/create', productController.create);
router.post('/create', upload.single('image'), validate.registerProduct, productController.store);

// Rutas GET para edición de productos y PUT para posterior guardado de los cambios
router.get('/:id/edit', productController.edit);
router.put('/:id', upload.single('image'), validate.registerProduct, productController.update);

// Ruta para listar todos los productos de base de datos y poder elejir cual editar o borrar
router.get('/listProducts', productController.showList);

// Ruta para borrar un producto de la DB
router.delete('/:id', productController.destroy);


//muestra la pagina de listado de productos del carrito
router.get('/productsCart', productController.productsCart);

module.exports = router;