"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var carritoUsuario_1 = __importDefault(require("../temp/carritoUsuario"));
var carritoBuscado = function (id) {
    var index = carritoUsuario_1.default.findIndex(function (element) { return element.id === id; });
    return carritoUsuario_1.default[index];
};
var CartClass = /** @class */ (function () {
    function CartClass() {
    }
    CartClass.prototype.crearUnCart = function () {
        var cart = {
            id: Math.floor(Math.random() * 100),
            timestamp: moment_1.default().format('llll'),
            productos: []
        };
        return cart;
    };
    CartClass.prototype.eliminarCart = function (id) {
        var index = carritoUsuario_1.default.findIndex(function (element) { return element.id === id; });
        return index;
    };
    CartClass.prototype.listarProductosDeCarrito = function (id) {
        var carritoEncontrado = carritoBuscado(id);
        if (carritoEncontrado) {
            return carritoEncontrado.productos;
        }
        else {
            return false;
        }
    };
    CartClass.prototype.añadirProductoACarrito = function (id, producto) {
        var carritoEncontrado = carritoBuscado(id);
        if (!carritoEncontrado) {
            return false;
        }
        else {
            var productosDelCarrito = carritoEncontrado.productos;
            productosDelCarrito.push(producto);
            return carritoEncontrado;
        }
    };
    CartClass.prototype.eliminarProductoDeUnCarrito = function (id, id_prod) {
        var carritoEncontrado = carritoBuscado(id);
        console.log(carritoEncontrado);
        if (!carritoEncontrado) {
            return false;
        }
        else {
            var productoIndex = carritoEncontrado.productos.findIndex(function (element) { return element.id === id_prod; });
            console.log(productoIndex);
            if (productoIndex === -1) {
                return false;
            }
            else {
                carritoEncontrado.productos.splice(productoIndex, 1);
                return carritoEncontrado;
            }
        }
    };
    return CartClass;
}());
exports.default = CartClass;
