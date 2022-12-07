import {Router} from "express";
import {getAllNorm, getAllDenorm} from "../Controllers/normalizeController"

const rutaNormalize: Router =  Router();

rutaNormalize.get("/normalize", async(req, res)=>{
    res.json(await getAllNorm())
})
rutaNormalize.get("/denormalize", async(req, res)=>{
    res.json(await getAllDenorm())
})


export default rutaNormalize;