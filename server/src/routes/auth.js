import authController from '../controladores/authControlador.js';
import multerConfig from '../config/multerConfig.js';
import multer from 'multer';
import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const views = path.join(__dirname, '../../../client/views/signup.html')

const upload = multer({ storage: multerConfig})
const authRouter = Router();
const up = upload.single("avatar");

authRouter.get('/register', (req, res)=>{
  res.sendFile(views)
})
  .post('/register', up,authController.register)
  .post('/login', authController.login);

export default authRouter;


