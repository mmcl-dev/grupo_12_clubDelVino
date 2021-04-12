const fetch = require('node-fetch');
const API_EXCHANGE_URL = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
module.exports= async (req, res, next) =>{
    const response = await fetch(API_EXCHANGE_URL);
    const exchange = await response.json();

    const oficial = exchange.find(buscar=>buscar.casa.nombre == 'Dolar Oficial');

    res.locals.exchangeAPI = {
        dolarOficial: oficial.casa.venta? oficial.casa.venta: 'N/A'
    }

    //console.log('---------------------'+oficial.casa.venta);
    next();
}