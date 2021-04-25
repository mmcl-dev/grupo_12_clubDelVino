const db = require('../../../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Products = db.Product;

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
    'detail': (req, res) => {
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
    search: (req, res) => {
        // htpp://localhost:3001/api/v1/products/search?keywork=Malbec
        
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

    }

}