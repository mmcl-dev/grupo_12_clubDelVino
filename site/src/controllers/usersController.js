const path = require ('path');

const { validationResult } = require('express-validator');

module.exports = {
    login : function(req, res) {
        res.render('users/login');//muestra el login de usuario
    },
    register : function(req, res) {
        res.render('users/register');//muestra el registro de usuario
    },
    processRegister: function (req, res){
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0){
            return res.render ('users/register',
            { 
                errors: resultValidation.mapped(),
                oldData: req.body
            });            
        }

        let userImage = req.body;
        //Si me llegó una imagen la guardo
        if (req.file){
            userImage.image = req.file.filename;
         } // Si no hay imagen, debería cargar una por default
        else {
            userImage.image = 'defaultImageUser.png';
        }

        res.redirect('/users/userperfil/');
    },
    perfil : function(req, res) {
        res.render('users/userperfil');//muestra el perfil de usuario y opcion de actualizarlo
    }
}