let pro = [];
let car = [];

class ContenedorMemoria {

    constructor(tipo){
        this.tipo = tipo;
    }

    carrito(id,timestamp,productos){

        const carrito = {
            id:id,
            timestamp:timestamp,
            productos:productos
        };

        return carrito
    }

    producto(id,timestamp,name,description,code,picture,price,stock){

        const producto = {
            id:id,
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
    
    async getAll(){
        try{
            if(this.tipo==="producto"){
                return pro
            }
            else if(this.tipo==="carrito"){
                return car
            }   
        }
        catch (err){
            console.log("linea 14"+err);
        }
    }
    
    async getById(ide){
        try{
            let nuevaData = await this.getAll();
            let dataCorregida = nuevaData.find(({ id })=> id === ide)
            
            return dataCorregida
        }
        catch(err){console.log(err)}
    }
    
    async save(object){
        try{
            let data = await this.getAll();          
            
            data.push(object);
            
            if(this.tipo==="producto"){
                pro = data;
                return pro
            }
            else if(this.tipo==="carrito"){
                car= data;
                return car
            }
            
    
        }
        catch (err){
            console.log(err);
        }
    }
    async update(object){
        try{
            let data = await this.getAll();          
            const productoToUpdateIndex = data.findIndex((item) => item.id === (object.id));
            data.splice(productoToUpdateIndex, 1, object);
    
            pro = data;
    
            return pro
        }
        catch (err){
            console.log(err);
        }
    }
    async aggProd(id,object){
        try{
            let data = await this.getAll();
    
            data.forEach(element => {
                if(element.id===id){
                    element.productos.push(object)
                }
            });
            
            car = data
    
            return car
        }
        catch (err){
            console.log(err);
        }
    }
    async deleteById(id){
        try{
            let nuevaData = await this.getAll();
            let dataFiltrada = nuevaData.filter((element)=>{
                if((element.id)!==id) {
                    return true
                }
            });
            if(this.tipo==="producto"){
                pro = dataFiltrada
                return pro
            }
            else if(this.tipo==="carrito"){
                car = dataFiltrada;
                return car
            } 
        }
        catch(err){console.log(err)}
    }
    async deleteProdId(id,id_prod){
        try{
            let nuevaData = await this.getAll();
            nuevaData.forEach(element => {
                if(element.id===id){
                    let index = element.productos.findIndex((elem)=>elem.id===id_prod);
                    element.productos.splice(index,1);
                }
            });
    
            car = nuevaData;
    
            return car
        }
        catch(err){console.log(err)}
    }
}

module.exports = ContenedorMemoria;