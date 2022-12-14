import mongoose from "mongoose"

const productoColl= 'productos'

const productoSchema= new mongoose.Schema(
    {
        title: {type: String, require:true, max: 100},
        price: { type: Number, require: true},
        thumbnail: { type: String, require: true, max: 100 },
    },
    {timestamps: true}
)

const ProductoModel = mongoose.model(productoColl,productoSchema)
export default ProductoModel 