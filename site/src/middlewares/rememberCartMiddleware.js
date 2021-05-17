module.exports = (req, res, next) => {

    console.log('Middleware :', req.session.cart);
    if (req.session.cart !== undefined) {
        //el usuario ya está logueado y tiene un carrito en la DB
        locals.session.cart = req.session.cart;
    }
    next();
};
