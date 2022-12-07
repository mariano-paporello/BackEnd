import { mensaje } from "../../Public/types"
import menssagesMetodos from "../models/messages"
import menssagesModel from "../models/messages"

class mensajeController{

    async list(){
     try{
         const getAll = await menssagesMetodos.find({})
         return getAll
     }catch(err){
         return console.log({
             Error:true,
             theError:err})
     }}
 
 
    async nuevomensaje(data){
        try{
            const dataCompleta: mensaje = {
                author:{
                    id: data.id,
                    nombre: data.author.nombre,
                    apellido: data.author.apellido,
                    edad: Number(data.author.edad),
                    alias: data.author.alias,
                    avatar: data.author.avatar,
                    },
                text: data.text ,
            }
           const res=  await menssagesModel.create(dataCompleta)
            return res
        }catch(err){
            throw new Error(err)
        }  
     }
 }
 const menssageController = new mensajeController()
 export default menssageController