"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("../routes/index"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use("/api", index_1.default);
app.get("*", function (req, res) {
    res.status(404).json({
        error: -2,
        descripcion: "Ruta y metodo GET no utilizado"
    });
});
app.post("*", function (req, res) {
    res.status(404).json({
        error: -2,
        descripcion: "Ruta y metodo POST no utilizado"
    });
});
app.put("*", function (req, res) {
    res.status(404).json({
        error: -2,
        descripcion: "Ruta y metodo PUT no utilizado"
    });
});
app.delete("*", function (req, res) {
    res.status(404).json({
        error: -2,
        descripcion: "Ruta y metodo DELETE no utilizado"
    });
});
exports.default = app;
