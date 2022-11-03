import express from "express"
import rutaPrincipal from "../routes/index"

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
app.use("/api", rutaPrincipal)


export default app