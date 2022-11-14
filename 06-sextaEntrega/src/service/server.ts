const express = require('express')
const http = require('http')
import { engine } from 'express-handlebars'
import { Engine } from 'express-handlebars/types'
import path from 'path'
import productos from "../temp/products"
import mensajes from "../temp/mensajes"
const app = express()

app.use(express.json())
app.use(express.static('public'))

console.log(productos)

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
const HTTPServer = http.Server(app);

module.exports=HTTPServer