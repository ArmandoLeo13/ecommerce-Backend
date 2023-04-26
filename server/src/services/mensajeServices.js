import { MensajesDao as Mensajes } from "../daos/index.js";

export const getMensajesByEmail = async (userEmail) => {
    const data = await Mensajes.getByFieldMany('userEmail',userEmail);
    return data;
}
export const getAllMsg = async () => {
    const data = await Mensajes.getAll();
    //getByField('userEmail',userEmail);
    return data;
}

export const postMensajes = async (data) => {
    const { userEmail, name, text, timestamp } = data;

    const res = await Mensajes.save({userEmail, name, timestamp, text });

    return res;
}