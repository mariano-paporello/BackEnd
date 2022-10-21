const express = require('express')
const rutaPrincipal = new express.Router();
const productos = require('../temp/productos')



rutaPrincipal.get('/', async (require, resolve) => {
    resolve.json(productos);
})

rutaPrincipal.get('/:id', (require, resolve) => {
    const idBuscado = require.params.id
    const productoEncontrado = productos.filter(element => element.id == idBuscado)
    if(productoEncontrado.length === 0){
		return resolve.status(404).json({ error : 'producto no encontrado' })
	}
    resolve.json(productoEncontrado[0])
})

rutaPrincipal.post('/', (require, resolve) => {
    const {title, price, thumbnail} = require.body
    if(!title || !price || !thumbnail) {
		return resolve.status(400).json({
			msg: "Campos incompletos , media pila :|"
		})
	}
    const nuevoProducto = {
        id: productos.length !== 0 ? productos[productos.length - 1].id + 1 : 1,
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    productos.push(nuevoProducto)
    console.log("Recibo un producto y le devuelvo un nuevo id")
    resolve.redirect('/productos')
})

rutaPrincipal.put('/:id', (require, resolve) => {
    const idBuscado = require.params.id
    const {
        title,
        price,
        thumbnail
    } = require.body
	if(!title || !price|| !thumbnail) {
		return resolve.status(400).json({
			msg: "Campos incompletos, media pila :|"
		})
	}
    const index = productos.findIndex(element => element.id == idBuscado)
    if(index<0){
        return resolve.status(404).json({ error : 'producto no encontrado' })
    }
    const productoActualizado = {
        id: productos[index].id,
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    productos.splice(index, 1, productoActualizado)
    resolve.json(productoActualizado)
})

rutaPrincipal.delete('/:id', (require, resolve) => {
    const idBuscado = require.params.id
    const index = productos.findIndex(element=>element.id==idBuscado)
    const productoEliminado = productos.splice(index,1)
    if(productoEliminado.length == 0){
		return resolve.status(404).json({ error : 'producto no encontrado' })
	}
    resolve.json({
        msg:`Se a borrado un producto con id: ${idBuscado}`
    })
})

module.exports = rutaPrincipal;

