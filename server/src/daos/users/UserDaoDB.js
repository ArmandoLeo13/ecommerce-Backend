import ContenedorDB from '../../contenedores/ContenedorDB.js';

class UserDaoDB extends ContenedorDB{
    constructor(){
        super('usuarios',{
            email: {type:String, require:true, lowercase: true, unique:true},
            password:{type:String, require:true},
            name:{type:String},
            direccion:{type:String},
            edad:{type:Number},
            avatar:{type:String},
            telefono:{type:String}
        })
    }
}

export default UserDaoDB;