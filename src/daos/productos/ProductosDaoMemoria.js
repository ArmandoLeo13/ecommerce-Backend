const { randomUUID } = require('crypto');
const { Router, response } = require('express');
const ContenedorMemoria = require('../../contenedores/ContenedorMemoria');
const contenedor = new ContenedorMemoria('producto');

let admin=true;

const ProductosDaoMemoria = Router();

ProductosDaoMemoria.get('/', async (request, res) => {

    contenedor.pro = await contenedor.getAll();
    res.json(contenedor.pro);

});

ProductosDaoMemoria.get('/:id', async (request, response) => {

    let producto= await contenedor.getById(request.params.id);
    response.json(producto)
    
});

ProductosDaoMemoria.post('/', async (request, response) => {
    if(admin==true){

        const newProduct = contenedor.producto(id=randomUUID(),timestamp=Date.now(),request.body.name,request.body.description,request.body.code,request.body.picture,request.body.price,request.body.stock);
        contenedor.pro = await contenedor.save(newProduct);
        
        response.json(contenedor.pro)
    }else{
        response.json({ error:-1, descripcion: `ruta ${request.baseUrl} método ${request.method} no autorizada`})
    }
    
});

ProductosDaoMemoria.put('/:id', async (request, response) => {
    if(admin===true){
        contenedor.pro = await contenedor.update(request.body);
        
        response.json(contenedor.pro)

    }else{
        response.json({ error:-1, descripcion: `ruta ${request.baseUrl} método ${request.method} no autorizada`})
    }
    
  });

  ProductosDaoMemoria.delete('/:id', async (request, response) => {
    if(admin===true){
        
        contenedor.pro = await contenedor.deleteById(request.params.id);
        response.json(contenedor.pro);
        
    }else{
        response.json({ error:-1, descripcion: `ruta ${request.baseUrl} método ${request.method} no autorizada`})
    }
  
});

module.exports = ProductosDaoMemoria;
