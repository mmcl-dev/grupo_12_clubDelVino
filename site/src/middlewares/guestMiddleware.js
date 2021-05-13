// Ver si este middleware es necesario, tal vez sólo lo manejamos desde los menús permitidos en cada vista
// Se usaria si el usuario quiere loguearse o registrarse ya estando logueado

module.exports = (req, res, next) => {
    if (req.session.user !== undefined) {
        //el usuario ya está logueado y esta página es sólo para guests
        // Hacer un redirect a otra página
        
        res.send('Esta página es sólo para invitados');
    } else {
        next();
    }
    
};
