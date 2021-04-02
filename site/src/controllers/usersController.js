const path = require ('path');
const { validationResult } = require('express-validator');
const db = require('../../../database/models'); 

const bcryptjs = require('bcryptjs');

// requiere de la función con todos las propiedades
const jsonTable = require('../database/jsonTable');
// Parametrizo la función con la tabla que necesito
const usersTable = jsonTable('users');


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
    processLogin : function(req, res) {
        //validar datos del login
        const resultValidation = validationResult(req);
        
        console.log('Este es el req.body.email :', req.body.email);

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
                        console.log('Usuario Logueado ', user);
                        req.session.user = user;
					    req.session.auth = true;
                        idUsuario = user.id_user;
                        console.log('USER ID : ', idUsuario);
                        return res.redirect('/users/' + idUsuario)
                    } 
                }
                // Si no encontró al usuario o si lo encontró pero el password no coincide,
                // vuelvo a renderizar la pantalla de login
                return res.render ('users/login', {
                    errors: 'La contraseña o el usuario es incorrecto'
                });
            })
            .catch(error => console.log(error));

        } else {

        // ---------------------  FIN CONFIG PARA DB  ----------------

        // ---------------------  INICIO CONFIG PARA JSON  ----------------


        // Si no hay errores
        // if (resultValidation.isEmpty()){
        //     let user = usersTable.findByField('email', req.body.email);   
        //     //console.log('user: ' + user); 
        //     // Si el usuario existe
        //     if (user) {
        //         // Si la contraseña es correcta
        //         let passwordIsOK = bcryptjs.compareSync(req.body.password, user.password);
        //         if (passwordIsOK ) {
        //             // USUARIO LOGUEADO
        //             // delete user.password;
        //             req.session.user = user;
        //             return res.redirect('/users/' + user.id)
        //         }else{
        //             return res.render ('users/login',
        //             { 
        //                 errors:{
        //                     password:{
        //                         msg:'La contraseña es incorrecta'
        //                     }
        //                 },
        //                 oldData: req.body
        //             });
        //         }
        //     }else{
        //         return res.render ('users/login',
        //         { 
        //             errors:{
        //                 email:{
        //                     msg:'El usuario no existe'
        //                 }
        //             },
        //             oldData: req.body
        //         }); 
        //     }
        // }

        // ---------------------  FIN CONFIG PARA JSON  ----------------


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
 
         //Si me llegó una imagen la guardo, sino pongo una por default
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
             res.redirect('/users')
         })
         .catch(error => {console.log(error)});
 
                 
 
         // ---------------------  FIN CONFIG PARA DB  ----------------


        // ---------------------  INICIO CONFIG PARA JSON  ----------------

        // Si no hubo errores, busco si existe ese usuario
        // let userInDB = usersTable.findByField('email', req.body.email);
        // if(userInDB){
        //     return res.render ('users/register',
        //     { 
        //         errors:{
        //             email:{
        //                 msg:'Este usuario ya esta registrado'
        //             }
        //         },
        //         oldData: req.body
        //     }); 
        // }
        
        // //Si No existe el usuario hasheo el password y guardo los datos en la DB
        // let user = req.body;
        // user.password = bcryptjs.hashSync(req.body.password, 10);

        // //Si me llegó una imagen la guardo
        // if (req.file){
        //     user.image = req.file.filename;
        //  } // Si no hay imagen, debería cargar una por default
        // else {
        //     user.image = 'defaultImageUser.jpg';
        // }

        // //Por ahora todos los usuarios creados seran user por defecto.
        // user.category = 'user';

        // //*******MUY IMPORTANTE, VAMOS A GRABAR EN DB LOS DATOS DEL USUARIO NUEVO, ESTO LLEVA TIEMPO, ASI QUE USAMOS UNA PROMESA PARA */
        // //*******LUEGO BUSCAR EL NUEVO ID Y PODER REDIRECCIONAR A LA PAGINA CORRECTAMENTE */
        // //ESTA PENDIENTE USAR LA PROMESA****///
        // let newUser = usersTable.create(user);
        // let userId = usersTable.findByField('email', req.body.email); 

        // res.redirect('/users/' + userId.id);

        // ---------------------  FIN CONFIG PARA JSON  ----------------

    },
    userProfile : function (req, res) {
        // EDIT: edición de un usuario

        // ---------------------  INICIO CONFIG PARA DB  ----------------

        console.log('ENTRE A userProfile de : ',req.params.id );
        db.User.findByPk(req.params.id)
          .then(function(user) {
              return res.render('users/userprofile', {user})
          })
          .catch(error => console.log("Falló el acceso a la DB o la edición del usuario", error))

        // ---------------------  FIN CONFIG PARA DB  ----------------

        // ---------------------  INICIO CONFIG PARA JSON  ----------------
        // let user = usersTable.find(req.params.id);
        // res.render('users/userprofile', { user });
        // ---------------------  FIN CONFIG PARA JSON  ----------------
    },
    updateUser : function (req,res) {
        //Update User
        
        //validamos los datos ingresados
        const resultValidation = validationResult(req);

        console.log('Errores de validacion ',resultValidation);

        // ---------------------------------------------------------------------------
        // LA VALIDACION HAY QUE REVISARLA, NO PERMITE clave en VACIO por ejemplo. Que pasa si no
        // quiero cambiar la clave
        // Está comentada por esa razon !!!!!!!!!! DESCOMENTAR DESPUES !!
        

        // Si hubo errores de validación
        // if (resultValidation.errors.length > 0){
        //     //console.log(resultValidation.mapped());
        //     return res.render ('users/userprofile',
        //     { 
        //         errors: resultValidation.mapped(),
        //         oldData: req.body
        //     });            
        // }

        // ---------------------  INICIO CONFIG PARA DB  ----------------
		
		db.User.findByPk(req.params.id)
        .then(function(user) {
            console.log('USER A MODIFICAR ', user)
            
            // No estamos validando que la ingrese dos veces para confirmar que la cambió bien
             let clave = (req.body.password) ? bcryptjs.hashSync(req.body.password, 10) : user.password;
      
            //Si me llegó una imagen la guardo, sino dejo la que está
            console.log('Imagen a cargar : ', req);
            let imagen = (req.body.image) ? req.body.image : user.image;
      
            db.User.update({
                 first_name : req.body.firstname,
                 last_name : req.body.lastname,
                 password: clave,
                 image: imagen,
            }, {
               where: {
                id_user: req.params.id
                }
            });
        res.redirect('/'+ req.params.id); 
        })
        .catch(error => console.log("Falló el acceso a la DB o la edición del usuario", error))
      
      
      
            
      // ---------------------  FIN CONFIG PARA DB  ----------------

        // ---------------------  INICIO CONFIG PARA JSON  ----------------
        // let user = req.body;
        // user.id = req.params.id;

        // //informacion del usuario en la DB
        // oldUser = usersTable.find(user.id);

        // //**********Subir o no imagen al perfil de usuario es opcional ************/
        // // Si viene una imagen nueva la guardo
        // if (req.file) {
        //     user.image = req.file.filename;
        // // Si no viene una imagen nueva, busco en base la que ya había
        // } else {
        //     user.image = oldUser.image;
        // }

        // //**********el EMAIL no puede cambiar asi que asignamos el que esta en DB ************/
        // user.email = oldUser.email;
        // //La categoria es la misma que la anterior
        // user.category = oldUser.category;

        // //Hasheo la password nueva
        // user.password = bcryptjs.hashSync(req.body.password, 10);

        // let userId = usersTable.update(user);

        // // Redirecciono a página de detalle DETAIL
        // res.render('users/details', { user });
        // //res.redirect('users/' + userId);

        // ---------------------  FIN CONFIG PARA JSON  ----------------

    },
    detail: function (req,res) {
        //DETAIL
        // let user = usersTable.find(req.params.id);
        // res.render('users/details', { user });

        // ---------------------  INICIO CONFIG PARA DB  ----------------
        console.log('ENTRE A DETAILS de : ',req.params.id );
        db.User.findByPk(req.params.id)
          .then(function(user) {
              return res.render('users/details', {user})
          })
          .catch(error => console.log("Falló la descripción del usuario", error))
        // ---------------------  FIN CONFIG PARA DB  ----------------

    },
    destroy : function (req,res) {
        //DELETE
        db.User.destroy({
            where: {
                id_user: req.params.id
            }
        });
        res.redirect('/users');

        // ---------------------  INICIO CONFIG PARA JSON  ----------------

        // let users = usersTable.all()
        // usersTable.delete(req.params.id);
        // // Redirecciono a alguna lista global de usuarios --- NO ESTÄ CREADA ESTA RUTA
        // res.redirect('/users');
        // ---------------------  FIN CONFIG PARA JSON  ----------------
    },
    perfil : function (req,res) {
       res.render('users/userprofile');
    }
}