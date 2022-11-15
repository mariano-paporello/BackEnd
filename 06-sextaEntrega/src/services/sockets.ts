const io = require('socket.io')
import moment from "moment"
import productsController from "../Controllers/productsController"
import users from "../temp/users"
import mensajes from "../temp/mensajes"
import { mensaje, user } from "../../Public/types"

const initWsServer = (server) => {
    const SocketServer = io(server)

    SocketServer.on('connection', (socket) => {
        socket.emit('bienvenidaAUsuario', 'Bienvenido Nuevo Usuario')
        socket.emit('bienvenidaAUsuario', {
            Bienvenida: 'hola'
        })
        socket.on("enviarNuevoProducto", (data) => {
            // RECIBE NUEVO PRODUCTO Y LO ENVIA A DB
                SocketServer.emit("productosArray", productsController.newProduct(data))
            
        })
        socket.on('enviarNuevoUser', data=>{
            const nuevoUser:user = {
                id: socket.client.id,
                ...data
            }
            users.push(nuevoUser)
            socket.emit("UsuarioConfirmadoYGuardado", nuevoUser)
        })
        socket.on('enviarMensaje', data=>{
            const dataCompleta: mensaje = {
                mensajeGeneral: `${data.nombre} ${data.email}: ${data.mensajeGeneral}  [${moment().format('h:mmA')}(${moment().format('L')})]`,
            }
            mensajes.push(dataCompleta)
            SocketServer.emit('imprimirMensaje', dataCompleta)
        })
    })
    return SocketServer
}  







module.exports= initWsServer