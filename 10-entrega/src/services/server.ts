import express from 'express'
import http from 'http'
import morgan from 'morgan'
import { engine } from 'express-handlebars'
import rutaTest from "../routes/index"
import path from 'path'
import ProductoModel from '../models/products'
import productsController from '../Controllers/productsController'
import mensajeController from '../Controllers/mensajesController'
import menssagesModel from '../models/messages'
import { crear5Productos } from '../Controllers/testController'


const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('public'))

const prodController = new productsController()
const mjController = new mensajeController()



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


app.get('/', async (req, res) => {
    ProductoModel.find({}).then(productos => {
        menssagesModel.find({}).then(mensajes => {
            res.render('main', {
                productos: productos.map(productoIndv => productoIndv.toJSON()),
                mensajes: mensajes.map(mensajeIndv => mensajeIndv.toJSON())
            })
        })
    })
})

app.use("/api",rutaTest)

const HTTPServer = new http.Server(app);

module.exports=HTTPServer