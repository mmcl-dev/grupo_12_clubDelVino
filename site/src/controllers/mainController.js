const path = require ('path');
const db = require('../../../database/models');

module.exports = {
    index : function(req, res) {
        //Config para DB:
        db.Product.findAll({ include : [{association: "categorias"}] })
        .then(function(products){
            return res.render('index', {products})
        })
        .catch(error => console.log("Falló el index de maincontroller", error))
        
    },
    error: function(req,res){
        res.render('others/404');//pagina que muestra error 404
    }
}