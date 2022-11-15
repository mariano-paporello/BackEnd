import { producto } from "../../Public/types"
import { listProducts, createProduct } from "../db/db.products"
class productsController{

   async list(){
    try{
        const getAll = await listProducts
        return getAll
    }catch(err){
        return console.log({
            Error:true,
            theError:err})
    }}


   async newProduct(data){
        const productos = await listProducts
        const nuevoProducto : producto = {
            id: productos.length !== 0 ? productos[productos.length - 1].id + 1 : 1,
            ...data
        }
        createProduct(nuevoProducto)

        return nuevoProducto
    }
}

export default  new productsController()