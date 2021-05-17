const path = require('path');
const {body} = require('express-validator');

module.exports = {
    login : [
        body('email').notEmpty().withMessage('El campo email no puede estar vacio').bail().isEmail().withMessage("Debe ser un correo valido"),
        body('password').notEmpty().withMessage('El campo password debe contener 8 o mas caracteres').isLength({ min: 7})
    ],
    register : [
        body('firstname').notEmpty().withMessage('El campo nombre no puede estar vacio'),
        body('lastname').notEmpty().withMessage('El campo apellido no puede estar vacio'),
        body('email').notEmpty().withMessage('El campo email no puede estar vacio').bail().isEmail().withMessage("Debe ser un correo valido"),
        body('password').notEmpty().withMessage('El campo password debe contener 8 o mas caracteres').isLength({ min: 7}),
        body('image').custom((value, {req})=>{
            let file = req.file;//gracias a multer viaja la info del form por un lado y la imagen por otro (file=imagen)
            let acceptedExtensions = ['.png', '.jpg', '.jpeg'];//extensiones permitidas
            if(file && file.originalname){
                let extension = path.extname(file.originalname).toLowerCase();
                if (!acceptedExtensions.includes(extension)){
                    throw new Error ('Debe ser una imagen valida del tipo "png, jpg, jpeg"');
                };            
            }
            return true;
            //no es obligacion de que suba una imagen
        })
    ],
    updateUserProfile : [
        body('firstname').notEmpty().withMessage('El campo nombre no puede estar vacio'),
        body('lastname').notEmpty().withMessage('El campo apellido no puede estar vacio'),
        body('password').notEmpty().withMessage('El campo password debe contener 8 o mas caracteres').isLength({ min: 7}),
        body('image').custom((value, {req})=>{
            let file = req.file;//gracias a multer viaja la info del form por un lado y la imagen por otro (file=imagen)
            let acceptedExtensions = ['.png', '.jpg', '.jpeg'];//extensiones permitidas
            if(file && file.originalname){
                let extension = path.extname(file.originalname).toLowerCase();
                if (!acceptedExtensions.includes(extension)){
                    throw new Error ('Debe ser una imagen valida del tipo "png, jpg, jpeg"');
                };            
            }
            return true;
            //no es obligacion de que suba una imagen
        })
    ]
}

