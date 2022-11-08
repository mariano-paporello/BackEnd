"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProductsClass_1 = __importDefault(require("../../controller/ProductsClass"));
var products_1 = __importDefault(require("../../temp/products"));
var config_1 = __importDefault(require("../../config"));
var rutaProductos = express_1.Router();
var productClass = new ProductsClass_1.default();
rutaProductos.get("/", function (req, res) {
    res.json(productClass.getAll(products_1.default));
});
rutaProductos.get("/:id", function (req, res) {
    if (config_1.default.administrador) {
        if (req.params.id) {
            var productoEncontrado = productClass.getAll(products_1.default, Number(req.params.id));
            return res.json(productoEncontrado);
        }
        else {
            throw new Error('No hay parametros :(');
        }
    }
    else {
        return res.status(401).json({
            error: "No estas autorizado"
        });
    }
});
rutaProductos.post("/", function (req, res) {
    if (config_1.default.administrador) {
        var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail, descripcion = _a.descripcion, stock = _a.stock;
        if (!title || !price || !thumbnail || !descripcion || !stock) {
            throw new Error("Campos Incompletos");
        }
        else {
            var newProduct = productClass.postNewProduct(products_1.default, title, price, thumbnail, descripcion, stock);
            res.json(newProduct);
        }
    }
    else {
        return res.status(401).json({
            error: "No estas autorizado"
        });
    }
});
rutaProductos.put("/:id", function (req, res) {
    if (config_1.default.administrador) {
        var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail, descripcion = _a.descripcion, stock = _a.stock;
        if (!title || !price || !thumbnail || !descripcion || !stock) {
            throw new Error("Campos Incompletos");
        }
        else {
            var productoActualizado = productClass.putProduct(products_1.default, title, price, thumbnail, descripcion, stock, Number(req.params.id));
            res.json(productoActualizado);
        }
    }
    else {
        return res.status(401).json({
            error: "No estas autorizado"
        });
    }
});
rutaProductos.delete('/:id', function (req, res) {
    if (config_1.default.administrador) {
        var idBuscado = Number(req.params.id);
        var productoBorrado = productClass.deleteProduct(products_1.default, idBuscado);
        res.json(productoBorrado);
    }
    else {
        return res.status(401).json({
            error: "No estas autorizado"
        });
    }
});
exports.default = rutaProductos;
