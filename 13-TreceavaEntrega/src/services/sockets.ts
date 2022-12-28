const io = require('socket.io')
import productsController from "../Controllers/productsController"
import mjController from "../Controllers/mensajesController"


const initWsServer =  (server) =>  {
    const SocketServer = io(server)

    SocketServer.on('connection', (socket) => {
        socket.emit('bienvenidaAUsuario', 'Bienvenido Nuevo Usuario')
        socket.emit('bienvenidaAUsuario', {
            Bienvenida: 'hola'
        })
        socket.on("enviarNuevoProducto",async (data)  => {
            const prodController = new productsController()
            const nuevoProducto= await prodController.newProduct(data)
            SocketServer.emit("productosArray", nuevoProducto)
            
        })
        socket.on('enviarNuevoUser', data=>{
            const nuevoUser = {
                id: socket.client.id,
                ...data
            }
            socket.emit("UsuarioConfirmadoYGuardado", nuevoUser)
        })
        socket.on('enviarMensaje', async(data)=>{
            
                const dataSi = await mjController.nuevomensaje(data)
            SocketServer.emit('imprimirMensaje', dataSi)
            
            
            
        })
        socket.on("enviarUserLoginName",  (data)=>{
            socket.emit("userSaved", data)
        })
    })
    return SocketServer
}  
module.exports= initWsServer