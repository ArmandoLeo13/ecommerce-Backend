import ContenedorDB from '../../contenedores/ContenedorDB.js';

class MensajesDaoDB extends ContenedorDB{
    constructor(){
        super('mensajes',{
            userEmail: { type: String, required: true},
            name: { type: String, required: true},
            timestamp: { type: String, required: true},
            text: { type: String, required: true}
        })
    }
} 

export default MensajesDaoDB;