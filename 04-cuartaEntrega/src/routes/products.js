const express = require('express');
const rutaProductos = new express.Router()
const productos = require('../temp/productos')



rutaProductos.get('/', async (require, resolve) => {
    // ACA HAY QUE VER PARA HACER REVISIONES DE SI HAY COSAS O NO DENTRO DEL ARRAY PRODUCTOS
    resolve.json(productos);
})


rutaProductos.get('/:id', (require, resolve) => {
    const idBuscado = require.params.id
    // ACA UNA COSA PARA REVISAR QUE SE ESTEN PASANDO BIEN LOS DATOS
    const productoEncontrado = productos.filter(element => element.id == idBuscado)
    resolve.json(productoEncontrado[0])
})

rutaProductos.post('/', (require, resolve) => {
    const {title, price, thumbnail} = require.body
    // if(!title){} ACA REVISAR QUE TODO LO INGRESADO ESTE BIEN
    const nuevoProducto = {
        id: productos.length !== 0 ? productos[productos.length - 1].id + 1 : 1,
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    productos.push(nuevoProducto)
    console.log("Recibo un producto y le devuelvo un nuevo id")
    resolve.json(nuevoProducto)
})

rutaProductos.put('/:id', (require, resolve) => {
    const idBuscado = require.params.id
    const {
        title,
        price,
        thumbnail
    } = require.body
    const index = productos.findIndex(element => element.id == idBuscado)
    const productoActualizado = {
        id: productos[index].id,
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    productos.splice(index, 1, productoActualizado)
    resolve.json(productoActualizado)
})

rutaProductos.delete('/:id', (require, resolve) => {
    const idBuscado = require.params.id
    const index = productos.indexOf(element=>element.id===idBuscado)
    productos.splice(index,1)
    resolve.send(`Se borró el producto con el id buscado (${idBuscado})`)
})



module.exports = rutaProductos;