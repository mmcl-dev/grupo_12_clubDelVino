/*REQUIRES*/
const express = require ('express');
const path = require ('path');
const app = express();
const session = require('express-session');
const auth = require('./middlewares/auth');


//para poder sobreescribir el metodo original POST y asi poder usar PUT y DELETE
const methodOverride = require('method-override');

/*PATH estaticos PUBLIC*/
const publicPath = path.resolve (__dirname, '../public');
app.use (express.static(publicPath))

//Habilitamos Sessions - cookies vienen habilitadas por default en el navegador 
app.use(session({
    secret: 'Club_del_Vino',
    resave: false, // no vuelve a guardas si no hay cambios
    saveUninitialized: true, // guarda sesioes aunque todavia no haya datos
}));
app.use(auth);


// Para poder leer Formularios
app.use(express.urlencoded({ extended: false }));//poder leer la informacion de los formularios dentro de un objeto con la info del formulario
app.use(methodOverride('_method'));//para tener metodos put y delete

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

/** Rutas para el uso de la API (se hace referencia a que es API y a la version)*/
const apiRouter = require(path.resolve (__dirname, './routes/apiRouter'));
app.use('/api/v1', apiRouter);

/*
Por si no encuentra la ruta deseada. Por ahora todas las rutas distintas de las predefinidas van al home. 
hay que armar middleware para que las rutas que no sean correctas vayan al mensaje 404 y con validaciones evitar que se accedan a datos no permitidos
*/
app.use('/*', mainRouter);

/*
app.get('/*',(req,res)=>{
    res.send('404 no se encontro la pagina buscada');//cualquier pagina que no se encuentre
});
*/

/*NOTAS*/
/*
si hay cosas importante a tener en cuenta, dejarlas escritas aqui.

-Se deja mensaje avisando que esta corriendo la aplicacion escuchando por el puerto que corresponda.
-Cada vez que se corra la aplicacion se mostrara los links para acceder directamente con un clik.

*/