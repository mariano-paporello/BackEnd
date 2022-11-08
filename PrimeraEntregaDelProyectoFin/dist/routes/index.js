"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var products_1 = __importDefault(require("./products/products"));
var cart_1 = __importDefault(require("./cart/cart"));
var rutaPrincipal = express_1.Router();
rutaPrincipal.use('/productos', products_1.default);
rutaPrincipal.use('/carrito', cart_1.default);
rutaPrincipal.get('/', function (req, res) {
    res.json({
        msg: "Bonjoir"
    });
});
exports.default = rutaPrincipal;
