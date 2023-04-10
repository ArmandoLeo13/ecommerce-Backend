import ProductosDaoDB from "./productos/ProductosDaoDB.js";
import CarritoDaoDB from "./carritos/CarritosDaoDB.js";
import UserDaoDB from "./users/UserDaoDB.js";
import OrderDaoDB from "./ordenes/OrderDaoDB.js";

export default class DAOFactory {
  static productosDao = null;
  static carritoDao = null;
  static userDao = null;
  static orderDao = null;

  static getProductosDao() {
    if (!DAOFactory.productosDao) {
      DAOFactory.productosDao = new ProductosDaoDB();
    }
    return DAOFactory.productosDao;
  }

  static getCarritoDao() {
    if (!DAOFactory.carritoDao) {
      DAOFactory.carritoDao = new CarritoDaoDB();
    }
    return DAOFactory.carritoDao;
  }

  static getUserDao() {
    if (!DAOFactory.userDao) {
      DAOFactory.userDao = new UserDaoDB();
    }
    return DAOFactory.userDao;
  }

  static getOrderDao() {
    if (!DAOFactory.orderDao) {
      DAOFactory.orderDao = new OrderDaoDB();
    }
    return DAOFactory.orderDao;
  }
}

