const db = require("../../../database/models");

module.exports = (req, res, next) => {
    //validaciones para saber si es administrador o usuario comun. esto sirve para saber si puede o no editar un producto, o crear producto
    //console.log ('*************'+Object.keys(req.session.user));
    //console.log ('*************'+req.session.user.user_type);

    //hardcodeamos esto para probar la app.
    //next();
    
    if (req.session.user && req.session.user.user_type == 'administrador') {
        next();
    }else{
        return res.redirect('/home');//redireccionamiento por si no cumple ser administrador
    }
    
    
};