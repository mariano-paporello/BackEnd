const express = require('express')
const rutaProductos = require('./products')

const rutaPrincipal = new express.Router();

rutaPrincipal.use('/productos', rutaProductos);

module.exports = rutaPrincipal;