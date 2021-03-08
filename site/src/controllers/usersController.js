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
        //CREATE
        res.render('users/register');//muestra el registro de usuario
    },
    processRegister: function (req, res){
        // Procesa CREATE
        const resultValidation = validationResult(req);

        // Si hubo errores de validación
        if (resultValidation.errors.length > 0){
            return res.render ('users/register',
            { 
                errors: resultValidation.mapped(),
                oldData: req.body
            });            
        }

        // Si no hubo errores, guardo los cambios
        let user = req.body;

        //Si me llegó una imagen la guardo
        if (req.file){
            user.image = req.file.filename;
         } // Si no hay imagen, debería cargar una por default
        else {
            user.image = 'defaultImageUser.png';
        }

        let userId = usersTable.create(user);

        res.redirect('/users/' + userId);
    },
    userProfile : function (req, res) {
        // EDIT: edición de un usuario
        let user = usersTable.find(req.params.id);
        res.render('users/userprofile', { user });
    },
    updateUser : function (req,res) {
        //Update USer
        let user = req.body;
        user.id = req.params.id;

        // Si viene una imagen nueva la guardo
        if (req.file) {
            user.image = req.file.filename;
        // Si no viene una imagen nueva, busco en base la que ya había
        } else {
            oldUser = usersTable.find(user.id);
            user.image = oldUser.image;
        }

        let userId = usersTable.update(user);

        // Redirecciono a página de detalle DETAIL
        res.redirect('users/' + userId);

    },
    detail: function (req,res) {
        //DETAIL
        let user = usersTable.find(req.params.id);
        res.render('users/details', { user });
    },
    destroy : function (req,res) {
        //DELETE
        let users = usersTable.all()

        usersTable.delete(req.params.id);

        // Redirecciono a alguna lista global de usuarios --- NO ESTÄ CREADA ESTA RUTA
        res.redirect('/users');

    },
    perfil : function (req,res) {
       res.render('users/userprofile');
    }
}