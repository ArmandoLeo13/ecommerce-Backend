import ContenedorDB from '../../contenedores/ContenedorDB.js';

class OrderDaoDB extends ContenedorDB{
    constructor(){
        super('ordenes',{
            userEmail: { type: String, required: true},
            timestamp: { type: String, required: true},
            productos: { type: Array},
            status: { type: String}
        })
    }
} 

export default OrderDaoDB;
