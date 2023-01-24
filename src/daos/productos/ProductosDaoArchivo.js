const { randomUUID } = require('crypto');
const { Router, response } = require('express');
const ContenedorArchivo = require('../../contenedores/ContenedorArchivo');
const contenedor = new ContenedorArchivo('producto');

let admin=true;

const ProductosDaoArchivo = Router();

ProductosDaoArchivo.get('/', async (request, res) => {
    contenedor.pro = await contenedor.getAll();
    res.json(contenedor.pro);
});

ProductosDaoArchivo.get('/:id', async (request, response) => {
    contenedor.pro = await contenedor.getById(request.params.id);
    response.json(contenedor.pro)
    
});

ProductosDaoArchivo.post('/', async (request, response) => {
    if(admin==true){

        const newProduct = contenedor.producto(id=randomUUID(),timestamp=Date.now(),request.body.name,request.body.description,request.body.code,request.body.picture,request.body.price,request.body.stock)

        contenedor.pro = await contenedor.save(newProduct);
        
        response.json(contenedor.pro)
         
    }else{
        response.json({ error:-1, descripcion: `ruta ${request.baseUrl} método ${request.method} no autorizada`})
    }
    
});

ProductosDaoArchivo.put('/:id', async (request, response) => {
    if(admin===true){
        contenedor.pro = await contenedor.update(request.body);
        
        response.json(contenedor.pro)

    }else{
        response.json({ error:-1, descripcion: `ruta ${request.baseUrl} método ${request.method} no autorizada`})
    }
    
  });

ProductosDaoArchivo.delete('/:id', async (request, response) => {
    if(admin===true){
        
            contenedor.pro = await deleteById(request.params.id);
            response.json(contenedor.pro);
        
    }else{
        response.json({ error:-1, descripcion: `ruta ${request.baseUrl} método ${request.method} no autorizada`})
    }
  
});


module.exports = ProductosDaoArchivo;