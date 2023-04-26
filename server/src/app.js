import express from 'express';
import ProductosRouter from './routes/productosRouter.js';
import CarritoRouter from './routes/carritoRouter.js';
import passport from 'passport';
import session from './config/session.js';
import authRouter from './routes/auth.js';
import OrderRouter from './routes/orderRouter.js';
import MensajeRouter from './routes/mensajesRouter.js';
import { UserDao } from './daos/index.js';
import cors from 'cors'
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import * as MensajeServicio from './services/mensajeServices.js';

const app = express();
const httpServer = http.createServer(app);

const io = new SocketServer(httpServer, {
  cors:{
    origin: 'http://localhost:3000'
  },
  path: '/chat'
});

const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('images'))

app.use(session);

app.use(passport.initialize());
app.use(passport.session());


io.on('connection', async (socket) => {
  console.log('conecto');
  console.log(socket.id);

  let mensajes = await MensajeServicio.getAllMsg();
  io.sockets.emit('mensajes', mensajes);
  
  socket.on('newMensaje', async (newMensaje) => {
      let mensaje= await MensajeServicio.postMensajes(newMensaje);
      
      io.sockets.emit('mensajes', mensaje);
    
  });
});



passport.serializeUser((user, done) => {
    done(null, user._id);
  });
passport.deserializeUser(async (id, done) => {
  const user = await UserDao.getById(id);
  return done(null, user);
});

app.use('chat', MensajeRouter);
app.use('/api/auth', authRouter);
app.use('/api/productos', ProductosRouter);
app.use('/api/carrito', CarritoRouter);
app.use('/api/orden', OrderRouter);

app.use('*',(req, res)=>{
    res.status(405).json({ mensaje:`ruta ${req.baseUrl} método ${req.method} no implementada`})

});

export default httpServer;
