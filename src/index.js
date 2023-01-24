const { response } = require('express');
const express = require('express');
const ProductosDaoMemoria = require('./daos/productos/ProductosDaoMemoria');
const CarritoDaoMemoria = require('./daos/carritos/CarritosDaoMemoria');
const ProductosDaoArchivo = require('./daos/productos/ProductosDaoArchivo');
const CarritoDaoArchivo = require('./daos/carritos/CarritosDaoArchivo');
const ProductosDaoDB = require('./daos/productos/ProductosDaoDB');
const CarritoDaoDB = require('./daos/carritos/CarritosDaoDB');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/productos', ProductosDaoDB);
app.use('/api/carrito', CarritoDaoDB);


app.use('*',(req, res)=>{
    res.json({ error:-2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
});
app.listen(port, ()=>{
    
});
