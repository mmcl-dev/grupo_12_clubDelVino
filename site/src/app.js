/*REQUIRES*/
const chalk = require ('chalk');
const express = require ('express');
const path = require ('path');
const app = express();
const session = require('express-session');
const auth = require('./middlewares/auth');
const cors = require('cors');
const moneyExchangeMiddleware = require('./middlewares/moneyExchangeMiddleware');


//para poder sobreescribir el metodo original POST y asi poder usar PUT y DELETE
const methodOverride = require('method-override');

/*PATH estaticos PUBLIC*/
const publicPath = path.resolve (__dirname, '../public');
app.use (express.static(publicPath))

//para permitir consumir apis nuestras y no tengamos error de cors
app.use(cors());

//para usar el middleware de consulta de api externa cotizacion dolar
app.use(moneyExchangeMiddleware);

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
    console.log('');
    console.log(chalk.blue('------------------------------------------------------'));
    console.log(chalk.blue('Site ONLINE... escuchando por el puerto '+ testPort));
    console.log(chalk.blue('Link directo... http://localhost:'+ testPort));
    console.log(chalk.blue('------------------------------------------------------'));
    console.log('');
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
// const apiRouter = require(path.resolve (__dirname, './routes/apiRouter'));
const productsAPIRoutes = require(path.resolve (__dirname, './routes/api/productsRoutes'));
const usersAPIRoutes = require(path.resolve (__dirname, './routes/api/usersRoutes'));
// app.use('/api/v1', apiRouter);
app.use('/api/v1', productsAPIRoutes);  
app.use('/api/v1', usersAPIRoutes);

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