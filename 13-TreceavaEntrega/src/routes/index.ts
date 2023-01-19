import {Router} from "express"
import {getAllNorm, getAllDenorm} from "../Controllers/normalizeController"
import { crear5Productos } from "../Controllers/testController";
import {fork} from "child_process"
import {logger} from "../middlewares/loggers"
import { randomCreator } from "../Controllers/randomsController";
import path from "path"


const rutaPrincipal: Router = Router();

const controllerPath = path.resolve(__dirname, '../Controllers/randomsController.ts')

rutaPrincipal.get("/normalize", async(req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    res.json(await getAllNorm())
})
rutaPrincipal.get("/denormalize", async(req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    res.json(await getAllDenorm())
})
rutaPrincipal.get("/test-fake-products", async(req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    res.json({ProductosFake: await crear5Productos()})
})

rutaPrincipal.get("/randoms", (req, res)=>{
    // logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    let cantidad
    if(req.query.cant){(cantidad = Number(req.query.cant))}else{ 100000000};
    // const calculo = fork(controllerPath)
    // calculo.send(JSON.stringify({msg:"start", cantidad:cantidad}))
    // calculo.on('message', (result)=>{
        res.json({
            Resultado: randomCreator(cantidad)
        })
    // })
    
})

export default rutaPrincipal;