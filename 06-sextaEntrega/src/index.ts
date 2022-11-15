const server = require('./services/server')
const initWsServer = require("./services/sockets")

const port = 8080
const init= async ()=>{
    initWsServer(server)
    server.listen(port, ()=>{
        console.log(`Server is up in ${port}`)
    })
}
init()
