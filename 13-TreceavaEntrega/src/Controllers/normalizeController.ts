import {denormalize, normalize, schema} from 'normalizr';
import mensajeController from './mensajesController';

const author = new schema.Entity('authors',{})
const message = new schema.Entity('menssages', {author})
const SchemaFin = [message]

export const getAllNorm =async()=>{
    const mensajes:any = await mensajeController.list()
    return normalize(mensajes,SchemaFin)
}
export const getAllDenorm = async()=>{
    const mensajesNormalize = await getAllNorm()
    return denormalize(mensajesNormalize.result, SchemaFin, mensajesNormalize.entities)
}