import {
    Response,
    Request,
    Router
} from "express"
import controller from "../../controller/ProductsClass"
import products from "../../temp/products"
import config from "../../config"

const rutaProductos = Router()

const productClass = new controller()

rutaProductos.get("/", (req: Request, res: Response) => {
    res.json(productClass.getAll(products))
})
rutaProductos.get("/:id", (req: Request, res: Response) => {
    if (config.administrador) {
            const productoEncontrado = productClass.getOne(products, Number(req.params.id))
            if(productoEncontrado){
                return res.json(productoEncontrado)
            }else{
                return res.status(400).json({
                    message: 'Product Not Found'
                })
            }
    } else {
        return res.status(401).json({
            error: "No estas autorizado"
        })
    }

})
rutaProductos.post("/", (req: Request, res: Response) => {
    if (config.administrador) {
        const {
            title,
            price,
            thumbnail,
            descripcion,
            stock
        } = req.body
        if (!title || !price || !thumbnail || !descripcion || !stock) {
            return res.status(400).json({
                message: 'campos Not Found'
            })
        } else {
            const newProduct = productClass.postNewProduct(products, title, price, thumbnail, descripcion, stock)
            res.json(newProduct)
        }
    } else {
        return res.status(401).json({
            error: "No estas autorizado"
        })
    }
})

rutaProductos.put("/:id", (req: Request, res: Response) => {
    if (config.administrador) {
        const {
            title,
            price,
            thumbnail,
            descripcion,
            stock
        } = req.body

        if (!title || !price || !thumbnail || !descripcion || !stock) {
            return res.status(400).json({
                message: 'Campos Incompletos'
            })
        } 
        else {
            const productoActualizado = productClass.putProduct(products, title, price, thumbnail, descripcion, stock, Number(req.params.id))
            if(productoActualizado){
                res.json(productoActualizado)
            }
            else{
                return res.status(400).json({
                    message: 'Id Invalid'
                })
            }
        }
    } else {
        return res.status(401).json({
            error: "No estas autorizado"
        })
    }

})
rutaProductos.delete('/:id', (req: Request, res: Response) => {
    if (config.administrador) {
        const idBuscado = Number(req.params.id)
        const index = productClass.deleteProduct(products, idBuscado)
        if(index === -1){
            return res.status(400).json({
                error: "Product Not Found"
            })
        }else{}
        const productoEliminado = products.splice(index,1)
        res.json(productoEliminado)
    } else {
        return res.status(401).json({
            error: "No estas autorizado"
        })
    }
})

export default rutaProductos