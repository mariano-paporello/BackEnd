import server from "./service/server"

const port = 8080

server.listen(port,()=>{
    console.log("Server is Running")
})