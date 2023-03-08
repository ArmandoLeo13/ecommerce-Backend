import { Router, response } from 'express';
import ContenedorDB from '../../contenedores/ContenedorDB.js';
const contenedor = new ContenedorDB('carrito');

contenedor.conectDB();
const CarritoDaoDB = Router();

CarritoDaoDB.post('/', async (request, response) => {
    const newCarrito = contenedor.carrito(timestamp=Date.now(),productos=[]);
    newCarrito.productos.push(request.body.Productos);
    contenedor.car = await contenedor.save(newCarrito);
    response.json(contenedor.car)
});

CarritoDaoDB.delete('/:id', async (request, response) => { 
    contenedor.car = await contenedor.deleteById(request.params.id);
    response.json(contenedor.car)
    
});

CarritoDaoDB.get('/:id/productos', async (request, response) => {
    contenedor.car = await contenedor.getById(request.params.id);
    response.json(contenedor.car.productos)
});

CarritoDaoDB.post('/:id/productos', async (request, response) => {
    contenedor.car = await contenedor.aggProd(request.params.id,request.body)

    response.json(contenedor.car)
});
CarritoDaoDB.delete('/:id/productos/:id_prod', async (request, response) => {
    contenedor.car = await contenedor.deleteProdId(request.params.id,request.params.id_prod);
    
    response.json(contenedor.car)
    
});

export {CarritoDaoDB};