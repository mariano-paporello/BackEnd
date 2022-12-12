import {Router} from "express"
import {getAllNorm, getAllDenorm} from "../Controllers/normalizeController"
import { crear5Productos } from "../Controllers/testController";

const rutaPrincipal: Router = Router();

rutaPrincipal.get('/login', (req, res) => {
    res.render("Login")
})
rutaPrincipal.get("/logout", (req, res)=>{
    res.render("Logout")
})
rutaPrincipal.post('/login', (req, res) => {
    console.log(req.params, req.body, req.query)
    // const {userName} = req.body
    // console.log(userName)
    // res.cookie("userName", userName)
    res.redirect("/")
})
rutaPrincipal.get("/normalize", async(req, res)=>{
    res.json(await getAllNorm())
})
rutaPrincipal.get("/denormalize", async(req, res)=>{
    res.json(await getAllDenorm())
})
rutaPrincipal.get("/test-fake-products", async(req, res)=>{
    res.json({ProductosFake: await crear5Productos()})
})

export default rutaPrincipal;