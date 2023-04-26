import { Router } from "express";
const ProductosRouter = new Router();
import * as ProductosControlador from "../controladores/productosControlador.js";
import verifyToken from "../middleware/verificarToken.js";

ProductosRouter.get("/", verifyToken, ProductosControlador.getAllProductos)
    .get("/:id", verifyToken, ProductosControlador.getProdutoById)
    .get("/categoria/:categoria", verifyToken, ProductosControlador.getProductosByCategoria)
    .post("/", verifyToken, ProductosControlador.postProducto)
    .delete("/:id", verifyToken, ProductosControlador.deleteProductoById)
    .put("/:id", verifyToken, ProductosControlador.updateProductoById)

export default ProductosRouter;