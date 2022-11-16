import { producto } from "../../Public/types"
import { getProductsMariaDB, createProductMariaDB } from "../db/mariaDb/db.products"
class productsController{

   async list(){
    try{
        const getAll = await getProductsMariaDB()
        return getAll
    }catch(err){
        return console.log({
            Error:true,
            theError:err})
    }}


   async newProduct(data){try{
    const productos = await getProductsMariaDB()
        const nuevoProducto : producto = {
            id: productos.length !== 0 ? productos[productos.length - 1].id + 1 : 1,
            ...data
        }
        createProductMariaDB(nuevoProducto)
        return nuevoProducto
   }catch(err){
    throw new Error(err)
   }
        

        
    }
}

export default  productsController