"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var io = require('socket.io');
var moment_1 = __importDefault(require("moment"));
var products_1 = __importDefault(require("../temp/products"));
var users_1 = __importDefault(require("../temp/users"));
var mensajes_1 = __importDefault(require("../temp/mensajes"));
var initWsServer = function (server) {
    var SocketServer = io(server);
    SocketServer.on('connection', function (socket) {
        socket.emit('bienvenidaAUsuario', 'Bienvenido Nuevo Usuario');
        socket.emit('bienvenidaAUsuario', {
            Bienvenida: 'hola'
        });
        socket.on("enviarNuevoProducto", function (data) {
            // RECIBE NUEVO PRODUCTO Y LO ENVIA A DB
            var nuevoProducto = __assign({ id: products_1.default.length !== 0 ? products_1.default[products_1.default.length - 1].id + 1 : 1 }, data);
            products_1.default.push(nuevoProducto);
            SocketServer.emit("productosArray", nuevoProducto);
        });
        socket.on('enviarNuevoUser', function (data) {
            var nuevoUser = __assign({ id: socket.client.id }, data);
            users_1.default.push(nuevoUser);
            socket.emit("UsuarioConfirmadoYGuardado", nuevoUser);
        });
        socket.on('enviarMensaje', function (data) {
            var dataCompleta = {
                mensajeGeneral: data.nombre + " " + data.email + ": " + data.mensajeGeneral + "  [" + moment_1.default().format('h:mmA') + "(" + moment_1.default().format('L') + ")]",
            };
            mensajes_1.default.push(dataCompleta);
            SocketServer.emit('imprimirMensaje', dataCompleta);
        });
    });
    return SocketServer;
};
module.exports = initWsServer;
