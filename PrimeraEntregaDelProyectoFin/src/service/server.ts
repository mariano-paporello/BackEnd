import express, { Router } from "express"
import rutaPrincipal from "../routes/index"

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
app.use("/api", rutaPrincipal)
app.get("*", (req, res) =>{
    res.status(404).json({
        error: -2,
       descripcion: "Ruta y metodo GET no utilizado"
    });   
});
app.post("*", (req, res) =>{
    res.status(404).json({
        error: -2,
       descripcion: "Ruta y metodo POST no utilizado"
    });   
});
app.put("*", (req, res) =>{
    res.status(404).json({
        error: -2,
       descripcion: "Ruta y metodo PUT no utilizado"
    });   
});
app.delete("*", (req, res) =>{
    res.status(404).json({
        error: -2,
       descripcion: "Ruta y metodo DELETE no utilizado"
    });   
});



export default app