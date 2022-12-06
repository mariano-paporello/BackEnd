const server = require('./services/server')
const initWsServer = require("./services/sockets")
import initMongo from "./db/databaseMongoose"

const port = 8080
const init= async ()=>{
    initWsServer(server)
    await initMongo()
    server.listen(port, ()=>{
        console.log(`Server is up in ${port}`)
    })
}
init()
