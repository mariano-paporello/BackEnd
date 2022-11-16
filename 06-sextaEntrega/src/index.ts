const server = require('./services/server')
const initWsServer = require("./services/sockets")
import {createTableMariaDB} from './db/mariaDb/db.products'
import { createTableSqLite3 } from './db/sqlite/db.mensajes'

const port = 8080
const init= async ()=>{
    initWsServer(server)
    createTableMariaDB()
    createTableSqLite3()
    server.listen(port, ()=>{
        console.log(`Server is up in ${port}`)
    })
}
init()
