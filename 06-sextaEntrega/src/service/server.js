const express = require('express')
const http = require('http')
const io = require('socket.io')
const moment = require('moment')
const {
    engine
} = require('express-handlebars')
const path = require('path')
const productos = require('../temp/products')
const users = require('../temp/users')
const mensajes =require('../temp/mensajes')
const app = express()

app.use(express.json())
app.use(express.static('public'))


// HBS PART:
const viewPath = path.resolve(__dirname, '../../views')
const layoutsPath = `${viewPath}/layouts`
const partialsPath = `${viewPath}/partials`
const defaultLayoutPath = `${layoutsPath}/index.hbs`;

app.set('view engine', 'hbs')
app.set('views', viewPath)

app.engine('hbs', engine({
    layoutsDir: layoutsPath,
    extname: 'hbs',
    partialsDir: partialsPath,
    defaultLayout: defaultLayoutPath
}))

app.get('/', (req, res) => {
    res.render('main', {
        productos,
        mensajes
    })
})

// WEBSOCKET PART:
const HTTPServer = http.Server(app);
const SocketServer = io(HTTPServer)

SocketServer.on('connection', (socket) => {
    console.log('Usuario Conectado')
    socket.emit('bienvenidaAUsuario', 'Bienvenido Nuevo Usuario')
    console.log('clientId: ' + socket.client.id)
    console.log('serverId: ' + socket.id)

    socket.emit('bienvenidaAUsuario', {
        culo: 'hola'
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
        const dataCompleta = {
            mensajeGeneral: `${data.nombre} ${data.email}: ${data.mensajeGeneral}  [${moment().format('h:mmA')}(${moment().format('L')})]`,
        }
        mensajes.push(dataCompleta)
        console.log(`mensajes: ${mensajes}`)
        SocketServer.emit('imprimirMensaje', dataCompleta)
    })
})






module.exports = HTTPServer