const server = require('./services/server')

const port = 8080
try{
    server.listen(port, ()=>{
        console.log(`SERVER OK, ESCUCHANDO EN EL PUERTO ${port}`)
    })
}catch(err){
    throw new Error(err)
}

