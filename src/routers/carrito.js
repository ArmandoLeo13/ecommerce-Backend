const { Router, response } = require('express');
const { randomUUID } = require('crypto');
const fs = require('fs');
let car;

const carritoRouter = Router();

class Carrito {

    constructor (id,timestamp,productos){
        this.id=id;
        this.timestamp=timestamp;
        this.productos=productos;
    }

}

const getAll = async()=>{
    let contenido 
    let nuevaData 
    try{
        contenido = await fs.promises.readFile('./src/db/carrito.txt','utf-8');
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

        fs.promises.writeFile('./src/db/carrito.txt',dataFinal);
    }
    catch (err){
        console.log(err);
    }
}

const aggProd = async(id,object)=>{
    try{
        let data = await getAll();

        data.forEach(element => {
            if(element.id===id){
                element.productos.push(object)
            }
        });

        let data2 = data.filter(element=>element.id===id)
        let dataFinal = JSON.stringify(data);

        fs.promises.writeFile('./src/db/carrito.txt',dataFinal);

        return data2
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
        fs.promises.writeFile('./src/db/carrito.txt',dataFinal);

        return data2
    }
    catch(err){console.log(err)}
}
const deleteProdId = async(id,id_prod)=>{
    try{
        let nuevaData = await getAll();
        nuevaData.forEach(element => {
            if(element.id===id){
                let index = element.productos.findIndex((elem)=>elem.id===id_prod);
                element.productos.splice(index,1);
            }
        });

        let data2 = nuevaData.filter(element=>element.id===id)

        let dataFinal = JSON.stringify(nuevaData);
        fs.promises.writeFile('./src/db/carrito.txt',dataFinal);

        return data2
    }
    catch(err){console.log(err)}
}
carritoRouter.post('/', (request, response) => {
    const newCarrito = new Carrito(id=randomUUID(),timestamp=Date.now(),productos=[]);
    newCarrito.productos.push(request.body.Productos);
    save(newCarrito);
    response.json(newCarrito.id)
});

carritoRouter.delete('/:id', (request, response) => { 
    (async () => {
        car = await deleteById(request.params.id);
        
        response.json(car)
      })();
    
});

carritoRouter.get('/:id/productos', (request, response) => {
    (async () => {
        car = await getById(request.params.id);

        response.json(car.productos)
      })();
});

carritoRouter.post('/:id/productos', (request, response) => {
    (async () => {
        car = await aggProd(request.params.id,request.body)

        response.json(car)
      })();
});
carritoRouter.delete('/:id/productos/:id_prod', (request, response) => {
    (async () => {
        car = await deleteProdId(request.params.id,request.params.id_prod);
        
        response.json(car)
      })();
    
});
module.exports = carritoRouter;