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
        return res.status(400).json({
            message: 'Carrito Not Found'
        });
    }
    else {
        var id = Number(req.params.id);
        var index = carritoHerramientas.eliminarCart(id);
        if (index !== -1) {
            var carritoEliminado = carritoUsuario_1.default.splice(index, 1);
            if (carritoEliminado) {
                res.json({
                    Borrado: "Se a borrado el carrito con id: " + id
                });
            }
            else {
                return res.status(400).json({
                    message: 'Product Not Found to Delete'
                });
            }
        }
        else {
            return res.status(400).json({
                message: 'Id Invalid'
            });
        }
    }
});
rutaCart.get("/:id/productos", function (req, res) {
    if (carritoUsuario_1.default.length === 0) {
        return res.status(400).json({
            message: 'Cart Not Found'
        });
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
            return res.status(400).json({
                message: 'Cart Id Not Found'
            });
        }
    }
});
rutaCart.post("/:id/productos", function (req, res) {
    if (carritoUsuario_1.default.length === 0) {
        return res.status(400).json({
            message: 'Cart Not Found'
        });
    }
    else {
        var id = Number(req.params.id);
        var id_prod_1 = req.body.id_prod;
        var productoEncontrado = products_1.default.filter(function (element) { return element.id === id_prod_1; });
        if (productoEncontrado[0]) {
            var carritoActualizado = carritoHerramientas.añadirProductoACarrito(id, productoEncontrado[0]);
            if (carritoActualizado) {
                res.json({
                    carritoActualizado: carritoActualizado
                });
            }
            else {
                return res.status(400).json({
                    message: 'Cart Id Not Found'
                });
            }
        }
        else {
            return res.status(400).json({
                message: 'Product Not Found to Read'
            });
        }
    }
});
rutaCart.delete("/:id/productos/:id_prod", function (req, res) {
    var id = Number(req.params.id);
    var id_productos = Number(req.params.id_prod);
    var carritoActualizado = carritoHerramientas.eliminarProductoDeUnCarrito(id, id_productos);
    if (carritoActualizado) {
        res.json({
            carritoActualizado: carritoActualizado
        });
    }
    else {
        return res.status(400).json({
            message: 'Product or Cart Not Found To Read'
        });
    }
});
exports.default = rutaCart;
