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

// requiere de la función con todos las propiedades
const jsonTable = require('../database/jsonTable');
// Parametrizo la función con la tabla que necesito
const productsTable = jsonTable('products');


module.exports = {
    index : function(req, res) {
        let products = productsTable.all();//pedimos que traiga todos los productos
        res.render('index', {products} );//muestra el home leyendo del file de productos
    }
}