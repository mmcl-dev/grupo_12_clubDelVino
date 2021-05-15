const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/productsController');

const authMiddleware = require('../middlewares/authMiddleware');
const productExistMiddleware = require('../middlewares/productExistMiddleware');

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
       //console.log('---------------***************'+file.originalname);
        
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
/************** LISTADOS ************************ */
//muestra los productos en el home y en pantalla aparte
//router.get('/', productController.productsHome);

//router.get('/products', productController.index);//para mostrar un listado de productos filtrados en otra pagina (a futuro)
//muestra la descripción de un producto en una pagina distinta
router.get('/productDescription/:id', productExistMiddleware ,productController.productDescription);


/************** CARRITO ************************ */
//agrego un producto al carrito 
router.get('/add-to-cart/:id', productController.addToCart);

//remuevo un item del carrito 
router.get('/reduceFromCart/:id', productController.deleteOnefromCart);

//remuevo un producto entero del carrito 
router.get('/removeFromCart/:id', productController.removefromCart);

//muestra la pagina de listado de productos del carrito
router.get('/productsCart', productController.productsCart);


/**************METODOS CRUD PARA PRODUCTOS************************ */
// C:reate - Rutas GET para creación de producto y POST para guardado del nuevo producto
router.get('/create', authMiddleware, productController.create);
router.post('/create', upload.single('image'), validate.registerProduct, productController.store);

// R:ead - Ruta para listar todos los productos de base de datos y poder elejir cual editar o borrar
router.get('/listProducts', authMiddleware, productController.showList);

// U:pdate - Rutas GET para edición de productos y PUT para posterior guardado de los cambios
router.get('/:id/edit', productExistMiddleware, authMiddleware, productController.edit);
router.put('/:id/edit', upload.single('image'), validate.registerProduct, productController.update);

// D:elete - Ruta para borrar un producto de la DB
// router.delete('/:id', productController.destroy);
// Cambie delete por ports porque me daba error en la DB para borrar
router.post('/:id', productController.destroy);

//Rutas para buscar un producto o filtrar productos por categorias.
router.post('/searchCategory/category', productController.searchCategory);
router.post('/searchProduct/searchWord', productController.searchWord);


//middleware de error 404
const error404 = require('../middlewares/notFoundMiddleware');
router.use(error404);

module.exports = router;