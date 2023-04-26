import { Router } from "express";
const OrderRouter = Router();
import * as OrderControlador from "../controladores/ordenControlador.js"
import verifyToken from "../middleware/verificarToken.js";

OrderRouter.get("/:userMail", verifyToken, OrderControlador.getAllOrdenesUser)
    .post("/", verifyToken, OrderControlador.postOrder)


export default OrderRouter;