import * as dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  db: {
    server: process.env.db,
    port: process.env.db_port,
  },
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.SECRET,
  production: {},
  develop: {},
};