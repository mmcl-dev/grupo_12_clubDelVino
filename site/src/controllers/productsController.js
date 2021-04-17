const path = require ('path');
const fs = require('fs');
const db = require('../../../database/models'); 

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
        //-------  Config para JSON
        // let products = productsTable.all();//pedimos que traiga todos los productos
        // res.render('products/index', {products} );//Muestra todos los productos en un index distinto al home
        //------- FIN  Config para JSON

        // Config para DB
        db.Product.findAll({ include : [{association: "categorias"}]})
        .then(function(products){
            return res.render('products/index', {products})
        })
        .catch(error => console.log("Falló el listado", error))

    },
    create : function(req, res) {
        //Config para JSON:
        // res.render('products/create');

        //Config para MySQL DB:

        db.Category.findAll()
        .then(function(category){
            return res.render('products/create', {category})
        })
        .catch(error => console.log("Falló el pedido de categorias", error))

    },
    edit : function(req, res) {
        //Config para JSON:
        //   let product = productsTable.find(req.params.id);
        //     res.render('products/edit', {product});
        // },

        //Config para MySQL DB:

        // nombro los dos pedidos asincrónicos que necesito
        let pedidoProducto = db.Product.findByPk(req.params.id);
        let pedidoCategoria = db.Category.findAll();
        // La primera promesa la voy a resolver en 'product'
        // La segunda promesa la voy a resolver en 'category'
        Promise.all([pedidoProducto, pedidoCategoria])
            .then(function([product, category]) {
                // console.log('Valor categories : ',category);
                res.render('products/edit', {product, category})
                })
            .catch(error => console.log("Falló editar el producto", error))       
    },
    productsHome : function(req, res) {

        //Config para DB:

        db.Product.findAll({ include : [{association: "categorias"}] })
        .then(function(products){
            return res.render('products/products', {products})
        })
        .catch(error => console.log("Falló el listado del Home", error))
  
        // --------------------- CONFIG PARA JSON ----------------//
        // let products = productsTable.all();//pedimos que traiga todos los productos
        // res.render('products/products', {products} );
        // --------------------- FIN CONFIG PARA JSON ----------------//

    },
    productsCart : function(req, res) {
        //Config para JSON:
                    
        //*******TODAVIA NO ESTA HECHO LA PARTE QUE GUARDA EN MEMORIA LOS PRODUCTOS SELECCIONADOS***************
        // //A MODO DE MUSTRA VISUALIZA TODOS
        // let products = productsTable.all();//pedimos que traiga todos los productos
        // //res.send({products});
        // res.render('products/productsCart', {products} );//muestra el home leyendo del file de productos en el home

        // ----------------------------------
        // Config para DB:

        db.Product.findAll({ include : [{association: "categorias"}]})
        .then(function(products){
            return res.render('products/productsCart', {products})
        })
        .catch(error => console.log("Falló el listado", error))


    },
    productDescription : function(req, res) {
        //Config para JSON:
        // let product = productsTable.find(req.params.id);
        // res.render('products/productDescription', {product});

        //Config para DB:

        // Voy a usar las relaciones paa poder mostrar el producto con su categoria
		db.Product.findByPk(req.params.id, {
          include : [{association: "categorias"}]
        })
        .then(function(product) {
            return res.render('products/productDescription', {product})
        })
        .catch(error => console.log("Falló la descripción del producto", error))

    },
    store : function(req, res) {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0){
               return res.render ('products/create',
            { 
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        //Config para MySQL DB:

        // console.log('NUEVO REGISTRO : ', req.body);

        //registro del check de ofertas
        offer_value = validateCheckBok(req.body);

        db.Product.create({
            product_name : req.body.product_name,
            description : req.body.description,
            wine_family : req.body.wine_family,
            category_id : req.body.category,
			year : req.body.year,
			price : req.body.price,
			offer : offer_value,
			offer_price : req.body.offer_price,
            image : req.file.filename,
        });

        // Originalmente redireccionaba a productDescription, pero cuando creamos
        // el producto con la DB, no nos devuelve un id, por eso redirecciono al listado completo
        // res.redirect('/products/productDescription/'+ req.params.id);
        res.redirect('/products/listProducts');

        // --------------------- CONFIG PARA JSON ----------------//
        // let product = req.body;
        // //guardo el nombre de la imagen que previamente fue validada que llego
        // product.image = req.file.filename;

        // //registro del check de ofertas
        // product.offer = validateCheckBok(product);
        // //****falta armar logica si esta checked tiene que tener un valor de precio oferta mas bajo que el de precio y mayor a 0*****

        // let productId = productsTable.create(product);
        // res.redirect('/products/productDescription/'+ productId);
        // --------------------- CONFIG PARA JSON ----------------//
        
        // LO QUE SIGUE YA ESTABA COMENTADO DESDE SIEMPRE

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
        // GURADAMOS CAMBIOS DE LA EDICIÓN

        // Esta validación estaba hay que revisarla , product y oldData tienen el mismo valor?
        let product = req.body;
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
            return res.render('products/edit',
            { 
                errors: resultValidation.mapped(),
                oldData: req.body,
                product
            });
        }
        
        //Config para JSON:

        // let product = req.body;
        // product.id = Number(req.params.id);

        // //Si se carga una imagen nueva la guardo
        // if (req.file){
        //     product.image = req.file.filename;
        //     //Si hay nueva imagen para este producto, borramos la imagen vieja que tenia y la reemplazamos por la nueva imagen
        //     productsTable.deleteImage(Number(req.params.id));
        //  } // Si no hay imagen, busco la que ya estaba en la DB
        // else {
        //     oldProduct = productsTable.find(req.params.id);
        //     product.image = oldProduct.image;
        // }

        // //registro del check de ofertas
        // product.offer = validateCheckBok(product);
        // let productId = productsTable.update(product);
        // res.redirect('/products/productDescription/'+ product.id);
        // -----------------------------------------------------------

        //Config para MySQL DB:

        //Si se carga una imagen nueva la guardo
        if (req.file){
		    db.Product.update(
			  {image : req.file.filename},
			  {where: {id_product: req.params.id}
		   })
		}

		//registro del check de ofertas
        offer_value = validateCheckBok(req.body);

		db.Product.update({
            product_name : req.body.product_name,
            description : req.body.description,
            wine_family : req.body.wine_family,
            category_id : req.body.category,
			year : req.body.year,
			price : req.body.price,
			offer : offer_value,
			offer_price : req.body.offer_price,
        }, {
            where: {
                id_product: req.params.id
            }
        });
		
        res.redirect('/products/productDescription/'+ req.params.id);
     

    },
    showList : function(req, res) {
        //Config para JSON:
        // let products = productsTable.all();//pedimos que traiga todos los productos
        // //res.send({products});
        // res.render('products/select_product_delete', {products} );//muestra el home leyendo del file de productos en el home
        
        //Config para MySQL DB:
        db.Product.findAll({ include : [{association: "categorias"}]})
        .then(function(products){
            return res.render('products/select_product_delete', {products})
        })
        .catch(error => console.log("Falló el listado", error))
    },
    destroy: function(req, res) {
        //Config para JSON:
        // productsTable.delete(req.params.id);
        // res.redirect('/home');

        //Config para MySQL DB:

        // Revisar bajo qué condiciones se puede borrar lo que quiero borrar "Está seguro?"
        db.Product.destroy({
            where: {
                id_product: req.params.id
            }
        })

        res.redirect('/home');

    }
}