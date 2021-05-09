const db = require("../../../database/models");

module.exports = (req, res, next) => {

    // buscamo si existe el producto	
    db.Product.findByPk(req.params.id)
    .then( product => {
        if (product) { next(); } else { res.status(404).render('others/404'); }
    })
    .catch(error => {console.log(error)});
    
};