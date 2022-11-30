const mongoose = require('mongoose')

const productoColl= 'productos'

const productoSchema= new mongoose.Schema(
    {
        title: {type: String, require:true, max: 100},
        price: { type: Number, require: true},
        description: { type: String, require: true, max: 100 },
        image: { type: String, require: true, max: 100 },
        admin: { type: Boolean, default: false },
        stock: { type: Number, required: true },
    },
    {timestamps: true}
)

const ProductoModel = mongoose.model(productoColl,productoSchema)
module.exports= ProductoModel 