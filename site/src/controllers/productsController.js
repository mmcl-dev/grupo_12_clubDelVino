const path = require ('path');
const fs = require('fs');

// requiere de la función con todos las propiedades
const jsonTable = require('../database/jsonTable');
// Parametrizo la función con la tabla que necesito
const productsTable = jsonTable('products');


module.exports = {
    index : function(req, res) {
        let products = productsTable.all();

        res.render('products/index', {products} );//muestra el home leyendo del file de productos
    },
    productsCart : function(req, res) {
        res.render('products/productsCart');
    },
    productDescription : function(req, res) {
        res.render('products/productDescription');
    }
}