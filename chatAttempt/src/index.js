const server = require('./service/server')

const puerto = 8080

server.listen(puerto, ()=>{
    console.log(`Server funcionando en el puerto: ${puerto}`)
})