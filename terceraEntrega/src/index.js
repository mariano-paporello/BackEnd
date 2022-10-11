import express from'express'
const app = express()
import path from"path"
import fs from "fs"
import Contenedor from './class/contenedor.js'

const txtPath = "./assets/productos.txt"
const port = 8080
const contenedorPrueba = new Contenedor(txtPath)
const server = app.listen(port, () => {
    console.log(`Servidor escuchando puerto ${port}`)
})

server.on("error", error => console.log(`error en el servidor ${error}`))


app.get("/", (request, response) => {
    const filePath = path.resolve(__dirname, './view/index.html');
    response.sendFile(filePath);
})

fs.readFile(txtPath, (err, data) => {
    if (err) {
        throw new Error(err);
    }
    const dataParsed =   JSON.parse(data)
    console.log(dataParsed.length)
    app.get('/productos', (req, res)=>{
        res.send(`Productos disponibles: ${dataParsed.map(element=>element.title)}`);
    });
    app.get('/productoRandom', (req, res)=>{
       const randomNumber = Math.floor(Math.random() * (dataParsed.length));
        res.send(`Producto Random: ${dataParsed[randomNumber].title}`)
    })
})


// contenedorPrueba.save({title:"Mochila de Boca",price:400,thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"})
contenedorPrueba.deleteById(6)
contenedorPrueba.getAll()