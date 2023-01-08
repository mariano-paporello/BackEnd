const server = require('./services/server')
const initWsServer = require("./services/sockets")
import initMongo from "./db/databaseMongoose"
import minimist from "minimist"
import os from "os"
import cluster from "cluster"
import config from "./config"

const args = minimist(process.argv)
console.log('🍔🍔🍔 arguments: ', args)
const port = args.port || config.PORT
const numCPUs = os.cpus().length
console.log('🍔🍔🍔 CPUs: ', numCPUs)

initWsServer(server);

if (args.modo === "CLUSTER" && cluster.isPrimary ) {
    console.log("💡💡💡 TIPO CLUSTER")
    for (let i=0;i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code) => {
        console.log(`Worker ${worker.process.pid} with code ${code}`);
        cluster.fork();
    })
}else{
        server.listen(port, () => {
            console.log(`Server is up in ${port}`);
        });
}

server.on('error', (err) => {
    console.log('SERVER ERROR: ', err);
  });
  
  // Log on exit
  process.on('exit', (code) => {
    console.log(`Exit ==> El proceso termino con codigo ${code}\n\n`);
  });

initMongo();
