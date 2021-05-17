const db = require('../../../database/models'); 
const Cart = require('../utils/cart');

//validaciones desde el backend
const { validationResult } = require('express-validator');

//para la busqueda o borrado de las imagenes en el servidor (la imagen en si y no la referencia de la DB)
const imageUtils = require('../utils/imageUtils');

const {Op} = require('sequelize');

//para dar color a la consola
const chalk = require('chalk');


function validateCheckBok(content) {
    //si viene el checkbok seleccionado (se usara un 1 para el true y un 0 para el false)
    //tener en cuenta esto se aplica al HTML y al guardado en la DB
    if(!content.offer){
        return 0;
    }else{
        return 1;
    }
}

module.exports = {
    index : function(req, res) {
        // Config para DB
        db.Product.findAll({ include : [{association: "categorias"}]})
        .then(function(products){
            return res.render('products/index', {products})
        })
        .catch(error => {
            console.log(chalk.red("PRODUCTCONTROLLER-Falló el listado que viene de la DB (index)"));
            console.log(error);
        })  
    },
    create : function(req, res) {
        
        db.Category.findAll()
        .then(function(category){
            return res.render('products/create', {category})
        })
        .catch(error => {
            console.log(chalk.red("PRODUCTCONTROLLER-Falló el pedido de categorias de la DB (create por get)"));
            console.log(error);
        }) 
    },
    edit : function(req, res) {
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
            .catch(error => {
                console.log(chalk.red("PRODUCTCONTROLLER-Falló la busqueda de los datos en DB para el get del producto para popular la pagina (products/edit)"));
                console.log(error);
            })      
    },
    productsHome : function(req, res) {
        //pantalla home por get
        db.Product.findAll({ include : [{association: "categorias"}] })
        .then(function(products){
            return res.render('products/products', {products})
        })
        .catch(error => {
            console.log(chalk.red("PRODUCTCONTROLLER-Falló el listado del Home, busca todos los productos en la DB (products/products)"));
            console.log(error);
        }) 
    },
    addToCart : function(req, res) {
        let productId = req.params.id;
        let cart = new Cart(req.session.cart ? req.session.cart : { items: {} });

        db.Product.findByPk(req.params.id, {
                 include : [{association: "categorias"}]
          })
          .then(function(product){
                        // console.log('ESTOY AGREGANDO UN : ', product.categorias.category_name )
                        cart.add(product, productId, product.categorias.category_name);
                        req.session.cart = cart;

                        // Si el usuario está logueado, inserto el item en la DB user_product
                        if (req.session.user) {
                            
                            // Busco primero si el usuario ya tiene ese producto. Si es así, sólo actualizo
                            cantProd = req.session.cart.items[productId].qty;
                            // console.log('ESTE ES EL USER :', req.session.user.id_user);
                            db.User_Product.findOne({
                                where: {
                                     user_id: req.session.user.id_user,
                                     product_id: productId
                                  }
                                 })
                             .then( row_user_product => {
                                    if (row_user_product) {
                                    // Si existe esa la combinacion usuario-producto, sólo actualizo la cantidad
                                    
                                        db.User_Product.update(
                                                { quantity : cantProd },
                                                { where: {
                                                    user_id : req.session.user.id_user,
                                                    product_id : productId
                                                    }}
                                                )
                                        .then(()=>{
                                            res.redirect('/'); // me quedo en la página de poductos
                                        })
                                        .catch(error => {
                                            console.log(chalk.red("PRODUCTCONTROLLER-Falló la inserción de datos en la tabla user_product "));
                                            console.log(error);
                                        });
                                    
                                    
                                     } else { // Si no existe esa combinacion, la creo

                                        db.User_Product.create(
                                            {   user_id : req.session.user.id_user,
                                                product_id : productId,
                                                quantity : cantProd,
                                            })
                                            .then(()=>{
                                                res.redirect('/'); // me quedo en la página de poductos
                                            })
                                            .catch(error => {
                                                console.log(chalk.red("PRODUCTCONTROLLER-Falló la inserción de datos en la tabla user_product "));
                                                console.log(error);
                                            });
  
                                     }
                             })
                             .catch(error => {console.log('ERROR User_Product.findOne ', error)});

                            
                                            
                        } else {
                            res.redirect('/'); // me quedo en la página de poductos
                          }

                        // console.log(req.session.cart);
                        
          })
          .catch(error => {
            console.log(chalk.red("PRODUCTCONTROLLER-Falló búsqueda en DB del producto a agregar al carrito "));
            console.log(error);
        }) 


    },
    deleteOnefromCart : function(req, res) {

        // console.log('productController: VOY A REMOVER un SOLO ITEM!!')
        let productId = req.params.id;

        let currentCart = req.session.cart.items[productId];

        let cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.deleteOne(productId);
        req.session.cart = cart;

        // Si el usuario está logueado, borro un item en la DB user_product
        if (req.session.user) {
            // Busco primero si el usuario ya tiene ese producto. Si es así, sólo actualizo
			console.log('productController: MI prod a borrar :', currentCart);
            cantProd = currentCart.qty;

            db.User_Product.findOne({
                where: {
                     user_id: req.session.user.id_user,
                     product_id: productId
                  }
                 })
                 .then( row_user_product => {
                    if (row_user_product.quantity == 1) {
                    // Si tiene un sólo item de ese producto, borro el registro
                                                        
                        db.User_Product.destroy({
                                    where: {
                                        user_id: req.session.user.id_user,
                                        product_id: productId
                                    }
                                })
                        .then(()=>{
                            res.redirect('/products/productsCart'); // redirecciono a la página del carrito
                        })
                        .catch(error => {
                            console.log(chalk.red("PRODUCTCONTROLLER-Falló el borrado de datos en la tabla user_product "));
                            console.log(error);
                        });
                    
                    
                     } else { // Si tiene más items, borro uno

                        db.User_Product.update(
                                { quantity : cantProd },
                                { where: {
                                    user_id : req.session.user.id_user,
                                    product_id : productId
                                    }}
                                )
                        .then(()=>{
                            res.redirect('/products/productsCart'); // redirecciono a la página del carrito
                        })
                        .catch(error => {
                            console.log(chalk.red("PRODUCTCONTROLLER-Falló el borrado de datos en la tabla user_product "));
                            console.log(error);
                        });

                     }
             })
             .catch(error => {console.log('ERROR User_Product.findOne ', error)});

        } else {
            res.redirect('/products/productsCart'); // redirecciono a la página del carrito
        };       

    },
    removefromCart : function(req, res) {

        console.log('productController: VOY A REMOVER EL PRODUCTO ENTERO!!')
        let productId = req.params.id;
        let cart = new Cart(req.session.cart ? req.session.cart : {});

        cart.removefromCart(productId);
        req.session.cart = cart;

        // Si el usuario está logueado, le borro los productos que agregó
        if (req.session.user) {
            db.User_Product.destroy({
                where: {
                        user_id: req.session.user.id_user,
                        product_id: productId
                       }
                })
                .then(()=>{
                    res.redirect('/products/productsCart'); // redirecciono a la página del carrito
                })
                .catch(error => {
                    console.log(chalk.red("PRODUCTCONTROLLER-Falló el borrado de datos en la tabla user_product "));
                    console.log(error);
                });
        } else {
             res.redirect('/products/productsCart'); // redirecciono a la página del carrito
        }
    },
    productsCart : function(req, res) {

        if (!req.session.cart) {
            // si no existe el carrito en la sesión renderizo sin productos
                return res.render('products/productsCart', {products: null})
        }
        
        let cart = new Cart(req.session.cart);
        
        return res.render('products/productsCart', {
                                        products: cart.generateArray(),
                                        totalPrice: cart.totalPrice,
                                        totalQty: cart.totalQty
                                        })

                     
        // pantalla de listado de productos por get ::: VISTA ESTÁTICA ORIGINAL
        // db.Product.findAll({ include : [{association: "categorias"}]})
        // .then(function(products){
        //     return res.render('products/productsCart', {products})
        // })
        // .catch(error => {
        //     console.log(chalk.red("PRODUCTCONTROLLER-Falló el listado, busca todos los productos en la DB (products/productsCart)"));
        //     console.log(error);
        // }) 
    },
    productDescription : function(req, res) {
        // Se usa las relaciones para poder mostrar el producto con su categoria
		db.Product.findByPk(req.params.id, {
          include : [{association: "categorias"}]
        })
        .then(function(product) {
            return res.render('products/productDescription', {product})
        })
        .catch(error => {
            console.log(chalk.red("PRODUCTCONTROLLER-Falló la descripción del producto, busca los datos en la DB (products/productDescription)"));
            console.log(error);
        }) 
    },
    store : function(req, res) {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0){
            db.Category.findAll()
                .then(function(category){
                    return res.render('products/create',{
                        errors: resultValidation.mapped(),
                        oldData: req.body,
                        category
                    })
                })
                .catch(error => {
                    console.log(chalk.red("PRODUCTCONTROLLER-Falló el pedido de categorias en la DB(products/create)"));
                    console.log(error);
                }) 
        }else{
            //Config para MySQL DB:
            //console.log('**********************NUEVO REGISTRO : ', req.body);
            //registro del check de ofertas
            offer_value = validateCheckBok(req.body);

            db.Product.create({
                product_name : req.body.product_name,
                description : req.body.description,
                wine_family : req.body.wine_family,
                category_id : req.body.category_id,
                year : req.body.year,
                price : req.body.price,
                offer : offer_value,
                offer_price : req.body.offer_price,
                image : req.file.filename
            })
            .then(()=>{
                res.redirect('/products/listProducts');
            })
            .catch(error => {
                console.log(chalk.red("PRODUCTCONTROLLER-Falló la creacion de un nuevo producto en DB (/products/listProducts)"));
                console.log(error);
            }) 
            // Originalmente redireccionaba a productDescription, pero cuando creamos
            // el producto con la DB, no nos devuelve un id, por eso redirecciono al listado completo
            // res.redirect('/products/productDescription/'+ req.params.id);

            //res.redirect('/products/listProducts');  
        }    
    },
    update : function(req, res) {
        // GURADAMOS CAMBIOS DE LA EDICIÓN
        //console.log(chalk.yellow('ENTRE a update de Producto'));
        //console.log(req.body);
        let product = req.body;
        product.id_product = req.params.id;
        const resultValidation = validationResult(req);
        // Si falla la validación en backend
        if (resultValidation.errors.length > 0){
            console.log(chalk.red('PRODUCTCONTROLLER update-listado de fallos de validaciones en el backend'));
            console.log('ESTOS ERRORES :', resultValidation.errors);

            // Busco todas las categorias y editamos nuevamente el formulario
            db.Category.findAll()
            .then(function(category){
                return res.render('products/edit',
                { 
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    product,
                    category
                });
            })
            .catch(error => {
                console.log(chalk.red("PRODUCTCONTROLLER-Falló el devolver errores en el form de edit de producto (products/edit)"));
                console.log(error);
            })           
        }else{
            //seteo del registro del check de ofertas para guardar su estado en la DB
            offer_value = validateCheckBok(req.body);
            //Si se carga una imagen nueva la guardo
            //console.log('***********************************'+req.body.offer_price);
            if (req.file){
                db.Product.update(
                {   image : req.file.filename,
                    product_name : req.body.product_name,
                    description : req.body.description,
                    wine_family : req.body.wine_family,
                    category_id : req.body.category_id,
                    year : req.body.year,
                    price : req.body.price,
                    offer : offer_value,
                    offer_price : req.body.offer_price
                },{
                    where: {
                        id_product: req.params.id
                    }
                })
                .then(()=>{
                    res.redirect('/products/productDescription/'+ req.params.id);
                })
                .catch(error => {
                    console.log(chalk.red("PRODUCTCONTROLLER-Falló editar el producto en la DB ('/products/productDescription/'+ req.params.id)"));
                    console.log(error);
                });
                
            }else{
                db.Product.update({
                    product_name : req.body.product_name,
                    description : req.body.description,
                    wine_family : req.body.wine_family,
                    category_id : req.body.category_id,
                    year : req.body.year,
                    price : req.body.price,
                    offer : offer_value,
                    offer_price : req.body.offer_price
                }, {
                    where: {
                        id_product: req.params.id
                    }
                })
                .then(()=>{
                    res.redirect('/products/productDescription/'+ req.params.id);
                })
                .catch(error => {
                    console.log(chalk.red("PRODUCTCONTROLLER-Falló editar el producto en la DB ('/products/productDescription/'+ req.params.id)"));
                    console.log(error);
                });
            }
        }
    },
    showList : function(req, res) {   
        //Listado de todos los productos para la pantalla editar/borrar productos
        db.Product.findAll({ include : [{association: "categorias"}]})
        .then(function(products){
            return res.render('products/select_product_delete', {products})
        })
        .catch(error => {
            console.log(chalk.red("PRODUCTCONTROLLER-Falló el listado"));
            console.log(error);
        });
    },
    destroy: function(req, res) {
        //Borramos la imagen fisica del server y despues borramos los datos de la DB y despues nos redirijimos a la home
        imageUtils.deleteImageProduct(req.params.id)
            db.Product.destroy({
                where: {
                    id_product: req.params.id
                }
            })          
        .then(()=>{
            res.redirect('/home');
        })
        .catch(error => {
            console.log(chalk.red("PRODUCTCONTROLLER-Falló el borrado del producto"));
            console.log(error);
        });
    },
    searchCategory: function(req,res){
        //console.log("*************** " +  req.body.searchCategory);
        let searchAllCategories = db.Category.findAll();
        let searchProducts= db.Product.findAll({
            where: {
                category_id: { [Op.eq]: req.body.category_id }
            },
            include : [{association: "categorias"}]
        });

        Promise.all([searchProducts, searchAllCategories])
            .then(function([products, categories]) {
            //console.log(products);
                return res.render('products/productsList', {products, categories})
          })
          .catch(error => {
              console.log(chalk.red("PRODUCTCONTROLLER-Falló la busqueda de los productos por categoria, busca los datos en la DB (products/productList)"));
              console.log(error);
          })  
    },
    searchWord: function(req,res){
        //console.log("*************** " +  req.body.searchWord);
        
        let tempSearch = '%'+req.body.searchWord+'%';

        let searchAllCategories = db.Category.findAll();
        let searchProducts= db.Product.findAll({
            where: {
                product_name: { [Op.like]: tempSearch }
            },
            include : [{association: "categorias"}]
        });

        Promise.all([searchProducts, searchAllCategories])
            .then(function([products, categories]) {
            //console.log(products);
                return res.render('products/productsList', {products, categories})
          })
          .catch(error => {
              console.log(chalk.red("PRODUCTCONTROLLER-Falló la busqueda de los productos que cumplen con la palabra clave, busca los datos en la DB (products/productList)"));
              console.log(error);
          })           
    }
}