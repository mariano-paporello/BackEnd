const server = require('./services/server')
const initWsServer = require("./services/sockets")
import initMongo from "./db/databaseMongoose"

const port = 8080
const init= async ()=>{
    await initWsServer(server)
    console.log(server)
    await initMongo()
    server.listen(port, ()=>{
        console.log(`Server is up in ${port}`)
    })
    
}
init()
