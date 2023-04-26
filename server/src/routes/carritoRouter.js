import { Router } from "express";
const CarritoRouter = Router();
import * as CarritoControlador from "../controladores/carritoControlador.js"
import verifyToken from "../middleware/verificarToken.js";

CarritoRouter.get("/:id", verifyToken, CarritoControlador.getCarritoById)
    .post("/:userEmail", verifyToken, CarritoControlador.getCarritoByEmail)
    .post("/", verifyToken, CarritoControlador.postCarrito)
    .delete("/:id", verifyToken, CarritoControlador.deleteCarritoById)
    .get("/:id/productos", verifyToken, CarritoControlador.getProdutosInCarrito)
    .post("/:id/productos", verifyToken, CarritoControlador.aggProductoInCarrito)
    .delete("/:id/productos/:id_prod", verifyToken, CarritoControlador.deleteProdutoInCarrito)
    .put("/:id/productos",verifyToken, CarritoControlador.vaciarCarrito);


export default CarritoRouter;