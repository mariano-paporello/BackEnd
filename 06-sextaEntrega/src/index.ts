const server = require('./service/server')
const initWsServer = require("./service/sockets")

const port = 8080
const init= async ()=>{
    initWsServer(server)
    server.listen(port, ()=>{
        console.log(`Server is up in ${port}`)
    })
}
init()
