const { randomUUID } = require('crypto');
const { Router, response } = require('express');
const fs = require('fs');
let pro;

let admin=true;

const productosRouter = Router();

class Productos {

    constructor (id,timestamp,name,description,code,picture,price,stock){
        this.id=id;
        this.timestamp=timestamp;
        this.name=name;
        this.description=description;
        this.code=code;
        this.picture=picture;
        this.price=price;
        this.stock=stock;
    }

    
    
}

const getAll = async()=>{
    let contenido 
    let nuevaData 
    try{
        contenido = await fs.promises.readFile('./src/db/productos.txt','utf-8');
        nuevaData = JSON.parse(contenido);
        
    }
    catch (err){
        console.log("linea 14"+err);
    }
    return nuevaData
}

const getById = async(ide)=>{
    try{
        let nuevaData = await getAll();
        let dataCorregida = nuevaData.find(({ id })=> id === ide)
        
        return dataCorregida
    }
    catch(err){console.log(err)}
}

const save = async(object)=>{
    try{
        let data = await getAll();          
        
        data.push(object);

        let dataFinal = JSON.stringify(data);

        fs.promises.writeFile('./src/db/productos.txt',dataFinal);

        return data
    }
    catch (err){
        console.log(err);
    }
}
const update = async(object)=>{
    try{
        let data = await getAll();          
        const productoToUpdateIndex = data.findIndex((item) => item.id === (object.id));
        data.splice(productoToUpdateIndex, 1, object);

        let dataFinal = JSON.stringify(data);

        fs.promises.writeFile('./src/db/productos.txt',dataFinal);
        return data
    }
    catch (err){
        console.log(err);
    }
}
const deleteById = async(id)=>{
    try{
        let nuevaData = await getAll();
        let dataFiltrada = nuevaData.filter((element)=>{
            if((element.id)!==id) {
                return true
            }
        });
        let data2 = dataFiltrada;
        let dataFinal = JSON.stringify(dataFiltrada);
        fs.promises.writeFile('./src/db/productos.txt',dataFinal);

        return data2
    }
    catch(err){console.log(err)}
}

productosRouter.get('/', (request, res) => {
    (async () => {
        pro = await getAll();
        res.json(pro);
      })();
});

productosRouter.get('/:id', (request, response) => {
    (async () => {
        pro = await getById(request.params.id);
        response.json(pro)
      })();
    
});

productosRouter.post('/', (request, response) => {
    if(admin==true){

        (async () => {
            const newProduct = new Productos(id=randomUUID(),timestamp=Date.now(),request.body.name,request.body.description,request.body.code,request.body.picture,request.body.price,request.body.stock)

            pro = await save(newProduct);
            
            response.json(pro)
          })();
    }else{
        response.json({ error:-1, descripcion: `ruta ${request.baseUrl} método ${request.method} no autorizada`})
    }
    
});

productosRouter.put('/:id', (request, response) => {
    if(admin===true){
        (async () => {
            pro = await update(request.body);
            
            response.json(pro)
          })();
    }else{
        response.json({ error:-1, descripcion: `ruta ${request.baseUrl} método ${request.method} no autorizada`})
    }
    
  });

productosRouter.delete('/:id', (request, response) => {
    if(admin===true){
        
        (async () => {
            pro = await deleteById(request.params.id);
            response.json(pro);
          })();
        
    }else{
        response.json({ error:-1, descripcion: `ruta ${request.baseUrl} método ${request.method} no autorizada`})
    }
  
});


module.exports = productosRouter;

