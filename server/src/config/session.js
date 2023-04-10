import MongoStore from "connect-mongo";
import session from "express-session";
import projectConfig from "./index.js";

// setteo sesiones
const sessionStore = MongoStore.create({
  mongoUrl: projectConfig.mongoUrl,
  /* ttl: 60,*/
});

export default session({
  store: sessionStore,
  secret: process.env.SECRET,

  resave: true,
  rolling: false,
  saveUninitialized: false,
  unset: "destroy",
  // cookie:  {
  //    sameSite: "none",
  //    maxAge: 8600000
  // },
});