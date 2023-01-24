const { response } = require('express');
const mongoose = require('mongoose');
 
const productosCollection = 'productos';

const productosSchemma = new mongoose.Schema({
    timestamp: {type: Number, require: true, max:50},
    name: {type:String, require:true, max:50},
    description:{type:String, require:true, max:50},
    code:{type:String, require:true},
    picture:{type:String,require:true,max:100},
    price:{type:Number,require:true},
    stock:{type:Number,require:true}
});

const productos = mongoose.model(productosCollection,productosSchemma);

const carritosCollection = 'carritos';

const carritosSchemma = new mongoose.Schema({
    timestamp: {type: Number, require: true, max:50},
    productos: {type: Array, require:false}
});

const carritos = mongoose.model(carritosCollection,carritosSchemma);


class ContenedorDB{

    constructor(tipo){
        this.tipo=tipo
    }

    carrito(timestamp,productos){

        const carrito = {
            timestamp:timestamp,
            productos:productos
        };

        return carrito
    }

    producto(timestamp,name,description,code,picture,price,stock){

        const producto = {
            timestamp:timestamp,
            name:name,
            description:description,
            code:code,
            picture:picture,
            price:price,
            stock:stock
        };

        return producto
    }

    async conectDB() {
        try{
            const URL = 'mongodb+srv://user:D9mDmBXEEA92zaNy@mensajes.dgx0pky.mongodb.net/?retryWrites=true&w=majority';
            let rta = await mongoose.connect(URL,{
                useNewUrlParser:true,
                useUnifiedTopology:true
            })
            console.log('DB Conectada');
    
        }catch(e){
            console.log('error'+e);
        }
    }
    
    async getAll() {
        try{
            if(this.tipo==='producto'){
                let pro = await productos.find({});
                return pro
            }else if(this.tipo==='carrito'){
                let pro = await carritos.find({});
                return pro
            }
        }catch(e){
            console.log("error"+e);
        }
    }

    async getById(ide){
        try{
            if(this.tipo==="producto"){
                let pro = await productos.find({"_id":ide});
                return pro
            }else if(this.tipo==="carrito"){
                let car = await carritos.find({"_id":ide});
                return car[0]
            }
        }
        catch(err){console.log(err)}
    }
    
    async save(object){
        try{
            if(this.tipo==='producto'){
                let pro = await productos.collection.insertOne(object);
                let id = (pro.insertedId).toString();

                return id

            }else if(this.tipo==='carrito'){
                let car = await carritos.collection.insertOne(object);
                let id = (car.insertedId).toString();

                return id
            }
        }catch(e){
            console.log("error"+e);
        }
    }
    async update(id,object){
        try{
            const oj = {
                "$set":object
            };
            let prue = await productos.updateMany({"_id":id},oj);
            let pro = await productos.find({"_id":id});
            
            return pro
        }
        catch (err){
            console.log(err);
        }
    }
    async aggProd(id,object){
        try{

            let data = await carritos.find({"_id":id});
            
            data[0].productos.push(object);

            await carritos.updateMany({"_id":id},data[0]);

            let car = carritos.find({});
    
            return car
        }
        catch (err){
            console.log(err);
        }
    }
    async deleteById(id){
        try{
            
            if(this.tipo==="producto"){
                await productos.deleteOne({"_id":id});
                let pro = await productos.find({});
                return pro
            }
            else if(this.tipo==="carrito"){
                await carritos.deleteOne({"_id":id});
                let car = await carritos.find({});
                return car
            } 
        }
        catch(err){console.log(err)}
    }
    async deleteProdId(id,id_prod){
        try{
            let data = await carritos.find({"_id":id});
            
            let index = data[0].productos.findIndex((elem)=>elem.id===id_prod);
            data[0].productos.splice(index,1);
                
            await carritos.updateMany({"_id":id},data[0])
            
            let car = await carritos.find({"_id":id});
    
            return car
        }
        catch(err){console.log(err)}
    }

}

module.exports = ContenedorDB;