/*REQUIRES*/
const express = require ('express');
const path = require ('path');
const app = express();

/*PATH estaticos PUBLIC*/
const publicPath = path.resolve (__dirname, '../public');
app.use (express.static(publicPath))

/*variables*/
const port = 3030;

/*INICIO ESCUCHA DE LA APLICACION*/
app.listen(port, ()  => {
    console.log('--------------------------------------------');
    console.log('Ya estoy escuchando... puerto '+port);
    console.log('HOME:      http://localhost:3030/home');
    console.log('CARRITO:   http://localhost:3030/productCart');
    console.log('LOGIN:     http://localhost:3030/login');
    console.log('REGISTER:  http://localhost:3030/register');
    console.log('REGISTER:  http://localhost:3030/productDescription');
    console.log('--------------------------------------------');
});

/*REDIRECCIONAMIENTO A LAS PAGINAS*/
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));//muestra el home
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));//muestra el home
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/login.html'));//muestra el login de usuario
});

app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/register.html'));//muestra el registro de usuario
});

app.get('/productCart', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/productCart.html'));//muestra la pagina de listado de productos, el carrito
});

// sólo para poder ver la página - después remover
app.get('/productDescription', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/productDescription.html'));//muestra un producto para agregar al carrito
});

app.get('*',(req,res)=>{
    res.send('404 no se encontro la pagina buscada');//cualquier pagina que no se encuentre
});

/*NOTAS*/
/*
si hay cosas importante a tener en cuenta, dejarlas escritas aqui.

-Se deja mensaje avisando que esta corriendo la aplicacion escuchando por el puerto que corresponda.
-Cada vez que se corra la aplicacion se mostrara los links para acceder directamente con un clik.

*/