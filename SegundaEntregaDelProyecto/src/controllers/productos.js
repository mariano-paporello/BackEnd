const methods = require('../models/product')
class productosController {

   async newProduct(newProduct){
    try{
       return await methods.create(newProduct)
        
    }catch(err){
        console.error("Error "+err);
    }
    }
    async list(idBuscado=null){
        if(idBuscado!=null){
            const productoEncontrado= await methods.findOne({_id:idBuscado})
            return productoEncontrado
        }
        const products = await methods.find()
        return products
    }
    async updateOne(idBuscado, objectUpdate){
     const productUpdate=  await methods.updateOne(
                {_id: idBuscado},
                {$set: objectUpdate }
            )
            return productUpdate
    }
    async deleteOne(idBuscado){
       return await methods.deleteOne(
            {_id: idBuscado}
            )
       
    }
}

module.exports=  controllerProMongoDb = new productosController()