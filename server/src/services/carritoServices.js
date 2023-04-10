import { CarritoDao as Carrito } from "../daos/index.js";

export const getCarritoById = async (_id) => {
    const data = await Carrito.getById(_id);
    return data;
}

export const createCarrito = async (data) => {
    const {userEmail,timestamp 
        = Date.now(), productos =[], costoT=0} = data;
    const res = await Carrito.save({userEmail, timestamp, productos, costoT});
    return res;

}
export const deleteCarritoById = async (_id) => {
    const res = await Carrito.deleteById(_id)

    return res;
}

export const getProdutosInCarrito = async (_id) => {
    const res = await Carrito.getProdutosInCarrito(id);

    return res;
}

export const aggProductoInCarrito = async (_id, newProducto) => {
    const res = await Carrito.aggProductoInCarrito(_id, newProducto);

    return res;
}

export const deleteProdutoInCarrito = async (_id, id_prod) => {
    
    const res = await Carrito.deleteProdutoInCarrito(_id, id_prod);

    return res;
}