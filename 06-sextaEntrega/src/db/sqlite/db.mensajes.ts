import db from "./sqlLite";
import { mensaje } from "../../../Public/types";

export const createTableSqLite3 =async () => {
    await db.schema.dropTableIfExists('mensajes');
    await db.schema.createTable('mensajes', table=>{
        table.increments('id').primary;
        table.string('mensajeGeneral').notNullable
    }).then(()=>{
        console.log('se creo la tabla mensajes')
    })
    
}

export const getmensajeSqLite3 = async(id: string)=>{
    return await db('mensajes').where("id",id)
}

export const getmensajesSqLite3 = async() =>{
    return await db('mensajes').select('*')
}

export const createMensajeSqLite3 = async (obj:mensaje)=>{
    return await db('mensajes').insert(obj)
}
