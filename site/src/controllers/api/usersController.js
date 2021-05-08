const db = require('../../../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');

const Users = db.User;

const URL_IMAGES_USERS = 'https://elclubdelvino.herokuapp.com/img/users/';
let tempDateUser="";

// Status list 
const STATUS_SUCCESS = 'success'
const STATUS_ERROR = '"error al conectarse a la DB"'
const STATUS_UPD_SUCCESS = 'successfully updated'
const STATUS_NOT_FOUND = "ID not found"
const STATUS_DEL_ERROR = "ID not deleted"
const STATUS_DEL_SUCCESS = 'successfully deleted'

module.exports = {
    
    showALL: (req, res) => {
        Users.findAll()
            .then(users => {
                users.map(result=>{
                    result.image=URL_IMAGES_USERS+result.image;
                    /*
                    if(result.createdAt != null && result.createdAt == "" ){
                        tempDateUser =  String(result.createdAt);//.substring(0,10);
                        result.createdAt = tempDateUser.split(0,10);
                    }
                    console.log(result.createdAt)
                    console.log(tempDateUser)
                    */
                })
                return res
                    .status(200)
                    .json({
                        meta: {
                            totalUsers: users.length
                        },
                        data: users,
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
   create: function (req, res){
        // Agregar validaciones ?? 
        Users.findOne({
                where: {
                     email: req.body.email
                }
        })
        .then( user => {
                if (!user) {
                    // si no existe el usuario, lo creo
                    Users
                    .create(req.body)
                    .then(user => {
                        return res.status(201)
				            .json({
                                data:user,
                                status: STATUS_SUCCESS,
                            })
                    })
                    .catch(error => {
                        return res
                            .status(500)
                            .json({
                                status: STATUS_ERROR,
                                error,
                            })
                    })
                } else {
                    return res.json('Usuario ya existe')
                }
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
    update : (req, res) =>{
        
        Users
        .update(req.body, {
            where: {id_user: req.params.id}
        })
        .then(() => {
            Users.findByPk(req.params.id)
            .then(user => {
                return res.status(200)
                .json({
                    data:user,
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
    detail:  (req, res) => {
        const { id } = req.params
        Users.findByPk(id)
            .then(user => {

                if (!user) {
                    return res.status(404)
                        .json({
                            status: STATUS_NOT_FOUND
                        })
                }

                return res.status(200)
                    .json({
                        data: user,
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
    destroy : (req, res) =>{
        const { id } = req.params
      
        Users.findByPk(id)
        .then(user => {
            if (user) {
                Users
                .destroy({
                    where: {
                        id_user: req.params.id
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
                // No se encontró el usuario
                res.json('Usuario no encontrado')
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
    search :   (req, res) => {
        // htpp://localhost:3030/api/v1/users/search?keyword=Maria
        
        Users
        .findAll({
            where: {
                first_name: { [Op.like]: '%' + req.query.keyword + '%' }
            }
        })
        .then(users => {
            return res.status(200)
              .json(users);
        })

    }
}