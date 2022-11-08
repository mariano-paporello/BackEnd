import moment from "moment"
export type producto = {
    id: number
    title: string
    timestamp: string
    descripcion:string
    price: number
    thumbnail: string
    stock: number
}
class eccomerceMecanism {

    getAll(products: producto[], idbody ? : number) {
        return products    
    }
    getOne(products : producto[],idbody : number){
        const productoEncontrado = products.filter(element => element.id == idbody)
        return productoEncontrado[0]
    }

    postNewProduct(products: producto[] , title: string, price:number, thumbnail:string, descripcion:string, stock: number,){    
    const nuevoProducto: producto = {
        id: products.length >= 1  ? products[products.length - 1].id + 1 : 1,
        title: title,
        timestamp: moment().format('llll'),
        descripcion: descripcion,
        price: price,
        thumbnail: thumbnail,
        stock: stock
    }
    products.push(nuevoProducto)
    return nuevoProducto
    }

    putProduct(products: producto[], title: string, price:number, thumbnail:string, descripcion:string, stock: number, idbody? : number){
        
            const index = products.findIndex(element => element.id == idbody)
            if(index===-1){
                return false
            }else{
                const productoActualizado = {
                    id: products[index].id,
                    title: title,
                    timestamp: moment().format('llll'),
                    descripcion: descripcion,
                    price: price,
                    thumbnail: thumbnail,
                    stock: stock
                }
                products.splice(index, 1, productoActualizado)
                return productoActualizado
            } 
    }
    
    deleteProduct(products: producto[], idbody?: number){
        const index = products.findIndex(element=>element.id==idbody)
        return index
    }

}


export default eccomerceMecanism