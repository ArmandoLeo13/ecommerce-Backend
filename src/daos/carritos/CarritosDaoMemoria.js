const { Router, response } = require('express');
const { randomUUID } = require('crypto');
const ContenedorMemoria = require('../../contenedores/ContenedorMemoria')
const contenedor = new ContenedorMemoria('carrito');

const CarritoDaoMemoria = Router();

CarritoDaoMemoria.post('/', async (request, response) => {
    const newCarrito = contenedor.carrito(id=randomUUID(),timestamp=Date.now(),productos=[]);
    newCarrito.productos.push(request.body.Productos);
    contenedor.car = await contenedor.save(newCarrito);
    response.json(newCarrito.id)
});

CarritoDaoMemoria.delete('/:id', async (request, response) => { 
    contenedor.car = await contenedor.deleteById(request.params.id);
    response.json(contenedor.car)
    
});

CarritoDaoMemoria.get('/:id/productos', async (request, response) => {
    contenedor.car = await contenedor.getById(request.params.id);

    response.json(contenedor.car.productos)
});

CarritoDaoMemoria.post('/:id/productos', async (request, response) => {
    contenedor.car = await contenedor.aggProd(request.params.id,request.body)

    response.json(contenedor.car)
});
CarritoDaoMemoria.delete('/:id/productos/:id_prod', async (request, response) => {
    contenedor.car = await contenedor.deleteProdId(request.params.id,request.params.id_prod);
    
    response.json(contenedor.car)
    
});

module.exports = CarritoDaoMemoria;
