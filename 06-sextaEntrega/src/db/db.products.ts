import db from "./mariaDb";
import { producto } from "../../Public/types";

export const listProducts = db('products')

export const createProduct = (obj:producto)=>{
    return db('products').insert(obj)
}

