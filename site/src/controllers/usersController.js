const path = require ('path');
const { validationResult } = require('express-validator');

// requiere de la función con todos las propiedades
const jsonTable = require('../database/jsonTable');
// Parametrizo la función con la tabla que necesito
const usersTable = jsonTable('users');


module.exports = {
    login : function(req, res) {
        res.render('users/login');//muestra el login de usuario
    },
    logout : function(req, res) {
        res.render('users/login');//deslogueo
    },
    processLogin : function(req, res) {
        //validar datos del login
        const resultValidation = validationResult(req);
        
        // Si no hay errores
        if (resultValidation.isEmpty()){
            let user = usersTable.findByField('email', req.body.email);
            console.log(user);
           
            // Si el usuario existe
            if (user) {
                // Si la contraseña es correcta
                if (user.password == req.body.password) {
                    return res.redirect('/users/' + user.id)
                }
            }
        }
            // Si hay algún error, renderizo el formulario nuevamente con los errors y los datos completados
            return res.render('users/login', { 
                errors: resultValidation.mapped(),
                oldData: req.body
                });
        
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

        res.redirect('/users/userprofile/');
    },
    userProfile : function (req, res) {
        // edición de un usuario
        let user = usersTable.find(req.params.id);
        res.render('users/edit', { user });
    },
    detail: function (req,res) {
        let user = usersTable.find(req.params.id);
        res.render('users/details', { user });
    },
    updateUser : function (req,res) {
        //Update
    },
    destroy : function (req,res) {
        //Borrar
    },
    perfil : function (req,res) {
       res.render('users/userprofile');
    }
}