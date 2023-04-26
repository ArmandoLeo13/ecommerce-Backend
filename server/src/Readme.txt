API README
Este es un servidor web en Node.js construido con Express que implementa una API RESTful. Esta API proporciona servicios para gestionar los productos de una tienda, el carrito de compras de los usuarios, el registro y autenticación de usuarios, el procesamiento de órdenes de compra y la gestión de mensajes en tiempo real mediante un chat.

Requerimientos
Para poder usar esta API se necesita tener instalado Node.js y un manejador de paquetes como npm o yarn.

Instalación
Descargar o clonar este repositorio
Desde la línea de comandos, navegar al directorio donde se encuentra el proyecto
Ejecutar npm install o yarn install para instalar las dependencias del proyecto
Ejecutar npm start o yarn start para iniciar el servidor
Uso
Autenticación
POST /auth/signup: registra un nuevo usuario

Form-data

email:String
password:String
name:String
direccion:String
edad:Number
avatar:File
telefono:String

Respuestas

201 Si crea el usuario, sube el archivo a la carpeta uploads
409 Si ya usuario esta registrado
500 Si ocurrio un error

POST /auth/login: inicia sesión en el sistema :: Devuelve un JWT que expira en 1 hora

Raw json

{
    "email":String,
    "password":String
}

Respuestas

200 Si la validacion fue exitosa
401 Si las credenciales no coinciden
500 Si ocurrio un error

A partir de aca todos los metodos solicitan el JWT del login como autorizacion, sino arrojan un error 401

Productos
GET /productos: devuelve todos los productos

Respuestas

200 Si encuentra los productos
404 Si no hay productos registrado

GET /productos/:id: devuelve el producto con el ID especificado

Respuestas

200 Si encuentra el producto
404 Si no esta el producto registrado

POST /productos: crea un nuevo producto

Raw json

{
    "name":String,
    "description":String,
    "price": Number,
    "stock": Number,
    "picture":String,
    "categoria":String
}

Respuestas

201 Si se crea el producto
500 Si no se pudo crear el producto

PUT /productos/:id: actualiza el producto con el ID especificado

Raw json

{   
    "_id":String,
    "timestamp": String,
    "name":String,
    "description":String,
    "price": Number,
    "stock": Number,
    "picture":String,
    "categoria":String
}

Respuestas

200 Si se actualiza el producto
500 Si no se pudo actualizar el producto

DELETE /productos/:id: elimina el producto con el ID especificado

Respuestas

204 Si elimino el producto
500 Si no se pudo eliminar el producto

Carrito

GET /carrito/:id: devuelve el carrito de compras del usuario con el ID especificado

Respuestas

200 Si encuentra el carrito
404 Si no esta el carrito registrado

GET /carrito/:id/productos: devuelve los productos del carrito de compras del usuario con el ID especificado

Respuestas

200 Si encuentra el carrito
404 Si no esta el carrito registrado

GET /carrito/:userEmail: devuelve el carrito de compras del usuario con el userEmail especificado

Respuestas

200 Si encuentra el carrito
404 Si no esta el carrito registrado

POST /carrito: crea un carrito para el usuario del userEmail

Raw json

{
    "userEmail":String
}

Respuestas

201 Si se crea el carrito
500 Si no se pudo crear el carrito

POST /carrito/:id/productos/:idProducto: agrega un producto al carrito del usuario con el ID especificado

Raw json

{   
    "_id":String,
    "timestamp": String,
    "name":String,
    "description":String,
    "price": Number,
    "stock": Number,
    "picture":String,
    "categoria":String
}

Respuestas

200 Si se agrega el producto al carrito
500 Si no se pudo agregar el producto al carrito

DELETE /carrito/:id/productos/:idProducto: elimina un producto del carrito del usuario con el ID especificado

Respuestas

200 Si elimina al producto del carrito
500 Si no se pudo eliminar el producto del carrito

DELETE /carrito/:id: elimina el carrito de compras del usuario con el ID especificado

Respuestas

200 Si elimina al carrito
404 Si no se encuentra al carrito

Órdenes

GET /orden/:userEmail: devuelve todas las ordenes de compra del usuario especificado

Respuestas

200 Si encuentra las ordenes
404 Si no encuentra las ordenes

POST /orden: crea una nueva orden de compra del carrito

Raw json

{
    "id_carrito": String
}

Respuestas

201 Si se crea la orden
500 Si no se pudo crear la orden
Chat

/chat/: Ruta para el socket del chat
GET /chat/:email: muestra todos los mensajes de un usuario

Tecnologías utilizadas
Node.js
Express
MongoDB
Passport.js
Socket.io
Cors
Autor
Esta API fue desarrollada por Armando Machado.