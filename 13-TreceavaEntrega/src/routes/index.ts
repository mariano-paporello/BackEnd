import {Router} from "express"
import {getAllNorm, getAllDenorm} from "../Controllers/normalizeController"
import { crear5Productos } from "../Controllers/testController";
import {fork} from "child_process"
import path from "path"


const rutaPrincipal: Router = Router();

const controllerPath = path.resolve(__dirname, '../Controllers/randomsController.ts')

rutaPrincipal.get("/normalize", async(req, res)=>{
    res.json(await getAllNorm())
})
rutaPrincipal.get("/denormalize", async(req, res)=>{
    res.json(await getAllDenorm())
})
rutaPrincipal.get("/test-fake-products", async(req, res)=>{
    res.json({ProductosFake: await crear5Productos()})
})

rutaPrincipal.get("/randoms", (req, res)=>{
    let cantidad
    req.query.cant ? (cantidad = Number(req.query.cant)) : 100000000;
    const calculo = fork(controllerPath)
    calculo.send(JSON.stringify({msg:"start", cantidad:cantidad}))
    calculo.on('message', (result)=>{
        res.json({
            Resultado: result
        })
    })
    
})

export default rutaPrincipal;