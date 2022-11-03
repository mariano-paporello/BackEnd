"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var products_1 = __importDefault(require("./products/products"));
var rutaPrincipal = express_1.Router();
rutaPrincipal.use('/productos', products_1.default);
exports.default = rutaPrincipal;
