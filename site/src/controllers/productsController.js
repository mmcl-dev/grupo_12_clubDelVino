const path = require ('path');

module.exports = {
    cart : function(req, res) {
        res.sendFile(path.join(__dirname, '../views/productCart.html'));
    },
    description : function(req, res) {
        res.sendFile(path.join(__dirname, '../views/productDescription.html'));
    },
}