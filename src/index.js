const { response } = require('express');
const express = require('express');
const productosRouter = require('./routers/productos');
const carritoRouter = require('./routers/carrito');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);

app.use('*',(req, res)=>{
    res.json({ error:-2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
});
app.listen(port, ()=>{
    
});
