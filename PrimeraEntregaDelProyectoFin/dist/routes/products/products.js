"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var rutaProductos = express_1.Router();
rutaProductos.get("/", function (req, res) {
    res.json({
        culo: "holaa"
    });
});
exports.default = rutaProductos;
