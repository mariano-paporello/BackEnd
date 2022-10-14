const express = require('express');
const rutaProductos = new express.Router()

let productos = []

rutaProductos.get('/', async (require, resolve) => {
    const dataTitulosOnly = productos.map(element => element.title).join(", ")
    // ACA HAY QUE VER PARA HACER REVISIONES DE SI HAY COSAS O NO DENTRO DEL ARRAY PRODUCTOS
    resolve.send(`<h1>Todos los Productos: ${dataTitulosOnly}</h1>`);
})


rutaProductos.get('/:id', (require, resolve) => {
    const idBuscado = require.params.id
    // ACA UNA COSA PARA REVISAR QUE SE ESTEN PASANDO BIEN LOS DATOS
    const productoEncontrado = productos.filter(element => element.id == idBuscado)
    resolve.send(`<h1>Producto Encontrado</h1>
    <h3>Nombre del  Producto: ${productoEncontrado[0].title}</h3>
    <h3>Precio del Producto: $${productoEncontrado[0].price}</h3>
    <h3>Imagen del Producto: ${productoEncontrado[0].thumbnail}</h3>`)
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
    resolve.send(`
    <h1>Nuevo Producto</h1>
    <h3>Nombre del  Producto: ${nuevoProducto.title}</h3>
    <h3>Precio del Producto: $${nuevoProducto.price}</h3>
    <h3>Imagen del Producto: ${nuevoProducto.thumbnail}</h3>
    <a href="/">Volver a el inicio</a>
    `)
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
    resolve.send(`
 <h1>Producto Actualizado</h1>
    <h3>Nombre del  Producto: ${productoActualizado.title}</h3>
    <h3>Precio del Producto: $${productoActualizado.price}</h3>
    <h3>Imagen del Producto: ${productoActualizado.thumbnail}</h3>
    <a href="/">Volver a el inicio</a>
 `)
})

rutaProductos.delete('/:id', (require, resolve) => {
    const idBuscado = require.params.id
    const index = productos.indexOf(element=>element.id===idBuscado)
    productos.splice(index,1)
    resolve.send(`Se borró el producto con el id buscado (${idBuscado})`)
})



module.exports = rutaProductos;