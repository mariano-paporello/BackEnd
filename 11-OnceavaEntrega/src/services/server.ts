import express from 'express'
import http from 'http'
import { engine } from 'express-handlebars'
import rutaTest from "../routes/index"
import path from 'path'
import ProductoModel from '../models/products'
import menssagesModel from '../models/messages'
import cookieParser from "cookie-parser"
import session from 'express-session';
import MongoStore from 'connect-mongo'
import config from '../config/index'

declare module 'express-session' {
    interface SessionData {
      nombre:String,
      contador:Number
      contraseña:any
    }
  }


const app = express()
app.use("/api",rutaTest)
// Session Part:
let logged = { islogged: false, isDestroyed: false, nombre: '', contraseña: false }
const unSegundo = 1000;
const unMinuto = unSegundo * 60;
const unaHora = unMinuto * 60;
const unDia = unaHora * 24;
const storeOptions= {
    store: MongoStore.create({
        mongoUrl: config.MONGO_ATLAS_URL,
        crypto: {
            secret: "1234"
        }
        }),
        secret: 'SuperSecreto',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: { maxAge: unMinuto }
          
        
}
app.use(cookieParser());
app.use(session(storeOptions));

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
    if(req.session.nombre&&logged.islogged&&logged.isDestroyed===false){
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
app.post('/login', (req, res) => {
    const {userName, contraseña} = req.body
    if(userName&&contraseña){
        // if(contraseñaExiste&&usuarioexiste&&contraseñaYUsuariosCompatibles){
        // Hago lo que tengo que hacer para poder mostrar todo el contenido a este usuario
        // }
    req.session.nombre =  userName
    req.session.contraseña= contraseña
    logged.nombre= userName
    logged.contraseña=true
    logged.islogged= true
    res.redirect("/")
    }
    else {
        if(!userName){
        throw new Error('Ingresar usuario para acceder')
        }
        if(!contraseña){
            throw new Error('Ingresar contraseña de usuario para acceder')
        }
    }
    
})
app.post('/register', (req, res)=>{
    const {userName, contraseña}= req.body
    res.json({
        msg: userName + contraseña
    })
})

app.get('/login', (req, res) => {
    logged.isDestroyed=false
    res.render("Login")
})

app.get('/register',(req,res)=>{
     res.render("register")
})


app.get("/logout", (req, res)=>{
    if(req.session.nombre){
    res.render("Logout", {
        user: req.session.nombre
    })
    logged.islogged= false
    logged.nombre=""
    logged.isDestroyed= true
    setTimeout(()=>{
        req.session.destroy((err)=>{
            console.error(err)
           });
    },unMinuto)
    
    }
    else{
        res.redirect("/")
    }
})




const HTTPServer = new http.Server(app);

module.exports=HTTPServer