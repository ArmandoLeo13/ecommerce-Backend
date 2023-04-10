import * as CarritoServicios from "../services/carritoServices.js";

export const getCarritoById = async (req, res) => {
    const {id} = req.params;
    const data = await CarritoServicios.getCarritoById(id);
    if(data){
        res.status(200).json(data);
    }else{
        res.status(404).json({mensaje: "No hay carritos registrados"});
    }
}

export const postCarrito = async (req, res) => {
    const data = await CarritoServicios.createCarrito(req.body);

    if(data){
        res.status(201).json(data);
    }else{
        res.status(500).json({mensaje: "No se pudo crear el carrito"});
    }
}

export const deleteCarritoById = async (req, res) => {
    const {id} = req.params;
    const data = await CarritoServicios.deleteCarritoById(id);
    
    if(data.deletedCount>0){
        res.status(200).json({mensaje: "Carrito eliminado"});
    }else{
        res.status(404).json({mensaje: "No hay carritos registrados"});
    };
}

export const getProdutosInCarrito = async (req, res) => {
    const {id} = req.params;
    const data = await CarritoServicios.getCarritoById(id);

    if(data){
        res.status(200).json(data);
    }else{
        res.status(404).json({mensaje: "No hay carritos registrados"});
    }
}

export const aggProductoInCarrito = async (req, res) => {
    const {id} = req.params;
    const newProducto = req.body;
    const data = await CarritoServicios.aggProductoInCarrito(id, newProducto);

    if(data){
        res.status(200).json(data);
    }else{
        res.status(500).json({mensaje: "No se pudo agregar el producto"});
    }
}

export const deleteProdutoInCarrito = async (req, res) => {
    const {id, id_prod} = req.params;
    
    const data = await CarritoServicios.deleteProdutoInCarrito(id, id_prod);

    if(data){
        res.status(200).json(data);
    }else{
        res.status(500).json({mensaje: "No se pudo eliminar el producto"});
    }
}