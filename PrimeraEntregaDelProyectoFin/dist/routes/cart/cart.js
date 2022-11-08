"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CartClass_1 = __importDefault(require("../../controller/CartClass"));
var carritoUsuario_1 = __importDefault(require("../../temp/carritoUsuario"));
var products_1 = __importDefault(require("../../temp/products"));
var rutaCart = express_1.Router();
var carritoHerramientas = new CartClass_1.default();
rutaCart.post("/", function (req, res) {
    var nuevoCarrito = carritoHerramientas.crearUnCart();
    carritoUsuario_1.default.push(nuevoCarrito);
    console.log(carritoUsuario_1.default);
    res.json({
        idCarrito: nuevoCarrito.id
    });
});
rutaCart.delete("/:id", function (req, res) {
    if (carritoUsuario_1.default.length === 0) {
        throw new Error("No hay carritos");
    }
    else {
        var id = Number(req.params.id);
        var carritoEliminado = carritoHerramientas.eliminarCart(id);
        if (carritoEliminado) {
            res.json({
                Borrado: "Se a borrado el carrito con id: " + id
            });
        }
        else {
            throw new Error("No se a borrado ningun producto");
        }
    }
});
rutaCart.get("/:id/productos", function (req, res) {
    if (carritoUsuario_1.default.length === 0) {
        throw new Error("No hay carritos");
    }
    else {
        var id = Number(req.params.id);
        var productosBuscados = carritoHerramientas.listarProductosDeCarrito(id);
        if (productosBuscados) {
            res.json({
                productos: productosBuscados
            });
        }
        else {
            throw new Error("No se a borrado ningun producto");
        }
    }
});
rutaCart.post("/:id/productos", function (req, res) {
    if (carritoUsuario_1.default.length === 0) {
        throw new Error("No hay carritos");
    }
    else {
        var id = Number(req.params.id);
        var id_prod_1 = req.body.id_prod;
        var productoEncontrado = products_1.default.filter(function (element) { return element.id === id_prod_1; });
        console.log(productoEncontrado);
        if (productoEncontrado) {
            var carritoActualizado = carritoHerramientas.añadirProductoACarrito(id, productoEncontrado[0]);
            res.json({
                carritoActualizado: carritoActualizado
            });
        }
        else {
            throw new Error("No existe un producto con ese id");
        }
    }
});
rutaCart.delete("/:id/productos/:id_prod", function (req, res) {
    var id = req.params.id;
    var id_productos = req.params.id_prod;
});
exports.default = rutaCart;
