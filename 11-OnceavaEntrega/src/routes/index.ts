import {Router} from "express"
import {getAllNorm, getAllDenorm} from "../Controllers/normalizeController"
import { crear5Productos } from "../Controllers/testController";

const rutaPrincipal: Router = Router();


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