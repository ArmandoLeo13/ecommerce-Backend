import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserDao } from '../daos/index.js';
import { logger } from '../config/winstonConfig.js';
import { mail } from '../config/nodemailConfig.js';

const authController = {};

authController.register = async (req, res) => {
  try {
    const { email, password, name, direccion, edad, telefono } = req.body;
    const userValidation = await UserDao.getByField('email',email);
    if(userValidation){
      res.status(409).json({ mensaje: 'Usuario ya esta registrado'});
    }else{
      let avatar;
      if(req.file && req.file.filename){
        console.log('llegue');
        avatar = req.file.filename;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserDao.save({ email, password: hashedPassword, name, direccion, edad, avatar, telefono });
      await mail('Nuevo registro',user);
      res.status(201).json({mensaje: 'Se creo usuario correctamente'});
    }
  } catch (error) {
    logger.error(`Error en register: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await UserDao.getByField('email',email);
    if (!user) {
      return res.status(401).json({ message: 'Email o contraseña incorrectas' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Email o contraseña incorrectas' });
    }
    const token = jwt.sign({ email: user.email, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.SECRET);
    const name = user.name;
    res.status(200).json({ name, token, email});
  } catch (error) {
    logger.error(`Error en login: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default authController;
