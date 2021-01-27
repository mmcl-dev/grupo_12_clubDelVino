/*REQUIRES*/
const express = require ('express');
const path = require ('path');
const app = express();

const methodOverride = require('method-override');//para poder leer formularios

/*PATH estaticos PUBLIC*/
const publicPath = path.resolve (__dirname, '../public');
app.use (express.static(publicPath))


// Para poder leer Formularios
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

/* Configuración de EJS*/
const viewsPath = path.resolve (__dirname, './views');
app.set('view engine', 'ejs');
app.set('views', viewsPath);

/*variables*/
const testPort = 3030;

/*INICIO ESCUCHA DE LA APLICACION*/
app.listen(process.env.PORT || testPort, ()  => {
    console.log('--------------------------------------------');
    console.log('Ya estoy escuchando... puerto '+ testPort);
});

/*REDIRECCIONAMIENTO A LAS PAGINAS*/

/** Rutas para / y /home **/
const mainRouter = require(path.resolve (__dirname, './routes/mainRouter'));
app.use('/', mainRouter);

/** Rutas para usuarios: register, login **/
const usersRouter = require(path.resolve (__dirname, './routes/usersRouter'));
app.use('/users', usersRouter);

/** Rutas para productos: productCart, productDescription **/
const productsRouter = require(path.resolve (__dirname, './routes/productsRouter'));
app.use('/products', productsRouter);

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