import ContenedorDB from "../../contenedores/ContenedorDB.js";

class ProductosDaoDB extends ContenedorDB{
    constructor(){
        super('productos',{
            timestamp: { type: String, required: true},
            name: { type: String, required: true},
            description: String,
            price: { type: Number, required: true},
            stock: { type: Number, required: true},
            picture: String,
            categoria: { type: String, required: true}
        })
    }
}

export default ProductosDaoDB;