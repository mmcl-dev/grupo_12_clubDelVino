const path = require ('path');
const db = require('../../../database/models');
const chalk = require('chalk');

module.exports = {
    index : function(req, res) {

        let allProducts = db.Product.findAll({ include : [{association: "categorias"}] });
        let allCategories = db.Category.findAll();

        Promise.all([allProducts, allCategories])
            .then(function([products, categories]) {
                return res.render('index', {products, categories})
                })
            .catch(error => {
                console.log(chalk.red("MAINCONTROLLER Falló la busqueda de los datos en DB para el get de todos los productos y categorias (/home)"));
                console.log(error);
            }) 

        
    },
    error: function(req,res){
        res.render('others/404');//pagina que muestra error 404
        
    }
}