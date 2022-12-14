"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var dbSqLite = knex_1.default({
    client: 'sqlite3',
    connection: {
        filename: './ecommerce.sqlite'
    },
    useNullAsDefault: true
});
exports.default = dbSqLite;
