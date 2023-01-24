const { Router, response } = require('express');
const { randomUUID } = require('crypto');
const ContenedorArchivo = require('../../contenedores/ContenedorArchivo');
const contenedor = new ContenedorArchivo('carrito');

const CarritoDaoArchivo = Router();

CarritoDaoArchivo.post('/', async (request, response) => {
    const newCarrito = contenedor.carrito(id=randomUUID(),timestamp=Date.now(),productos=[]);
    newCarrito.productos.push(request.body.Productos);
    contenedor.car = await contenedor.save(newCarrito);
    response.json(newCarrito.id)
});

CarritoDaoArchivo.delete('/:id', async (request, response) => { 
    contenedor.car = await contenedor.deleteById(request.params.id);
    response.json(contenedor.car)
    
});

CarritoDaoArchivo.get('/:id/productos', async (request, response) => {
    contenedor.car = await contenedor.getById(request.params.id);s
    response.json(contenedor.car.productos)
});

CarritoDaoArchivo.post('/:id/productos', async (request, response) => {
    contenedor.car = await contenedor.aggProd(request.params.id,request.body)

    response.json(contenedor.car)
});
CarritoDaoArchivo.delete('/:id/productos/:id_prod', async (request, response) => {
    contenedor.car = await contenedor.deleteProdId(request.params.id,request.params.id_prod);
    
    response.json(contenedor.car)
    
});

module.exports = CarritoDaoArchivo;