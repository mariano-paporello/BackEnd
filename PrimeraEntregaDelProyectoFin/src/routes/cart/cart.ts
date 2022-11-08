import {
    Router,
    Request,
    Response
} from "express";
import CartClass from "../../controller/CartClass";
import carritoUsuario from "../../temp/carritoUsuario";
import products from "../../temp/products";
const rutaCart = Router()

const carritoHerramientas = new CartClass()
rutaCart.post("/", (req: Request, res: Response) => {
    const nuevoCarrito = carritoHerramientas.crearUnCart()
    carritoUsuario.push(nuevoCarrito)
    console.log(carritoUsuario)
    res.json({
        idCarrito: nuevoCarrito.id
    })
})

rutaCart.delete("/:id", (req: Request, res: Response) => {
    if (carritoUsuario.length === 0) {
        return res.status(400).json({
            message: 'Carrito Not Found'
        })
    } 
    else {
        const id = Number(req.params.id)
        const index = carritoHerramientas.eliminarCart(id)
        if(index!==-1){
            const carritoEliminado= carritoUsuario.splice(index,1)
            if (carritoEliminado) {
                res.json({
                    Borrado: `Se a borrado el carrito con id: ${id}`
                })
            } else {
                return res.status(400).json({
                    message: 'Product Not Found to Delete'
                })
            }
        }else{
            return res.status(400).json({
                message: 'Id Invalid'
            })
        }
        
        
    }
})

rutaCart.get("/:id/productos", (req: Request, res: Response) => {
    if (carritoUsuario.length === 0) {
        return res.status(400).json({
            message: 'Cart Not Found'
        })
    } 
    else {
        const id = Number(req.params.id)
        const productosBuscados = carritoHerramientas.listarProductosDeCarrito(id)

        if (productosBuscados) {
            res.json({
                productos: productosBuscados
            })
        } else {
            return res.status(400).json({
                message: 'Cart Id Not Found'
            })
        }
    }
})

rutaCart.post("/:id/productos", (req: Request, res: Response) => {
    if (carritoUsuario.length === 0) {
        return res.status(400).json({
            message: 'Cart Not Found'
        })
    } 
    else {
        const id = Number(req.params.id)
        const {
            id_prod
        } = req.body

        const productoEncontrado = products.filter(element => element.id === id_prod)
        if (productoEncontrado[0]) {
            const carritoActualizado = carritoHerramientas.añadirProductoACarrito(id, productoEncontrado[0])
            if(carritoActualizado){
                res.json({
                    carritoActualizado: carritoActualizado
                })
            }else{
                return res.status(400).json({
                    message: 'Cart Id Not Found'
                })
            }
        }else{
            return res.status(400).json({
                message: 'Product Not Found to Read'
            })
        }

    }
})

rutaCart.delete("/:id/productos/:id_prod", (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const id_productos = Number(req.params.id_prod)
    const carritoActualizado = carritoHerramientas.eliminarProductoDeUnCarrito(id, id_productos)
    if(carritoActualizado){
        res.json({
            carritoActualizado
        })
    }
    else{
        return res.status(400).json({
            message: 'Product or Cart Not Found To Read'
        })
    }
    
})


export default rutaCart