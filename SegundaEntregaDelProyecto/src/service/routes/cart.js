const {Router} = require('express')
const carritoMethods = require('../../controllers/carrito')

const router = Router();

router.post("/", async(req, res)=>{
    const cart = await carritoMethods.crearUnCart()
    res.json({mesage: cart})
})
    
router.delete("/:id", async(req, res)=>{
    const idBuscado= req.params.id
    const borrado= await carritoMethods.eliminarCart(idBuscado)
    if(borrado){
        res.json({msg:"Carrito Borrrado id: "+ idBuscado})
    }else{
        throw new Error("Error no se a borrado de forma correcta")
    }
})
    
router.get("/:id/productos",async(req, res)=>{
    const idBuscado= req.params.id
    const productsInCart=await carritoMethods.listarProductosDeCarrito(idBuscado)
    if(productsInCart===false){
        res.json({err:"ERROR"})
    }else{
        res.json({Prodcutos:productsInCart})
    }
    
} 
)
    
router.post("/:id/productos",async(req, res)=>{
    const idBuscado= req.params.id
    const{id_prod} = req.body
    await carritoMethods.añadirProductoACarrito(idBuscado, id_prod)
    res.json({msg:"producto añadido a carrito "+ idBuscado})
} )

router.delete("/:id/productos/:id_prod",async(req, res)=>{
    const {idBuscado}= req.params
    const {id_prod}=req.params
    await carritoMethods.eliminarProductoDeUnCarrito(idBuscado, id_prod)
    res.json({msg:"producto con id "+id_prod+ " a sido eliminado"})
} )
module.exports= router;