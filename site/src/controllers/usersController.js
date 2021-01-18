const path = require ('path');

module.exports = {
    login : function(req, res) {
        res.render('login');//muestra el login de usuario
    },
    register : function(req, res) {
        res.render('register');//muestra el registro de usuario
    }
}