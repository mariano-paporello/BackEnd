import {Router} from "express"
import rutaTest from "./testRoute"

const rutaPrincipal: Router = Router();

rutaPrincipal.use('/productos-test', rutaTest);

rutaPrincipal.get('/', (req, res) => {
    res.json({msg:'hola desde router'})
})

export default rutaPrincipal;