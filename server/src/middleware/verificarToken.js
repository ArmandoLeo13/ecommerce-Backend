import jwt from 'jsonwebtoken';
import { logger } from '../config/winstonConfig.js';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No proporciono token' });
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET);
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ message: 'El token ha expirado' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(`Error en verifyToken(): ${error}`);
    return res.status(401).json({ message: 'Sin autorizacion' });
  }
};

export default verifyToken;