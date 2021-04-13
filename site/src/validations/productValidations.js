const path = require('path');
////////////////////////
// requiere de la función con todos las propiedades
const jsonTable = require('../database/jsonTable');
// Parametrizo la función con la tabla que necesito
const productsTable = jsonTable('products');
/////////////////////////////////

const db = require('../../../database/models');

const {body, check} = require('express-validator');

module.exports = {
    registerProduct: [
        body('product_name').notEmpty().withMessage('El campo debe contener el nombre del vino'),
        body('description').notEmpty().withMessage('El campo debe contener una decripcion del producto'),
        body('wine_family').notEmpty().withMessage('El campo debe contener el nombre de la bodega a la que pertenece'),
        body('category').notEmpty().withMessage('Debe seleccionar una categoria del vino'),
        body('year').notEmpty().withMessage('El campo debe tener el año de la cosecha'),
        body('price').notEmpty().withMessage('El campo debe tener el precio del vino'),
        body('image').custom((value, {req})=>{

            let acceptedExtensions = ['.png', '.jpg', '.jpeg','.PNG', '.JPG', '.JPEG'];//extensiones permitidas
            //si tiene id de producto es una edicion, si no es una creacion. Esto sirve para saber si es necesario que tenga o no imagen
            if (req.params.id){//es una edicion
                let product = req.body;
                product.id = Number(req.params.id);

                if (req.file){//si tiene imagen nueva
                    product.image = req.file.filename;//guardo el nombre
                    productsTable.deleteImage(Number(req.params.id));//borro la imagen vieja
                } else {
                    oldProduct = productsTable.find(req.params.id);
                    product.image = oldProduct.image;
                }
            }else{//de lo contrario es una creacion
                let file = req.file;//gracias a multer viaja la info del form por un lado y la imagen por otro (file=imagen)           
                if(!file){ 
                    throw new Error ('Es obligatorio seleccionar una imagen con el tipo de formato jpg, png o jpeg');
                }else{
                    let extension = path.extname(file.originalname);
                    if (!acceptedExtensions.includes(extension)){
                        throw new Error ('La extension debe ser: png, jpg, jpeg');
                    }
                }
            }

            return true;
        })
    ]
}