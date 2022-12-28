"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var productoColl = 'productos';
var productoSchema = new mongoose_1.default.Schema({
    title: { type: String, require: true, max: 100 },
    price: { type: Number, require: true },
    thumbnail: { type: String, require: true, max: 100 },
}, { timestamps: true });
var ProductoModel = mongoose_1.default.model(productoColl, productoSchema);
exports.default = ProductoModel;
