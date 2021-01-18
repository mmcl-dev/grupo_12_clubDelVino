/*REQUIRES*/
const express = require ('express');
const path = require ('path');
const app = express();

/*PATH estaticos PUBLIC*/
const publicPath = path.resolve (__dirname, '../public');
app.use (express.static(publicPath))

/* Configuración de EJS*/
app.set('view engine', 'ejs');

/*variables*/
const port = 3030;

/*INICIO ESCUCHA DE LA APLICACION*/
app.listen(port, ()  => {
    console.log('--------------------------------------------');
    console.log('Ya estoy escuchando... puerto '+port);
    console.log('HOME:      http://localhost:3030/home');
    console.log('CARRITO:   http://localhost:3030/products/productsCart');
    console.log('LOGIN:     http://localhost:3030/users/login');
    console.log('REGISTER:  http://localhost:3030/users/register');
    console.log('DESCRIP.:  http://localhost:3030/products/productDescription');
    console.log('--------------------------------------------');
});

/*REDIRECCIONAMIENTO A LAS PAGINAS*/

/** Rutas para / y /home **/
const mainRouter = require('./routes/mainRouter');
app.use('/', mainRouter);

/** Rutas para usuarios: register, login **/
const usersRouter = require('./routes/usersRouter');
app.use('/users', usersRouter);

/** Rutas para productos: productCart, productDescription **/
const productsRouter = require('./routes/productsRouter');
app.use('/products', productsRouter);

/** A futuro hay que hacer las rutas para el admin de la pagina ABM y su correspondiente pagina*/
/** A futuro hay que hacer las rutas para mostrar los datos del usuario y su correspondiente pagina*/

/**Por si no encuentra la ruta deseada */
app.get('/*',(req,res)=>{
    res.send('404 no se encontro la pagina buscada');//cualquier pagina que no se encuentre
});

/*NOTAS*/
/*
si hay cosas importante a tener en cuenta, dejarlas escritas aqui.

-Se deja mensaje avisando que esta corriendo la aplicacion escuchando por el puerto que corresponda.
-Cada vez que se corra la aplicacion se mostrara los links para acceder directamente con un clik.

*/