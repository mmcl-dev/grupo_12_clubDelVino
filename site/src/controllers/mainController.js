/*****original */
/*
const path = require ('path');

module.exports = {
    index : function(req, res) {
        res.render('index');//muestra el home
    },
}
*/
/*********************** */
const path = require ('path');
const fs = require('fs');
const db = require('../../../database/models');

// requiere de la función con todos las propiedades
const jsonTable = require('../database/jsonTable');
//const { ForeignKeyConstraintError } = require('sequelize/types');
// Parametrizo la función con la tabla que necesito
const productsTable = jsonTable('products');


module.exports = {
    index : function(req, res) {

        // Config para JSON
        // let products = productsTable.all();//pedimos que traiga todos los productos
        // res.render('index', {products} );//muestra el home leyendo del file de productos

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