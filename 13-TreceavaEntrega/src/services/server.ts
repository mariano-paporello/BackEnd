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
import passport from "passport"
import { loginFunc, signUpFunc, generateAuthToken } from './auth'


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
export const logged = { islogged: false, isDestroyed: false, nombre: '', contraseña: false }

const unSegundo = 1000;
const unMinuto = unSegundo * 60;
const unaHora = unMinuto * 60;
const unDia = unaHora * 24;
const storeOptions= {
    store: MongoStore.create({
        mongoUrl: config.MONGO_ATLAS_URL,
        crypto: {
            secret: config.CRYPTO_SECRET 
        }
        }),
        secret: config.SECRET,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: { maxAge: unMinuto }    
    };

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'))

app.use(cookieParser());
app.use(session(storeOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);

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
    if(req.session.nombre&&logged.islogged&&!logged.isDestroyed){+
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
app.post('/login',async (req, res, next) => {
passport.authenticate('login', {} , async(err, user, info)=>{   
        const data = req.body
    if(user.username&&user.password){
        const token = generateAuthToken(user)
            logged.nombre= user.username
            logged.contraseña=true
            logged.islogged= true
    res.header('x-login-token', token).redirect("/")
    }else {
        res.status(400).json({Error: "Datos ingresados no validos o nulos."})
    }
        })(req, res, next)
})



app.post('/register', async(req, res, next)=>{
    passport.authenticate('signup', {}, (err, user, info)=>{
    const {username, password} = req.body

    if(!username || !password){
        res.status(400).json({Error: "Datos ingresados no validos o nulos"})
    }
    const token = generateAuthToken(user)
        logged.nombre= username
        logged.contraseña=true
        logged.islogged= true
        
        res.header('x-login-token', token).redirect("/")
    })(req, res, next)
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

app.get("/info", (req, res)=>{
    console.log(process.version)
   res.json({info:`Directorio actual de trabajo ===> ${process.cwd()}.
   ID Del proceso actual ====> ${process.pid}.
   Version de NodeJs corriendo ====> ${process.version}.
   Titulo del proceso ====> ${process.title}.
   Sistema Operativo ====> ${process.platform}.
   Uso de memoria====> ${JSON.stringify(process.memoryUsage())}.`}) 
   
})




const HTTPServer = new http.Server(app);

module.exports=HTTPServer