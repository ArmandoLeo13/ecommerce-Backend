import mongoose from 'mongoose';
 
export const usuariosCollection = 'usuarios';

export const usuariosSchemma = new mongoose.Schema({
    email: {type:String, require:true, lowercase: true, unique:true},
    password:{type:String, require:true},
    name:{type:String},
    direccion:{type:String},
    edad:{type:Number},
    avatar:{type:String},
    telefono:{type:String}
});