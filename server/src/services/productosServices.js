import { ProductosDao as Produtos } from "../daos/index.js";

export const getAllProductos = async () => {
    const data = await Produtos.getAll();
    return data;
}

export const getProdutoById = async (id) => {
    const data = await Produtos.getById(id);
    return data;
}

export const createProducto = async (data) => {
    const {timestamp = Date.now(), name, description,
        price, stock, picture, categoria} = data;
    const res = await Produtos.save({timestamp, name, description,
        price, stock, picture, categoria })
    return res;

}

export const deleteProductoById = async (id) => {
    const res = await Produtos.deleteById(id)

    return res;
}

export const updateProductoById = async (id, newData) => {
    const res = await Produtos.updateById(id, newData)

    return res;
}