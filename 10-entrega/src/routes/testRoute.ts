import {Router} from "express";
import { crear5Productos } from "../Controllers/testController";

const rutaTest: Router =  Router();

rutaTest.get("/", async(req, res)=>{
    res.json({ProductosFake: await crear5Productos()})
})


export default rutaTest;