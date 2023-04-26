import * as MensajeServicio from '../services/mensajeServices.js';

export const getMensajesByEmail = async (req, res) => {
    const {email} = req.params;
    const mensajes = await MensajeServicio.getMensajesByEmail(email);
    if(data.lenth>0){
        res.status(200).json(mensajes);
    }else{
        res.status(404).json({mensaje: "No hay mensajes de este usuario"});
    }
}