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
Object.defineProperty(exports, "__esModule", { value: true });
var db_products_1 = require("../db/db.products");
var productsController = /** @class */ (function () {
    function productsController() {
    }
    productsController.prototype.newProduct = function (data) {
        var nuevoProducto = __assign({ id: data.length !== 0 ? data[data.length - 1].id + 1 : 1 }, data);
        // data.push(nuevoProducto)
        db_products_1.createProduct(nuevoProducto);
        return nuevoProducto;
    };
    return productsController;
}());
exports.default = new productsController;
