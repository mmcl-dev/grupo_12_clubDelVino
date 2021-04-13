//verificar si el usuario esta logueado por medio de session
//redirijir al home si no esta logueado con permiso para el CRUD

const db = require("../../../database/models");

module.exports = (req, res, next) => {
    if (!req.session.user) {
        //hacer validaciones para saber si es administrador o usuario comun. esto sirve para saber si puede o no editar un producto, o crear producto
        //este middleware hay que agregarlo a las rutas que correspondan, (que necesite ser administrador)
        return res.redirect('/home');
    }
    next();
};