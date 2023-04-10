import DAOFactory from "./DAOFactory.js";

let ProductosDao = DAOFactory.getProductosDao();
let CarritoDao = DAOFactory.getCarritoDao();
let UserDao = DAOFactory.getUserDao();
let OrderDao = DAOFactory.getOrderDao();

export {ProductosDao, CarritoDao, UserDao, OrderDao};