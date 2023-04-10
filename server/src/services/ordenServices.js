import { OrderDao as Ordenes} from "../daos/index.js";
import * as productServices from './productosServices.js'
import * as carritoServices from './carritoServices.js'

export const getAllOrdenes = async () => {
    const data = await Ordenes.getAll();

    return data
}

export const getAllOrdenesUser = async (userEmail) => {
    const data = await Ordenes.getByFieldMany('userEmail', userEmail);

    return data
}

export const createOrden = async (id_carrito) => {
    let resPreview = true;
    const data = await carritoServices.getCarritoById(id_carrito);
    if(!data){
        const res = false;
        return res;
    }
    const {userEmail,timestamp 
        = Date.now(), productos, costoT} = data;
    const status = 'Generada';
    productos.forEach(async (producto) => {
         let pro = await productServices.getProdutoById(producto._id);
         if(pro.stock>0 && pro.stock>=producto.cantidad){
            pro.stock = pro.stock - producto.cantidad;
            await productServices.updateProductoById(producto._id,pro);
         }else if(pro.stock<=0 || pro.stock<producto.cantidad){

            resPreview = false;
         }
    });
    await carritoServices.deleteCarritoById(id_carrito);
    
    if(resPreview){
        const res = await Ordenes.save({ userEmail, timestamp, productos, status, costoT});

        return res
    }else{
        return resPreview;
    }
}