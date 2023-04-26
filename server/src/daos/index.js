import DAOFactory from "./DAOFactory.js";

let ProductosDao = DAOFactory.getProductosDao();
let CarritoDao = DAOFactory.getCarritoDao();
let UserDao = DAOFactory.getUserDao();
let OrderDao = DAOFactory.getOrderDao();
let MensajesDao = DAOFactory.getMensajesDao();

export {ProductosDao, CarritoDao, UserDao, OrderDao, MensajesDao};