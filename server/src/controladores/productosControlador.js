import productoDto from "../dto/productoDto.js";
import * as ProductoServicios from "../services/productosServices.js";

export const getAllProductos = async (req, res) => {
    const data = await ProductoServicios.getAllProductos();
    if(data.length>0){
        res.status(200).json(data.map((pro)=> productoDto(pro)));
    }else{
        res.status(404).json({mensaje: "No hay productos registrados"});
    }
}

export const getProdutoById = async (req, res) => {
    const {id} = req.params;
    const data = await ProductoServicios.getProdutoById(id);
    if(data.length>0){
        res.status(200).json(data);
    }else{
        res.status(404).json({mensaje: "Producto no existe"});
    }
}

export const postProducto = async (req, res) => {
    const data = await ProductoServicios.createProducto(req.body);

    if(data){
        res.status(201).json(productoDto(data));
    }else{
        res.status(500).json({mensaje: "No se pudo crear producto"});
    }
}

export const deleteProductoById = async (req, res) => {
    const {id} = req.params;
    const data = await ProductoServicios.deleteProductoById(id);
    if(data){
        res.status(204).json({mensaje: "Se elimino producto"});
    }else{
        res.status(500).json({mensaje: "No se pudo eliminar producto"});
    }
}

export const updateProductoById = async (req, res) => {
    const {id} = req.params;
    const newData = req.body;
    
    const data = await ProductoServicios.updateProductoById(id, newData);
    
    if(data){
        res.status(200).json(productoDto(data));
    }else{
        res.status(500).json({mensaje: "No se pudo actualizar producto"});
    }
}