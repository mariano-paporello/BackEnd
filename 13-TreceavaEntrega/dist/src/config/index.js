"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL || 'mongodb://localhost/CoderHouse',
    SECRET: process.env.SECRET || "none",
    CRYPTO_SECRET: process.env.CRYPTO_SECRET || "random",
    TOKEN_SECRET: process.env.TOKEN_SECRET || "secret"
};