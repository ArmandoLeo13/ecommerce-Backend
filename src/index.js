import express from 'express';
import {ProductosDaoDB} from './daos/productos/ProductosDaoDB.js';
import {CarritoDaoDB} from './daos/carritos/CarritosDaoDB.js';
import { login } from './daos/login/login.js';
import { signup } from './daos/signup/signup.js';

const app = express();
const port = process.argv.port || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/signup',signup);
app.use('/login',login);
app.use('/api/productos', ProductosDaoDB);
app.use('/api/carrito', CarritoDaoDB);


app.use('*',(req, res)=>{
    res.json({ error:-2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
});
app.listen(port, ()=>{
    
});
