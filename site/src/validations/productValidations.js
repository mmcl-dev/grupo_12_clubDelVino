const path = require('path');

const imageUtils = require('../utils/imageUtils');

//acceso a los modelos de db ORM esto para saber si el id existe y poder acceder al nombre de la imagen
const db = require('../../../database/models');

const {body, check} = require('express-validator');

module.exports = {
    registerProduct: [
        body('product_name').notEmpty().withMessage('El campo debe contener el nombre del vino'),
        body('description').notEmpty().withMessage('El campo debe contener una decripcion del producto'),
        body('wine_family').notEmpty().withMessage('El campo debe contener el nombre de la bodega a la que pertenece'),
        body('category_id').notEmpty().withMessage('Debe seleccionar una categoria del vino'),
        body('year').notEmpty().withMessage('El campo debe tener el año de la cosecha'),
        body('price').notEmpty().withMessage('El campo debe tener el precio del vino'),
        body('image').custom((value, {req})=>{

            let acceptedExtensions = ['.png', '.jpg', '.jpeg'];//extensiones permitidas

            //si tiene id de producto es una edicion, si no es una creacion. Esto sirve para saber si es necesario que tenga o no imagen
            if (req.params.id){//es una edicion por que viene con un id
                let product = req.body;
                product.id = Number(req.params.id);

                if (req.file){//si tiene imagen nueva (el nombre de la imagen ya viene del productRouter)
                    product.image = req.file.filename;//guardo el nombre nuevo de la imagen guardada en productRouter con multer
                    new Promise (() => {imageUtils.deleteImageProduct(Number(req.params.id))}).then(function (){return true;});//borro la imagen vieja y retorno true
                } else {
                    new Promise( ()=>{
                        imageUtils.findProductForId(Number(req.params.id))
                    })
                    .then(function (oldProduct ){
                        product.image = oldProduct.image;
                        return true;
                    });
                }
            }else{//de lo contrario es una creacion por que vino sin id  entonces guarda la imagen (es obligacion que haya imagen seleccionada)
                let file = req.file;//gracias a multer viaja la info del form por un lado y la imagen por otro (file=imagen)           
                if(!file){ 
                    throw new Error ('Es obligatorio seleccionar una imagen con el tipo de formato jpg, png o jpeg');
                }else{
                    let extension = path.extname(file.originalname).toLowerCase();
                    if (!acceptedExtensions.includes(extension)){
                        throw new Error ('La extension debe ser: png, jpg, jpeg');
                    }
                }
            }
            return true;
        })
    ]
}