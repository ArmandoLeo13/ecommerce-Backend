const { Router, response } = require('express');
const ContenedorDB = require('../../contenedores/ContenedorDB');
const contenedor = new ContenedorDB('producto');

contenedor.conectDB();
let admin=true;

const ProductosDaoDB = Router();

ProductosDaoDB.get('/', async (request, res) => {
    contenedor.pro = await contenedor.getAll();
    res.json(contenedor.pro);
});

ProductosDaoDB.get('/:id', async (request, response) => {
    contenedor.pro = await contenedor.getById(request.params.id);
    response.json(contenedor.pro)
    
});

ProductosDaoDB.post('/', async (request, response) => {
    if(admin==true){

        const newProduct = contenedor.producto(timestamp=Date.now(),request.body.name,request.body.description,request.body.code,request.body.picture,request.body.price,request.body.stock)

        contenedor.pro = await contenedor.save(newProduct);
        
        response.json(contenedor.pro)
         
    }else{
        response.json({ error:-1, descripcion: `ruta ${request.baseUrl} método ${request.method} no autorizada`})
    }
    
});

ProductosDaoDB.put('/:id', async (request, response) => {
    if(admin===true){
        contenedor.pro = await contenedor.update(request.params.id,request.body);
        
        response.json(contenedor.pro)

    }else{
        response.json({ error:-1, descripcion: `ruta ${request.baseUrl} método ${request.method} no autorizada`})
    }
    
  });

  ProductosDaoDB.delete('/:id', async (request, response) => {
    if(admin===true){
        
            contenedor.pro = await contenedor.deleteById(request.params.id);
            response.json(contenedor.pro);
        
    }else{
        response.json({ error:-1, descripcion: `ruta ${request.baseUrl} método ${request.method} no autorizada`})
    }
  
});


module.exports = ProductosDaoDB;