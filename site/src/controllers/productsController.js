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
    create : function(req, res) {
        res.render('products/create');
    },
    edit : function(req, res) {
        let product = productsTable.find(req.params.id);
        // console.log(product);
        res.render('products/edit', {product});
    },
    productsHome : function(req, res) {
        let products = productsTable.all();//pedimos que traiga todos los productos
        res.render('products/products', {products} );//muestra el home leyendo del file de productos en el home
    },
    productsCart : function(req, res) {
        //*******TODAVIA NO ESTA HECHO LA PARTE QUE GUARDA EN MEMORIA LOS PRODUCTOS SELECCIONADOS***************
        //A MODO DE MUSTRA VISUALIZA TODOS
        let products = productsTable.all();//pedimos que traiga todos los productos
        //res.send({products});
        res.render('products/productsCart', {products} );//muestra el home leyendo del file de productos en el home
    },
    productDescription : function(req, res) {
        let product = productsTable.find(req.params.id);
        res.render('products/productDescription', {product});
    },
    store : function(req, res) {
        let product = req.body;
        
        //Si me llegó una imagen la guardo
        if (req.file){
            product.image = req.file.filename;
         } // Si no hay imagen, debería cargar una por default
        else {
            default_img = path.join(__dirname, '../../public/img/vino_default.png');
            product.image = default_img;
        }

        let productId = productsTable.create(product);
        res.redirect('/products/productDescription/'+ productId);
        
    },
    update : function(req, res) {
        let product = req.body;
        product.id = Number(req.params.id);

        //Si se carga una imagen nueva la guardo
        if (req.file){
            product.image = req.file.filename;
         } // Si no hay imagen, busco la que ya estaba en la DB
        else {
            oldProduct = productsTable.find(req.params.id);
            product.image = oldProduct.image;
        }

        let productId = productsTable.update(product);

        res.redirect('/products/productDescription/'+ product.id);
    },
    showList : function(req, res) {
        let products = productsTable.all();//pedimos que traiga todos los productos
        //res.send({products});
        res.render('products/select_product_delete', {products} );//muestra el home leyendo del file de productos en el home
    },
    destroy: function(req, res) {
        let product = req.body;
        res.redirect('/home');

    }
}