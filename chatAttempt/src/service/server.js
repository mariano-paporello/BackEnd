const express = require('express')
const http = require('http')
const path = require('path')
const { engine } = require('express-handlebars')
const io = require('socket.io')
const app = express()
const mensages = require('../temp/mensajes')

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
app.get('/', (req, res)=>{

    res.render('main')
})

// WEBSOCKET PART:
const HTTPServer = http.Server(app);
const SocketServer = io(HTTPServer)



SocketServer.on('connection', (socket)=>{
    console.log('Usuario Conectado')
    socket.emit('bienvenidaAUsuario', 'Bienvenido Nuevo Usuario')
    console.log('clientId: '+socket.client.id)
    console.log('serverId: '+socket.id)

    socket.on('enviarMensajeGeneral', data=>{
       const colorOfUser = Math.floor(Math.random()*16777215).toString(16)
        const dataCompleta = {
            id: socket.client.id,
            mensajeGeneral: data.mensajeGeneral,
            style:colorOfUser
        }
        mensages.push(dataCompleta)
        SocketServer.emit('mensajeGeneral', dataCompleta)
    })

})



module.exports= HTTPServer