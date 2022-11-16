import db from "./mariaDb";
import { producto } from "../../../Public/types";

export const createTableMariaDB =async () => {
    await db.schema.dropTableIfExists('products');
    await db.schema.createTable('products', table=>{
        table.integer('id').primary;
        table.string('title').notNullable;
        table.integer('price').notNullable;
        table.string('thumbnail').notNullable;
        
    })
}

export const getProductMariaDB = async(id: string)=>{
    return await db('products').where("id",id)
}

export const getProductsMariaDB = async()=>{
    return await db('products').select('*')
}

export const createProductMariaDB = async (obj:producto)=>{
    return await db('products').insert(obj)
}

