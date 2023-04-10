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
      const avatar = req.file.filename;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserDao.save({ email, password: hashedPassword, name, direccion, edad, avatar, telefono });
      await mail('Nuevo registro',user);
      res.status(201).json(user);
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
    const token = jwt.sign({ email: user.email }, process.env.SECRET);
    res.json({ token });
  } catch (error) {
    logger.error(`Error en login: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default authController;
