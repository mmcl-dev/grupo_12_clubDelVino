const path = require ('path');

module.exports = {
    productsCart : function(req, res) {
        res.render('productsCart');
    },
    productDescription : function(req, res) {
        res.render('productDescription');
    }
}