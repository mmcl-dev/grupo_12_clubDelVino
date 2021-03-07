const path = require ('path');
const fs = require('fs');

//validaciones desde el backend
const { validationResult } = require('express-validator');

// requiere de la función con todos las propiedades
const jsonTable = require('../database/jsonTable');
// Parametrizo la función con la tabla que necesito
const productsTable = jsonTable('products');

function validateCheckBok(content) {
    //si viene el checkbok seleccionado (se usara un 1 para el true y un 0 para el false)
    //tener en cuenta esto se aplica al HTML y al guardado en el JSON.
    if(!content.offer){
        return 0;
    }else{
        return 1;
    }
}

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
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0){
            /*
            res.send({
                errors: resultValidation.mapped(),
                oldData: req.body
            });
            */
            
            return res.render ('products/create',
            { 
                errors: resultValidation.mapped(),
                oldData: req.body
            });
            
        }

        let product = req.body;
        //guardo el nombre de la imagen que previamente fue validada que llego
        product.image = req.file.filename;

        //registro del check de ofertas
        product.offer = validateCheckBok(product);
        //****falta armar logica si esta checked tiene que tener un valor de precio oferta mas bajo que el de precio y mayor a 0*****

        let productId = productsTable.create(product);
        res.redirect('/products/productDescription/'+ productId);

        //registro del check de ofertas
        //product.offer = validateCheckBok(product);
        //****falta armar logica si esta checked tiene que tener un valor de precio oferta mas bajo que el de precio y mayor a 0*****
        /*
        let productId = productsTable.create(product);
        res.redirect('/products/productDescription/'+ productId);
        */
        /*
        res.send({
            body: req.body,
            file: req.file
        });
        */
        
    },
    update : function(req, res) {
        let product = req.body;
        product.id = Number(req.params.id);

        //Si se carga una imagen nueva la guardo
        if (req.file){
            product.image = req.file.filename;
            //Si hay nueva imagen para este producto, borramos la imagen vieja que tenia y la reemplazamos por la nueva imagen
            productsTable.deleteImage(Number(req.params.id));
         } // Si no hay imagen, busco la que ya estaba en la DB
        else {
            oldProduct = productsTable.find(req.params.id);
            product.image = oldProduct.image;
        }

        //registro del check de ofertas
        product.offer = validateCheckBok(product);

        let productId = productsTable.update(product);

        res.redirect('/products/productDescription/'+ product.id);
    },
    showList : function(req, res) {
        let products = productsTable.all();//pedimos que traiga todos los productos
        //res.send({products});
        res.render('products/select_product_delete', {products} );//muestra el home leyendo del file de productos en el home
    },
    destroy: function(req, res) {
        //console.log(req.params.id);
        productsTable.delete(req.params.id);
        res.redirect('/home');
    }
}