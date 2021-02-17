const path = require ('path');

module.exports = {
    login : function(req, res) {
        res.render('users/login');//muestra el login de usuario
    },
    register : function(req, res) {
        res.render('users/register');//muestra el registro de usuario
    },
    perfil : function(req, res) {
        res.render('users/userperfil');//muestra el registro de usuario
    }
}