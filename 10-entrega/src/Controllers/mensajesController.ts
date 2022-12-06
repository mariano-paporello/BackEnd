import { mensaje } from "../../Public/types"
import menssagesMetodos from "../models/messages"
import moment from "moment"

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
 
 
    async newProduct(data){
        try{
            const dataCompleta = {
                author:{
                    nombre: data.nombre,
                    apellido: data.apellido,
                    edad: data.edad,
                    alias: data.alias,
                    avatar: data.avatar,
                    },
                text: data.mensajeGeneral ,
            }
            await menssagesMetodos.create(dataCompleta)
            return dataCompleta
        }catch(err){
            throw new Error(err)
        }  
     }
 }
 
 export default  mensajeController