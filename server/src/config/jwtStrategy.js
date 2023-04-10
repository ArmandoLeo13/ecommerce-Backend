import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDao } from '../daos/index.js';
import { logger } from './winstonConfig.js';

const jwtStrategy = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  };
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const user = await UserDao.getByField('email',payload.email);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        logger.error(`Error en jwtStrategy: ${error}`);
        return done(error, false);
      }
    })
  );
};

export default jwtStrategy;
