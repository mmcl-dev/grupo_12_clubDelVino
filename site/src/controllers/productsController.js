const path = require ('path');
const fs = require('fs');

// requiere de la función con todos las propiedades
const jsonTable = require('../database/jsonTable');
// Parametrizo la función con la tabla que necesito
const productsTable = jsonTable('products');


module.exports = {
    index : function(req, res) {
        let products = productsTable.all();//pedimos que traiga todos los productos
        res.render('products/index', {products} );//Muestra todos los productos en un index distinto al home
    },
    productsHome : function(req, res) {
        let products = productsTable.all();//pedimos que traiga todos los productos
        res.render('products/products', {products} );//muestra el home leyendo del file de productos en el home
    },
    productsCart : function(req, res) {
        res.render('products/productsCart');
    },
    productDescription : function(req, res) {
        res.render('products/productDescription');
    }
}