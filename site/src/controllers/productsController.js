const path = require ('path');

module.exports = {
    productsCart : function(req, res) {
        res.sendFile(path.join(__dirname, '../views/productsCart.html'));
    },
    productDescription : function(req, res) {
        res.sendFile(path.join(__dirname, '../views/productDescription.html'));
    }
}