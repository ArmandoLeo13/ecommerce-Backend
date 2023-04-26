import { Router } from "express";
const MensajeRouter = Router();
import * as MensajesControlador from '../controladores/mensajesControlador.js';
import verifyToken from "../middleware/verificarToken.js";

MensajeRouter.get('/:email',verifyToken,MensajesControlador.getMensajesByEmail)

export default MensajeRouter;