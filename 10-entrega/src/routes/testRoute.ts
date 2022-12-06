import {Router} from "express"
import {crear5Productos} from "../Controllers/testController"

const rutaTest: Router =  Router();

rutaTest.get("/", crear5Productos)


export default rutaTest;