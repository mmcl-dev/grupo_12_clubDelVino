const {body} = require('express-validator');

module.exports = {
    login : [
        body('email').notEmpty().withMessage('El campo email no puede estar vacio').bail().isEmail().withMessage("Debe ser un correo valido"),
        body('password').notEmpty().withMessage('El campo password no puede estar vacio'),
    ],
    register : [
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
    ]
}

