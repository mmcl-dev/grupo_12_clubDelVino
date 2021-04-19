const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const db = require('../../../database/models');

module.exports = {
    deleteImageUser:(id)=>{
        //busco en la db el usuario y borro el archivo imagen que le corresponda a ese usuario en la carpeta del servidor
        let imageToDelete = db.User.findOne({
            where: {
                id_user: id
            }
        })
        .then(user => {
            if (user) {
                if(imageToDelete.image != 'defaultImageUser.jpg' && imageToDelete.image != '' && imageToDelete != null){
                    try {
                        fs.unlinkSync( path.join(__dirname, '../../public/img/users/' +  imageToDelete.image));//borra la imagen
                            console.log(chalk.green('Imagen USUARIO borrada en: ' + path.join(__dirname, '../../public/img/users/' +  imageToDelete.image)));
                        } catch(err) {
                            console.log(chalk.red('ERROR al intentar borrar imagen usuario: ', err));
                        }
                    }
                return user;
            } else{
                return null;
            }
        })
        .catch(error => console.log(chalk.red('ERROR al intentar buscar el usuario por ID: ', error)));         
    },
    findUserForId: (id) =>{
        db.User.findOne({
            where: {
                id_user: id
            }
        })
        .then(user => {
            if (user) {
                return user;
            } else{
                return null;
            }
        })
        .catch(error => console.log(chalk.red('ERROR al intentar buscar el usuario por ID: ', error)));
    },
    deleteImageProduct: function (id){
        //busco en la db del PRODUCTO y borro el archivo imagen que le corresponda a ese producto en la carpeta del servidor
        let imageToDelete = db.Product.findOne({
            where: {
                id_product: id
            }
        })
        .then(product => {
            if (product) {
                imageToDelete = product;
                try {
                    fs.unlinkSync( path.join(__dirname, '../../public/img/' +  imageToDelete.image));//borra la imagen
                    console.log(chalk.green('Imagen PRODUCTO borrada en: ' + path.join(__dirname, '../../public/img/' +  imageToDelete.image)));
                } catch(err) {
                    console.log(chalk.red('ERROR al intentar borrar imagen del producto: ', err));
                }
            }
        })
        .catch(error => console.log(chalk.red('ERROR al intentar buscar el producto por ID: ', error)));
        return true;
    },
    findProductForId: (id) =>{
        db.Product.findOne({
            where: {
                id_product: id
            }
        })
        .then(product => {
            if (product) {
                return product;
            } else{
                return null;
            }
        })
        .catch(error => console.log(chalk.red('ERROR al intentar buscar el producto por ID: ', error)));
    }
}