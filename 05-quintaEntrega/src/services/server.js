const express = require('express')
const rutaPrincipal = require('../routes/index')
const path = require('path')
const { engine } = require('express-handlebars')
const productos = require('../temp/productos')

const app = express()

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Los Path:
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
app.get('/productos', (req,res)=>{
    const dataDinamica = {
        productos
    }
    res.render('products', dataDinamica)
    console.log(dataDinamica)
})

app.use('/productos', rutaPrincipal);

module.exports = app



// TENGO QUE CAMBIAR VARIAS COSAS PERO NO DEBERÍA TARDAR TANTO, CAMBIAR LAS RUTAS PARA QUE QUEDE LOCALHOST/PRODUCTS ES DECIR SACAR EL API
// Y DESPUES CREAR LOS HANDLEBARS PARA CADA UNA DE LAS PAGINAS Y SUS DETERMINADOS PARTIALS