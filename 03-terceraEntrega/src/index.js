import express from 'express'
import path from "path"
import contenedor from './class/contenedor.js'
import {
    fileURLToPath
} from 'url';

const dataParsed = await contenedor.getAll()
const app = express()
const port = 8080
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = app.listen(port, () => {
    console.log(`Servidor escuchando puerto ${port}`)
})

server.on("error", error => console.log(`error en el servidor ${error}`))


app.get("/", (request, response) => {
    const myfilePath = path.resolve(__dirname, '../view/index.html', );
    response.sendFile(myfilePath);

})
app.get('/productos', async (req, res) => {
    res.send(`Productos disponibles: ${ dataParsed.map(element=>element.title)}`);
});

app.get('/productoRandom', async (req, res) => {
    const randomNumber = Math.floor(Math.random() * (dataParsed.length));
    res.send(`Producto Random: ${dataParsed[randomNumber].title}`)
})
