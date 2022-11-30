const mongoose = require('mongoose')

const carritoColl= 'carritos'

const carritoSchema = new mongoose.Schema(
    {
    productos: { type: [], required: true },
},
{timestamps: true}
)

const CarritoModel = mongoose.model(carritoColl, carritoSchema)
module.exports = CarritoModel