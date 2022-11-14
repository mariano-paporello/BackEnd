const io = require('socket.io')
import moment from "moment"
import productos from "../temp/products"
import users from "../temp/users"
import mensajes from "../temp/mensajes"
import { mensaje } from "../../Public/types"

const initWsServer = (server) => {
    const SocketServer = io(server)

    SocketServer.on('connection', (socket) => {
        socket.emit('bienvenidaAUsuario', 'Bienvenido Nuevo Usuario')
        socket.emit('bienvenidaAUsuario', {
            Bienvenida: 'hola'
        })
        socket.on("enviarNuevoProducto", (data) => {
            
                const nuevoProducto = {
                    id: productos.length !== 0 ? productos[productos.length - 1].id + 1 : 1,
                    ...data
                }
                productos.push(nuevoProducto)
        
                SocketServer.emit("productosArray", nuevoProducto)
            
        })
        socket.on('enviarNuevoUser', data=>{
            const nuevoUser = {
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