import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ProductosRouter from './routes/productosRouter.js';
import CarritoRouter from './routes/carritoRouter.js';
import passport from 'passport';
import session from './config/session.js';
import authRouter from './routes/auth.js';
import OrderRouter from './routes/orderRouter.js';
import { UserDao } from './daos/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cliente = path.join(__dirname, '../../client')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(cliente));

app.use(session);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await UserDao.getById(id);
    return done(null, user);
  });


app.use('/api/auth', authRouter);
app.use('/api/productos', ProductosRouter);
app.use('/api/carrito', CarritoRouter);
app.use('/api/orden', OrderRouter);

app.use('*',(req, res)=>{
    res.status(405).json({ mensaje:`ruta ${req.baseUrl} método ${req.method} no implementada`})

});

export default app;
