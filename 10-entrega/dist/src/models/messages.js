"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var menssages = 'menssages';
var messagesSchema = new mongoose_1.default.Schema({
    author: {
        nombre: { type: String, require: true },
        apellido: { type: String, require: true, max: 100 },
        edad: { type: Number, require: true, max: 100 },
        alias: { type: String, default: true },
        avatar: { type: String, required: true },
    },
    text: { type: String, require: true }
}, { timestamps: true });
var menssagesModel = mongoose_1.default.model(menssages, messagesSchema);
exports.default = menssagesModel;
