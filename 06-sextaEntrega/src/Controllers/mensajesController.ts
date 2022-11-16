import { mensaje } from "../../Public/types"
import { createMensajeSqLite3, getmensajesSqLite3 } from "../db/sqlite/db.mensajes"
import moment from "moment"

class mensajeController{

    async list(){
     try{
         const getAll = await getmensajesSqLite3()
         return getAll
     }catch(err){
         return console.log({
             Error:true,
             theError:err})
     }}
 
 
    async newProduct(data){
        try{
            const dataCompleta: mensaje = {
                mensajeGeneral: `${data.nombre} ${data.email}: ${data.mensajeGeneral}  [${moment().format('h:mmA')}(${moment().format('L')})]`,
            }
            createMensajeSqLite3(dataCompleta)
            return dataCompleta
        }catch(err){
            throw new Error(err)
        }
         
 
         
     }
 }
 
 export default  mensajeController