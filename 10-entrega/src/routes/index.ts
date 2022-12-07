import {Router} from "express"
import rutaTest from "./testRoute"
import rutaNormalize from "./normalizeRoute";

const rutaPrincipal: Router = Router();

rutaPrincipal.use('/productos-test', rutaTest);
rutaPrincipal.use("/mensajes",rutaNormalize)

rutaPrincipal.get('/', (req, res) => {
    res.json({msg:'hola desde router'})
})

export default rutaPrincipal;