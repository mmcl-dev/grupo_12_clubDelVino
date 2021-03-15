const path = require ('path');
const { validationResult } = require('express-validator');

const bcryptjs = require('bcryptjs');

// requiere de la función con todos las propiedades
const jsonTable = require('../database/jsonTable');
// Parametrizo la función con la tabla que necesito
const usersTable = jsonTable('users');


module.exports = {
    login : function(req, res) {
        res.render('users/login');//muestra el login de usuario
    },
    logout : function(req, res) {
        console.log('Destruyo sesión');
        req.session.destroy();
        res.redirect('/');//deslogueo y voy al home
    },
    processLogin : function(req, res) {
        //validar datos del login
        const resultValidation = validationResult(req);
        
        // Si no hay errores
        if (resultValidation.isEmpty()){
            let user = usersTable.findByField('email', req.body.email);   
            //console.log('user: ' + user); 
            // Si el usuario existe
            if (user) {
                // Si la contraseña es correcta
                let passwordIsOK = bcryptjs.compareSync(req.body.password, user.password);
                if (passwordIsOK ) {
                    // USUARIO LOGUEADO
                    // delete user.password;
                    req.session.user = user;
                    return res.redirect('/users/' + user.id)
                }else{
                    return res.render ('users/login',
                    { 
                        errors:{
                            password:{
                                msg:'La contraseña es incorrecta'
                            }
                        },
                        oldData: req.body
                    });
                }
            }else{
                return res.render ('users/login',
                { 
                    errors:{
                        email:{
                            msg:'El usuario no existe'
                        }
                    },
                    oldData: req.body
                }); 
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

        // Si no hubo errores, busco si existe ese usuario
        let userInDB = usersTable.findByField('email', req.body.email);
        if(userInDB){
            return res.render ('users/register',
            { 
                errors:{
                    email:{
                        msg:'Este usuario ya esta registrado'
                    }
                },
                oldData: req.body
            }); 
        }
        
        //Si No existe el usuario hasheo el password y guardo los datos en la DB
        let user = req.body;
        user.password = bcryptjs.hashSync(req.body.password, 10);

        //Si me llegó una imagen la guardo
        if (req.file){
            user.image = req.file.filename;
         } // Si no hay imagen, debería cargar una por default
        else {
            user.image = 'defaultImageUser.jpg';
        }

        //Por ahora todos los usuarios creados seran user por defecto.
        user.category = 'user';

        //*******MUY IMPORTANTE, VAMOS A GRABAR EN DB LOS DATOS DEL USUARIO NUEVO, ESTO LLEVA TIEMPO, ASI QUE USAMOS UNA PROMESA PARA */
        //*******LUEGO BUSCAR EL NUEVO ID Y PODER REDIRECCIONAR A LA PAGINA CORRECTAMENTE */
        //ESTA PENDIENTE USAR LA PROMESA****///
        let newUser = usersTable.create(user);
        let userId = usersTable.findByField('email', req.body.email); 

        res.redirect('/users/' + userId.id);
          
    },
    userProfile : function (req, res) {
        // EDIT: edición de un usuario
        let user = usersTable.find(req.params.id);
        res.render('users/userprofile', { user });
    },
    updateUser : function (req,res) {
        //Update User
        
        //validamos los datos ingresados
        const resultValidation = validationResult(req);

        // Si hubo errores de validación
        if (resultValidation.errors.length > 0){
            //console.log(resultValidation.mapped());
            return res.render ('users/userprofile',
            { 
                errors: resultValidation.mapped(),
                oldData: req.body
            });            
        }


        let user = req.body;
        user.id = req.params.id;

        //informacion del usuario en la DB
        oldUser = usersTable.find(user.id);

        //**********Subir o no imagen al perfil de usuario es opcional ************/
        // Si viene una imagen nueva la guardo
        if (req.file) {
            user.image = req.file.filename;
        // Si no viene una imagen nueva, busco en base la que ya había
        } else {
            user.image = oldUser.image;
        }

        //**********el EMAIL no puede cambiar asi que asignamos el que esta en DB ************/
        user.email = oldUser.email;
        //La categoria es la misma que la anterior
        user.category = oldUser.category;

        //Hasheo la password nueva
        user.password = bcryptjs.hashSync(req.body.password, 10);

        let userId = usersTable.update(user);

        // Redirecciono a página de detalle DETAIL
        res.render('users/details', { user });
        //res.redirect('users/' + userId);

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