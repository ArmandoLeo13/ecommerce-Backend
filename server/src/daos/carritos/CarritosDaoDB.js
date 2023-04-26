import ContenedorDB from '../../contenedores/ContenedorDB.js';
import { logger } from '../../config/winstonConfig.js';
import * as productServices from '../../services/productosServices.js'

class CarritoDaoDB extends ContenedorDB{
    constructor(){
        super('carritos',{
            userEmail: { type: String, required: true},
            timestamp: { type: String, required: true},
            productos: { type: Array},
            costoT: { type: Number}
        })
    }
    async getProdutosInCarrito (id) {
        try{
            const carrito = await this.getById(id);
        
            return carrito.productos;
        }catch(error){
            logger.error(`Error en getProdutosInCarrito(): ${error}`);
        }
        
    }
    async aggProductoInCarrito (id_carrito, newProduto) {
        try{
            let resPreview = true;
            const carrito = await this.getById(id_carrito);
            
            const { price, stock} = await productServices.getProdutoById(newProduto._id);

            if(stock>0 && stock>=newProduto.cantidad){

                if(carrito.productos.length===0){
                    const producto = {
                        '_id':newProduto._id,
                        'name':newProduto.name,
                        'description':newProduto.description,
                        'priceU': price,
                        'cantidad': newProduto.cantidad,
                        'priceT': price * newProduto.cantidad
                    }
                    carrito.productos.push(producto);
                    carrito.costoT = producto.priceT;
                }else if(carrito.productos.length>0){
                    const productoExits = carrito.productos.some((pro) => pro._id==newProduto._id);
                    if(productoExits){
                        carrito.productos.forEach(pro => {
                            if(pro._id==newProduto._id){
                                let diff = pro.priceT;
                                
                                pro.cantidad=pro.cantidad+newProduto.cantidad;
                                pro.priceT=pro.cantidad*price;
                                diff = pro.priceT - diff;
                                
                                carrito.costoT = carrito.costoT + diff;
                                if(pro.cantidad>stock){
                                    resPreview=false;
                                }
                            }
                        });
                    }else{
                        const producto = {
                            '_id':newProduto._id,
                            'name':newProduto.name,
                            'description':newProduto.description,
                            'priceU': price,
                            'cantidad': newProduto.cantidad,
                            'priceT': price * newProduto.cantidad
                        };
                        carrito.costoT = carrito.costoT +producto.priceT;
                        carrito.productos.push(producto);
                    }
                }
                if(resPreview){
                    const data = await this.updateById(id_carrito,carrito);

                    return data;
                }else{
                    return resPreview;
                }
                

            }else{
                const data = false;

                return data;
            }

        }catch(error){
            logger.error(`Error en aggProductoInCarrito(): ${error}`);
        }
        
    }
    async deleteProdutoInCarrito(id_carrito, id_prod){
        try{
            
            const carrito = await this.getById(id_carrito);
            const index = carrito.productos.findIndex(producto=>producto._id===id_prod);
            
            const producto = carrito.productos[index];
            
            carrito.costoT= carrito.costoT - producto.priceT;
            carrito.productos.splice(index,1);

            const data = await this.updateById(id_carrito,carrito);

            return data;
        }catch(error){
            logger.error(`Error en deleteProdutoInCarrito(): ${error}`);
        }
    }
    async vaciarCarrito(id_carrito){
        try{
            
            const carrito = await this.getById(id_carrito);
            carrito.productos = [];
            carrito.costoT=0;
            const data = await this.updateById(id_carrito,carrito);

            return data;
        }catch(error){
            logger.error(`Error en deleteProdutoInCarrito(): ${error}`);
        }
    }
}

export default CarritoDaoDB;
