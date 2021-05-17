const { validationResult } = require('express-validator');
const db = require('../../../database/models'); 

const Cart = require('../utils/cart');

const bcryptjs = require('bcryptjs');

const chalk = require('chalk');
const Category = require('../../../database/models/Category');


module.exports = {
    showALL: function(req, res) {
        db.User.findAll()
        .then(function(users){
            return res.render('users/users', {users})
        })
        .catch(error => console.log("Falló el listado de usuarios", error))
    },
    login : function(req, res) {
        res.render('users/login');//muestra el login de usuario
    },
    logout : function(req, res) {
        console.log('Destruyo sesión');
        req.session.destroy();
        res.redirect('/');//deslogueo y voy al home
    },
    userIsLogin: function(req, res) {
        if (req.session.user == undefined) {
            res.send("No estás logueado");
        } else {

            res.send("El usuario está logueado")
        }
    },
    processLogin : function(req, res) {
        //validar datos del login
        const resultValidation = validationResult(req);
        
        //console.log('Este es el req.body.email :', req.body.email);

        // ---------------------  INICIO CONFIG PARA DB  ----------------
        // Si no hay errores de validación
        if (resultValidation.isEmpty()) {
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                if (user) {
                    // Usuario encontrado
                    if (bcryptjs.compareSync(req.body.password, user.password)) {
                       // Usuario se puede loguear
                        // console.log('Usuario Logueado ', user);
                        req.session.user = user;
					    req.session.auth = true;
                        idUsuario = user.id_user;

                        // Chequeo del campo Recordame
                        if (req.body.remember != undefined) {
                            // maxAge en ms
                            res.cookie('remember', user.email, { maxAge: 120000})
                        }

                        // console.log('USER ID : ', idUsuario);
                        return res.redirect('/users/' + idUsuario)
                           
                    } 
                }
                // Si no encontró al usuario o si lo encontró pero el password no coincide,
                // vuelvo a renderizar la pantalla de login
                return res.render ('users/login', {
                    errors:{
                        email:{
                        msg:'La contraseña o el usuario es incorrecto'
                        }
                    },
                    oldData: {
                        email: req.body.email
                    }
                });
            })
            .catch(error => console.log(error));

        } else {
        // Si hay algún error, renderizo el formulario nuevamente con los errors y los datos completados
        return res.render('users/login', { 
            errors: resultValidation.mapped(),
            oldData: req.body
            });
        }
    },
    register : function(req, res) {
        //CREATE -- Para DB queda igual que para tabla JSON
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

        // ---------------------  INICIO CONFIG PARA DB  ----------------

        // Si no hubo errores, busco si existe ese usuario		
		db.User.findOne({
            where: {
                 email: req.body.email
              }
             })
         .then( user => {
                if (user) {
                      return res.render ('users/register',
                    { 
                     errors:{
                        email:{
                        msg:'Este usuario ya está registrado'
                         }
                      },
                     oldData: req.body
                     });
                 }
         })
         .catch(error => {console.log(error)});
 
         console.log('USUARIO NO EXISTE, LO VAMOS A CREAR.....')
         //Si NO existe el usuario, hasheo el password para guardarlo en la DB
         let clave = bcryptjs.hashSync(req.body.password, 10);
 
         //Si me llegó una imagen la guardo, sino pongo una por default (hablando del nombre y no la imagen en si)
         let imagen = (req.file) ? req.file.filename : 'defaultImageUser.jpg';
         
         //Por ahora todos los usuarios creados seran user por defecto.
         tipoUsuario = 'user';
 
         // Creo el usuario
         db.User.create({
             first_name : req.body.firstname,
             last_name : req.body.lastname,
             user_type: tipoUsuario,
             email: req.body.email,
             password: clave,
             image: imagen,
         })
         .then(newUser => {
             res.redirect('/users/' + newUser.id_user);
         })
         .catch(error => {console.log(error)});
  
         // ---------------------  FIN CONFIG PARA DB  ----------------

    },
    userProfile : function (req, res) {
        // EDIT: edición de un usuario

        // ---------------------  INICIO CONFIG PARA DB  ----------------

        // console.log('ENTRE A userProfile de : ',req.params.id );
        db.User.findByPk(req.params.id)
          .then(function(user) {
              return res.render('users/userprofile', {user})
          })
          .catch(error => console.log("Falló el acceso a la DB o la edición del usuario", error))

        // ---------------------  FIN CONFIG PARA DB  ----------------
    },
    updateUser : async function (req,res) {
        //Update User
        
        //validamos los datos ingresados
        const resultValidation = validationResult(req);
        let userTemp = '';
        // Si hubo errores de validación
        if (resultValidation.errors.length > 0){
            //buscamos los datos de la DB para renderizar los datos de la portada del usuario (son campos distintos a los del formulario)
           
            await db.User.findByPk(req.params.id)
            .then(function(user) {
                userTemp = {
                    first_name : user.dataValues.first_name,
                    last_name : user.dataValues.last_name,
                    image : user.dataValues.image,
                    email : user.dataValues.email,
                    id_user : req.params.id
                }                
            })
            .catch(error => console.log("Falló el buscar los datos del usuario", error))

            console.log(chalk.red('Errores de validacion ', resultValidation));
            //console.log(userTemp);
            //console.log(resultValidation.mapped());
            return res.render ('users/userprofile',
            { 
                errors: resultValidation.mapped(),
                user: userTemp,
                oldData: req.body
            });            
        } else {
            db.User.findByPk(req.params.id)
            .then(async function(user) {
                // console.log('USER A MODIFICAR ', user)
                
                // No estamos validando que la ingrese dos veces para confirmar que la cambió bien
                 let clave = (req.body.password) ? bcryptjs.hashSync(req.body.password, 10) : user.password;
          
                //Si me llegó una imagen la guardo, sino dejo la que está
                //console.log('Imagen a cargar : ', req.body);
                let imagen = (req.body.image) ? req.body.image : user.image;
          
                await db.User.update({
                     first_name : req.body.firstname,
                     last_name : req.body.lastname,
                     password: clave,
                     image: imagen,
                }, {
                   where: {
                    id_user: req.params.id
                    }
                });
                res.redirect('/users/'+ req.params.id); 
            })
            .catch(error => console.log("Falló el acceso a la DB o la edición del usuario", error))

        }   
      // ---------------------  FIN CONFIG PARA DB  ----------------

    },
    detail: function (req,res) {
        //DETAIL
        // ---------------------  INICIO CONFIG PARA DB  ----------------
        // console.log('ENTRE A DETAILS de : ',req.params.id );
        db.User.findByPk(req.params.id)
          .then(function(user) {
              return res.render('users/details', {user})
          })
          .catch(error => console.log("Falló la descripción del usuario", error))
        // ---------------------  FIN CONFIG PARA DB  ----------------

    },
    destroy : function (req,res) {
        //DELETE (para que un usaurio se de de baja su propia cuenta)
        db.User.destroy({
            where: {
                id_user: req.params.id
            }
        });
        req.session.destroy();//borramos la sesion. Ver que onda con las cookies???
        res.redirect('/home');//va al home por que deja de estar logueado y deja de existir la cuenta.
    },
    destroyUsers : function (req, res){
        //El admin puede dar de baja cualquier usuario.
        // Agregar que si sos administrador, no podés borrar a otro administrador o al menos debe quedar uno 

        console.log('Usuario a borrar :',req.params.id )

        db.User_Product.destroy({
            where: {
                user_id: req.params.id
            }
        });

        // AGREGAR THEN !!
        db.User.destroy({
            where: {
                id_user: req.params.id
            }
        });
        res.redirect('/users');//redirecciona a la pagina de usuarios. Solo puede hacerlo si es admin
    },
    perfil : function (req,res) {
       res.render('users/userprofile');
    }
}