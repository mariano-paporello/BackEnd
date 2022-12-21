"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var testRoute_1 = __importDefault(require("./testRoute"));
var rutaPrincipal = express_1.Router();
rutaPrincipal.use('/productos-test', testRoute_1.default);
rutaPrincipal.get('/', function (req, res) {
    res.json({ msg: 'hola desde router' });
});
exports.default = rutaPrincipal;
