import passport from 'passport';
import passportJWT from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy } from 'passport-jwt';
import { UserDao } from '../daos/index.js';
import { logger } from '../config/winstonConfig.js';

const JWT_SECRET = process.env.SECRET;

// Configuración de passport-local para autenticación con email y contraseña
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await UserDao.getByField('email',email);
        if (!user) {
            return done(null, false, { message: 'Email o contraseña incorrectos.' });
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Email o contraseña incorrectos.' });
        }
        return done(null, user);
    } catch (error) {
        logger.error(`Error en auth passport-local: ${error}`);
        return done(error);
    }
}));

// Configuración de passport-jwt para autenticación con token JWT
const jwtOptions = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
};
passport.use(new JWTStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await UserDao.getById(payload._id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        logger.error(`Error en auth passport-jwt: ${error}`);
        return done(error);
    }
}));

// Middleware para autenticar con passport-local
export const localAuth = passport.authenticate('local', { session: false });

// Middleware para autenticar con token JWT
export const jwtAuth = passport.authenticate('jwt', { session: false });

// Función para generar un token JWT
export const generateJWT = (user) => {
    const payload = {
        sub: user.id,
        iat: Date.now(),
    };
    const options = {
        expiresIn: '1d',
    };
    return passportJWT.sign(payload, JWT_SECRET, options);
};
