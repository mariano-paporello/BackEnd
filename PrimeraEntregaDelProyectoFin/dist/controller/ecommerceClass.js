"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var eccomerceMecanism = /** @class */ (function () {
    function eccomerceMecanism() {
    }
    eccomerceMecanism.prototype.getAll = function (products, idbody) {
        if (!idbody) {
            return products;
        }
        else {
            var productoEncontrado = products.filter(function (element) { return element.id == idbody; });
            if (productoEncontrado.length === 0) {
                throw new Error("No hay producto con ese el id: " + idbody);
            }
            else {
                return productoEncontrado[0];
            }
        }
    };
    eccomerceMecanism.prototype.postNewProduct = function (products, title, price, thumbnail, descripcion, stock, admin) {
        var nuevoProducto = {
            id: products.length >= 1 ? products[products.length - 1].id + 1 : 1,
            title: title,
            timestamp: moment_1.default().format('llll'),
            descripcion: descripcion,
            price: price,
            thumbnail: thumbnail,
            stock: stock
        };
        products.push(nuevoProducto);
        return nuevoProducto;
    };
    eccomerceMecanism.prototype.putProduct = function (products, title, price, thumbnail, descripcion, stock, admin, idbody) {
        var index = products.findIndex(function (element) { return element.id == idbody; });
        var productoActualizado = {
            id: products[index].id,
            title: title,
            timestamp: moment_1.default().format('llll'),
            descripcion: descripcion,
            price: price,
            thumbnail: thumbnail,
            stock: stock
        };
        products.splice(index, 1, productoActualizado);
        return productoActualizado;
    };
    eccomerceMecanism.prototype.deleteProduct = function (products, admin, idbody) {
        var index = products.findIndex(function (element) { return element.id == idbody; });
        if (index === -1) {
            throw new Error("Producto con el id " + idbody + ", no existe");
        }
        else {
            var productoEliminado = products.splice(index, 1);
            return productoEliminado;
        }
    };
    return eccomerceMecanism;
}());
exports.default = eccomerceMecanism;
