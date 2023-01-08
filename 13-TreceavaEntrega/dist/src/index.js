"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server = require('./services/server');
var initWsServer = require("./services/sockets");
var databaseMongoose_1 = __importDefault(require("./db/databaseMongoose"));
var minimist_1 = __importDefault(require("minimist"));
var os_1 = __importDefault(require("os"));
var cluster_1 = __importDefault(require("cluster"));
var config_1 = __importDefault(require("./config"));
var args = (0, minimist_1.default)(process.argv);
console.log('🍔🍔🍔 arguments: ', args);
var port = args.port || config_1.default.PORT;
var numCPUs = os_1.default.cpus().length;
console.log('🍔🍔🍔 CPUs: ', numCPUs);
initWsServer(server);
if (args.modo === "CLUSTER" && cluster_1.default.isPrimary) {
    console.log("💡💡💡 TIPO CLUSTER");
    for (var i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', function (worker, code) {
        console.log("Worker ".concat(worker.process.pid, " with code ").concat(code));
        cluster_1.default.fork();
    });
}
else {
    server.listen(port, function () {
        console.log("Server is up in ".concat(port));
    });
}
server.on('error', function (err) {
    console.log('SERVER ERROR: ', err);
});
// Log on exit
process.on('exit', function (code) {
    console.log("Exit ==> El proceso termino con codigo ".concat(code, "\n\n"));
});
(0, databaseMongoose_1.default)();
