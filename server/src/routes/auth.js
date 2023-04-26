import authController from '../controladores/authControlador.js';
import multerConfig from '../config/multerConfig.js';
import multer from 'multer';
import { Router } from 'express';


const upload = multer({ storage: multerConfig})
const authRouter = Router();
const up = upload.single("avatar");

authRouter.post('/register', up,authController.register)
  .post('/login', authController.login);

export default authRouter;


