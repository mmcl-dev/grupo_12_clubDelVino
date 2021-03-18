//const db = require('../../../database/models/index');
const STATUS_SUCCES = 'succes';
const STATUS_ERROR = 'error';
module.exports ={
    
    listProducts: (req, res)=>{
        res.status('200')
            .json({
                data: 'pego correctamente a la api---metodo listProducts',
                status: STATUS_SUCCES
            })
    },
    detailProduct: (req, res) =>{
        const body = req.body;
        res.status('201')
            .json({
                data: 'pego correctamente a la api---metodo detailProduct',
                status: STATUS_SUCCES
            })
    },
    createProduct: (req, res) =>{
        const body = req.body;
        res.status('201')
            .json({
                data: 'pego correctamente a la api---metodo createProduct',
                status: STATUS_SUCCES
            })
    },
    updateProduct: (req, res) =>{
        const body = req.body;
        res.status('201')
            .json({
                data: 'pego correctamente a la api---metodo updateProduct',
                status: STATUS_SUCCES
            })
    },
    destroyProduct: (req, res) =>{
        const body = req.body;
        res.status('201')
            .json({
                data: 'pego correctamente a la api---metodo deleteProduct',
                status: STATUS_SUCCES
            })
    }
}