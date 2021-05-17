const db = require("../../../database/models");

module.exports = (req, res, next) => {

    // buscamo si existe el usuario		
    db.User.findByPk(req.params.id)
    .then( user => {
        if (user) { next(); } 
        else { res.status(404).render('others/404'); }
    })
    .catch(error => {console.log(error)});
    
};