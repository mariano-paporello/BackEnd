import { producto } from "../../Public/types"
import productosModels from "../models/products"
class productsController{

   async list(){
    try{
        const getAll = await productosModels.find({})
        console.log(getAll)
        return getAll
    }catch(err){
        return console.log({
            Error:true,
            theError:err})
    }}


   async newProduct(data){
    try{
        const nuevoProducto : producto = {
            ...data
        }
       const res = await productosModels.create(nuevoProducto)
       console.log(res)
        return res
   }catch(err){
    throw new Error(err)
   }    
    }
}

export default  productsController