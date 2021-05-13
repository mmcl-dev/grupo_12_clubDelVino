// Si existe la cookie de "Recordarme" la llevamos a session para que todo el resto del sistema
// esté informado que sí está logueado. -- TODAS las páginas deben revosar ésto
const db = require('../../../database/models'); 
module.exports = (req, res, next) => {
//    console.log('Valores recordarme y session', req.cookies.remember,' ', req.session.user );

   if (req.cookies.remember != undefined && req.session.user == undefined){
            db.User.findOne({
                              where: { email: req.cookies.remember }
            })
            .then(user => {
                if (user) {
                    // Usuario encontrado y logueado!!
                    // console.log('Usuario encontrado con la cookie', user)
                    req.session.user = user;
                    console.log('Usuario copiado a req desde cookie', req.session.user)

                } 
            })
            .catch(error => console.log(error));
    } // if req.cookie
   
   next();
   
   
};
