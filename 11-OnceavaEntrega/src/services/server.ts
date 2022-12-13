import express from 'express'
import http from 'http'
import { engine } from 'express-handlebars'
import rutaTest from "../routes/index"
import path from 'path'
import ProductoModel from '../models/products'
import menssagesModel from '../models/messages'
import cookieParser from "cookie-parser"
import session from 'express-session';

declare module 'express-session' {
    interface SessionData {
      nombre: String;
      contador: Number;
    }
  }
  


const app = express()
app.use("/api",rutaTest)
// Session Part:
let logged = { islogged: false, isTimedOut: false, isDestroyed: false, nombre: '' }
const unSegundo = 1000;
const unMinuto = unSegundo * 60;
const unaHora = unMinuto * 60;
const unDia = unaHora * 24;
app.use(cookieParser());
app.use(
  session({
    secret: 'SuperSecreto',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: unMinuto }
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
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


app.get('/', async (req, res) => {
    if(req.session.nombre!=""&&req.session.nombre&&logged.islogged){
        console.log(req.cookies.userName)
        ProductoModel.find({}).then(productos => {
            menssagesModel.find({}).then(mensajes => {
                res.render('main', {
                    productos: productos.map(productoIndv => productoIndv.toJSON()),
                    mensajes: mensajes.map(mensajeIndv => mensajeIndv.toJSON()),
                    user: req.session.nombre
                })
            })
        })
    }
    else{
        res.redirect("/login")
    }
})
app.get('/login', (req, res) => {
    res.render("Login")
})
app.get("/logout", (req, res)=>{
    if(req.session){
    res.render("Logout", {
        user: req.session.nombre
    })
    req.session.destroy;
    console.log(req.session)
    }
    else{
        res.redirect("/")
    }
})
app.post('/login', (req, res) => {
    const {userName} = req.body
    if(userName|| userName== ""){
        req.session.nombre =  userName
    logged.nombre= userName
    logged.islogged= true
    console.log(req.session)
    res.redirect("/")
    }
    else{
        throw new Error('Completar ')
    }
    
})



const HTTPServer = new http.Server(app);

module.exports=HTTPServer