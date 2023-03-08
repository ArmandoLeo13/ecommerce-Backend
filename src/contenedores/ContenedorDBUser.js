import mongoose from 'mongoose';
 
const usuariosCollection = 'usuarios';

const usuariosSchemma = new mongoose.Schema({
    email: {type:String, require:true, max:50},
    password:{type:String, require:true, max:50},
    picture:{type:String,require:false},
    name:{type:String,require:true},
    direccion:{type:String,require:true},
    edad:{type:Number,require:true},
    telefono:{type:String,require:true}
});

export default class ContenedorDBUser{

    usuarios = mongoose.model(usuariosCollection,usuariosSchemma);

    async conectDB() {
        try{
            const URL = 'mongodb+srv://user:D9mDmBXEEA92zaNy@mensajes.dgx0pky.mongodb.net/?retryWrites=true&w=majority';
            let rta = await mongoose.connect(URL,{
                useNewUrlParser:true,
                useUnifiedTopology:true
            })
            console.log('DB Conectada');
    
        }catch(e){
            console.log('error'+e);
        }
    }

}