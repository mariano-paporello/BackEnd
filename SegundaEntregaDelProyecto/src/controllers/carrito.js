const methods = require("../models/cart")
const productCotroller = require("./productos")
class carritoController {
    async crearUnCart() {
        return await methods.create([{}])
    }

    async eliminarCart(idBuscado) {
        try {
            await methods.deleteOne({
                _id: idBuscado
            })
            return "carrito borrado"
        } catch (err) {
            console.error(err)
            return false
        }
    }

    async listarProductosDeCarrito(idBuscado) {
        const carritoEncontrado = await methods.findOne({_id: idBuscado})
        if (carritoEncontrado) {
            return carritoEncontrado.productos
        } else {
            return false
        }
    }

    async añadirProductoACarrito(idBuscado, id_prod) {
        if(idBuscado || id_prod){
            const productos = await methods.findOne({_id:idBuscado})
            const productoAAñadir = await productCotroller.list(id_prod)
            const carritoActualizado = await methods.updateMany({_id: idBuscado},{$set: {productos:[...productos.productos, productoAAñadir]}})
            return carritoActualizado
        }else{
            console.error("Id no existente o erroneo")
        }
    }

    async eliminarProductoDeUnCarrito(idBuscado, id_prod) {
        const {productos} = await methods.findOne({id:idBuscado})
        const index= productos.filter(element =>  element._id != id_prod)
        if(filter.length > 2 || !id_prod ){
            console.log("Error con el id_product introducido")
        }
        const carritoActualizado = await methods.updateMany({id: idBuscado}, {$set: {productos: [index[0]]}})
    }
}

module.exports = controllerCart = new carritoController()