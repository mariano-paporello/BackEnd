import moment from "moment";
import { producto } from "./ProductsClass";
import carritoUsuario from "../temp/carritoUsuario";

export type carrito = {
    id: number
    timestamp: string
    productos: producto[]
}
const carritoBuscado = (id:number)=>{
    const index = carritoUsuario.findIndex(element=>element.id === id)
     return  carritoUsuario[index]
}

class CartClass {
 
    crearUnCart(){
       const cart : carrito = {
        id: Math.floor(Math.random() * 100),
        timestamp: moment().format('llll'),
        productos: []
       }
       return cart
    }
    
    eliminarCart(id:number){
        const index = carritoUsuario.findIndex(element=> element.id === id)
        return index
    }

    listarProductosDeCarrito(id: number){
        const carritoEncontrado: carrito = carritoBuscado(id)
        if(carritoEncontrado){
            return carritoEncontrado.productos
        }else{
            return false
        }
        
    }

    añadirProductoACarrito(id:number, producto: producto){
        const carritoEncontrado: carrito = carritoBuscado(id)
        if(!carritoEncontrado){
            return false
        }else{
            const productosDelCarrito = carritoEncontrado.productos
            productosDelCarrito.push(producto)
            return carritoEncontrado
        }
        
    }

    eliminarProductoDeUnCarrito(id:number, id_prod:number){
        const carritoEncontrado: carrito = carritoBuscado(id)
        console.log(carritoEncontrado)
        if(!carritoEncontrado){
            return false
        }else{
            const productoIndex = carritoEncontrado.productos.findIndex(element => element.id === id_prod)
            console.log(productoIndex)
            if(productoIndex=== -1){
                return false
            }else{
                carritoEncontrado.productos.splice(productoIndex,1)
                return carritoEncontrado
            }
        }
    }

}

export default CartClass