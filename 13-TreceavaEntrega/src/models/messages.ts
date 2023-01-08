import mongoose from "mongoose"

const menssages= 'menssages'

const messagesSchema = new mongoose.Schema(
    {
    author:{
    nombre: { type: String, require: true},
    apellido: { type: String, require: true, max: 100 },
    edad: { type: Number, require: true, max: 100 },
    alias: { type: String, default: true },
    avatar: { type: String, required: true },
    },
    text: {type: String, require: true}
},
{timestamps: true}
)

const menssagesModel = mongoose.model(menssages, messagesSchema)
export default menssagesModel