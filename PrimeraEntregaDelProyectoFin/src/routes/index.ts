import {Router} from "express"
import rutaProductos  from './products/products'
import rutaCart from "./cart/cart";

const rutaPrincipal  = Router()

rutaPrincipal.use('/productos', rutaProductos);
rutaPrincipal.use('/carrito', rutaCart)
rutaPrincipal.get('/', (req, res)=>{
    res.json({
        msg:"Bonjoir"
    })
})

export default rutaPrincipal;