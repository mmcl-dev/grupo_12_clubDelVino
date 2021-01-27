const path = require ('path');

module.exports = {
    productsCart : function(req, res) {
        res.render('products/productsCart');
    },
    productDescription : function(req, res) {
        res.render('products/productDescription');
    }
}