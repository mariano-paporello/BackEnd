import { producto } from "../../Public/types"
import productosModels from "../models/products"
import {logger} from "../middlewares/loggers"
class productsController{

   async list(){
    try{
        const getAll = await productosModels.find({})
        console.log(getAll)
        return getAll
    }catch(err){
        return logger.error(err)
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
    return logger.error(err)
   }    
    }
}

export default  productsController