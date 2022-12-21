"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.listProducts = void 0;
var mariaDb_1 = __importDefault(require("./mariaDb"));
var listProducts = function (id) {
    if (id === void 0) { id = {}; }
    return mariaDb_1.default('products')
        .where(id)
        .select('*');
};
exports.listProducts = listProducts;
var createProduct = function (obj) {
    return mariaDb_1.default('products').insert(obj);
};
exports.createProduct = createProduct;
