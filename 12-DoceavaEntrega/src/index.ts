const server = require('./services/server')
const initWsServer = require("./services/sockets")
import initMongo from "./db/databaseMongoose"
import { logged } from "./services/server"

const port = 8080
const init= async ()=>{
    await initWsServer(server, logged)
    await initMongo()
    server.listen(port, ()=>{
        console.log(`Server is up in ${port}`)
    })
    
}
init()
