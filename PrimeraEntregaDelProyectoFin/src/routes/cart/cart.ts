import { Router, Request, Response } from "express";

const rutaCart =  Router()

rutaCart.get("/", (req:Request, res: Response)=>{
    res.json({
        msg:"holaa desde carrito"
    })
})

export default rutaCart