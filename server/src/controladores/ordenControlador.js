import * as OrdenServices from '../services/ordenServices.js';
import { mail } from '../config/nodemailConfig.js';
import { UserDao } from '../daos/index.js';
import client from '../config/twilioConfig.js';
import ordenDto from '../dto/ordenDto.js';

export const getAllOrdenesUser = async (req, res) => {
    
    const data = await OrdenServices.getAllOrdenesUser(req.body.userMail);

    if(data.length>0){
        res.status(200).json(data.map((orden)=> ordenDto(orden)));
    }else{
        res.status(404).json({mensaje: "No hay ordenes registrados"});
    }
}

export const postOrder = async (req, res) => {
    
    const data = await OrdenServices.createOrden(req.body.id_carrito);

    if(data){
        const {name} = await UserDao.getByField('email',data.userEmail);
        const subject = `Nuevo pedido de ${data.userEmail} ${name}`;
        mail(subject, data.productos);
        client.messages.create({
            body: `Su orden ${data._id} ha sido enviada y procesada`,
            from: process.env.NUMBER_FROM,
            to: process.env.NUMBER_TO
        });
        client.messages.create({
            body: subject,
            from: process.env.NUMBER_FROM_WS,
            to: process.env.NUMBER_TO_WS
        });
        res.status(201).json(data);
    }else{
        res.status(500).json({mensaje: "No se pudo crear la orden"});
    }
}