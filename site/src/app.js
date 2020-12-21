const express = require ('express');
const path = require ('path');
const app = express();


const publicPath = path.resolve (__dirname, '../public');
app.use (express.static(publicPath))

app.listen(3030, ()  => console.log('Ya estoy escuchando...'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));//muestra el home
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));//muestra el home
});

app.get('/productCart', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/productCart.html'));//muestra la pagina de listado de productos, el carrito
});

app.get('*',(req,res)=>{
    res.send('404 no se encontro la pagina buscada');//cualquier pagina que no se encuentre
});