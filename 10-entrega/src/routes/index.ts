import {Router} from "express"
import rutaTest from "./testRoute"

const rutaPrincipal: Router = Router();

rutaPrincipal.use('/productos-test', rutaTest);
export default rutaPrincipal;