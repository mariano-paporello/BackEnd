import express, {Response, Request, Router}  from "express"

const rutaProductos =  Router()

rutaProductos.get("/", (req:Request, res: Response)=>{
    res.json({
        msg:"holaa desde productos"
    })
})

export default rutaProductos