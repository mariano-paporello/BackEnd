const server = require('./services/server')
const initWsServer = require("./services/sockets")
import initMongo from "./db/databaseMongoose"
import minimist from "minimist"

const args= minimist(process.argv)

console.log(args)
const port = args.port || 8080
const init= async ()=>{
    await initWsServer(server)
    await initMongo()
    server.listen(port, ()=>{
        console.log(`Server is up in ${port}`)
    })
    
}
init()
