const path = require ('path');

module.exports = {
    login : function(req, res) {
        res.sendFile(path.join(__dirname, '../views/login.html'));//muestra el login de usuario
    },
    register : function(req, res) {
        res.sendFile(path.join(__dirname, '../views/register.html'));//muestra el registro de usuario
    },
    register2 : function(req, res) {
        res.sendFile(path.join(__dirname, '../views/register-effects.html'));//muestra el registro de usuario
    },
}