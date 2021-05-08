const db = require('../../../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Products = db.Product;
const Categories = db.Category;

const URL_IMAGES = 'https://elclubdelvino.herokuapp.com/img/';

// Status list 
const STATUS_SUCCESS = 'success'
const STATUS_ERROR = '"error al conectarse a la DB"'
const STATUS_UPD_SUCCESS = 'successfully updated'
const STATUS_NOT_FOUND = "ID not found"
const STATUS_DEL_ERROR = "ID not deleted"
const STATUS_DEL_SUCCESS = 'successfully deleted'


module.exports ={
    
    list: (req, res)=>{
        Products.findAll({
                include: ['categorias']
            })
                .then(products => {
                    products.map(result=>{
                        result.image=URL_IMAGES+result.image;
                    })
                    return res
                    .status(200)
                        .json({
                            meta: {
                                totalProducts: products.length
                            },
                            data: products,
                            status: STATUS_SUCCESS
                    })
                })
                .catch(error => {
                    res
                       .status(500)
                       .json({
                           status: STATUS_ERROR,
                           error,
                       })
                })
    },
    detail: (req, res) => {
        // localhost:3030/api/v1/products/detail/?id=2
        const { id } = req.params
        Products.findByPk(id,
            {
                include : ['categorias']
            })
            .then(product => {

                if (!product) {
                    return res.status(404)
                        .json({
                            status: STATUS_NOT_FOUND
                        })
                }

                return res.status(200)
                    .json({
                        data: product,
                        status: STATUS_SUCCESS
                    })
            })
            .catch(error => {
                res
                   .status(500)
                   .json({
                       status: STATUS_ERROR,
                       error,
                   })
            });
    },
    create: (req, res) =>{
        // console.log(req.body)
        // Agregar validaciones!!  Los campos no pueden ser nulos salvos el de offer price
        Products
         .create(req.body)
         .then(product => {
             return res.status(201)
				.json({
					data:product,
					status: STATUS_SUCCESS,
	             })
          })
         .catch(error => {
                res
                   .status(500)
                   .json({
                       status: STATUS_ERROR,
                       error,
                   })
            })
      
    },
    update: (req, res) =>{
        
        Products
        .update(req.body, {
            where: {id_product: req.params.id}
        })
        .then(() => {
            Products.findByPk(req.params.id)
            .then(product => {
                return res.status(200)
                .json({
                    data:product,
                    status: STATUS_UPD_SUCCESS,
                 })
            }) 
         }
        )                 
        .catch(error => {
                res
                   .status(500)
                   .json({
                       status: STATUS_ERROR,
                       error,
                   })
            })
    },
    destroy: (req, res) =>{
        const { id } = req.params
        console.log('ID : ',id)
        Products.findByPk(id)
        .then(product => {
            if (product) {
                Products
                .destroy({
                    where: {
                        id_product: req.params.id
                    }
                })
                .then(response => {
                    return res.status(200)
                        .json({
                            status: 200,
                            updated: STATUS_DEL_SUCCESS,
                            response
                        })
                })
                .catch(error => {
                    res
                    .status(500)
                    .json({
                        status: STATUS_DEL_ERROR,
                        error,
                    })
                }) 
              } else
              {
                // No se encontró el producto
                res.json('Producto no encontrado')
              } 
        })
        .catch(error => {
            res
            .status(500)
            .json({
                status: STATUS_NOT_FOUND,
                error,
            })
        })
    
    },
    searchbyproductname: (req, res) => {
        //  localhost:3030/api/v1/products/searchbyproductname?keyword=Espumante
        Products
        .findOne({
            where: {
                product_name: { [Op.like]: '%' + req.query.keyword + '%' }
            }                      
        })
        .then(products => {
            return res.status(200)
            .json(products);
        })
        .catch(error => {
            res
            .status(500)
            .json({
                status: STATUS_NOT_FOUND,
                error,
            })
        })
    },
    searchbycategoryname: (req, res) => {
        //   localhost:3030/api/v1/products/searchbycategoryname?keyword=Malbec

        db.Category.findOne({
            where: {
                category_name: { [Op.like]: '%' + req.query.keyword  + '%' }
            } 
        }).then((tempCategory)=>{
            Products
            .findAll({
                where: {
                    category_id: { [Op.like]: '%' + tempCategory.id_category + '%' }
                }        
            })
            .then(products => {
                return res.status(200)
                .json(products);
            })
            .catch(error => {
                res
                .status(500)
                .json({
                    status: STATUS_NOT_FOUND,
                    error,
                })
            })
        })
        .catch(error => {
            res
            .status(500)
            .json({
                status: STATUS_NOT_FOUND,
                error,
            })
        })
    },
    searchbywinefamily: (req, res) => {
        //   localhost:3030/api/v1/products/searchbywinefamily?keyword=Siete
        Products
        .findAll({               
            where: {
                wine_family: { [Op.like]: '%' + req.query.keyword + '%' }
            }       
        })
        .then(products => {
            return res.status(200)
            .json(products);
        })
        .catch(error => {
            res
            .status(500)
            .json({
                status: STATUS_NOT_FOUND,
                error,
            })
        })
    },

    listofcategories: (req, res) => {
        //   localhost:3030/api/v1/products/listofcategories
        db.Category.findAll({               
      
        })
        .then(categories => {
            return res
            .status(200)
            .json({
                meta: {
                    totalCategories: categories.length
                },
                categories
            });
        })
        .catch(error => {
            res
            .status(500)
            .json({
                status: STATUS_NOT_FOUND,
                error,
            })
        })
    },
    searchlastproduct: (req, res) => {
        //  localhost:3030/api/v1/products/searchlastproduct
        Products
        .findOne({
            order: [
                ['id_product', 'DESC']
            ]                     
        })
        .then(products => {
            return res.status(200)
            .json({
                products,
                imageUrl:URL_IMAGES+products.image
            });
        })
        .catch(error => {
            res
            .status(500)
            .json({
                status: STATUS_NOT_FOUND,
                error,
            })
        })
    },
    prodspercategory: (req, res) => {
        //   localhost:3030/api/v1/products/prodspercategory -- Devuelve un array con cada elem (id,count)
        db.Category.findAll()
           .then(categories => {
                return res
                      .status(200)
                      .json({ meta: { totalCategories: categories.length },
                              categories,
                              countPerCategory :  function () {
                                        let countCategories = [];
                                        let i=0;
                                        categories.forEach(categ => {
                                            const { count, rows } = Products.findAndCountAll({ where: { 
                                                                                           category_id: categ.id_category}
                                                                                          });
                                            countCategories[i]= {
                                                                  id: categ.id_category,
                                                                  count : count
                                                                };
                                            i++
                          
                                        }); // fin forEach
                                        return countCategories
                                         }  
                        }) // fin res.json

           }) // fin then
           .catch(error => {
                res
                .status(500)
                .json({
                    status: STATUS_NOT_FOUND,
                    error,
                    })
                })

    }

}