const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/productsController');

// Configuración para almacenamiento de archivos
//REVISAR - No sube bien la imagen
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        destFolder = path.join(__dirname, '../../public/img/');
        console.log('DESTINO FOTO',destFolder);
        callback(null, destFolder);
    },
    filename: (req, file, callback) => {
        callback(null, 'prod-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage});


// página sólo de productos
/**************METODOS CRUD PARA PRODUCTOS************************ */
//muestra los productos en el home y en pantalla aparte
router.get('/', productController.productsHome);
//router.get('/products', productController.index);//para mostrar un listado de productos filtrados en otra pagina (a futuro)
//muestra la descripción de un producto en una pagina distinta
router.get('/productDescription/:id', productController.productDescription);

// Rutas GET para creación de producto y POST para guardado del nuevo producto
router.get('/create', productController.create);
router.post('/', upload.single('image'), productController.store);

// Rutas GET para edición de productos y PUT para posterior guardado de los cambios
router.get('/:id/edit', productController.edit);
router.put('/:id', upload.single('image'), productController.update);


/* router.get('/:id', productController.show);


router.delete('/:id', productController.destroy);
*/

//muestra la pagina de listado de productos del carrito
router.get('/productsCart', productController.productsCart);

module.exports = router;