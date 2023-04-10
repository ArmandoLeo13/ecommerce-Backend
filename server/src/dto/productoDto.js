export default function({_id, timestamp, name, description, code, picture,
    price, stock, categoria}) {

    return {_id: _id, timestamp: timestamp, name:name, description:description, code:code, picture:picture,
        price:price, stock:stock, categoria: categoria}
    
    }