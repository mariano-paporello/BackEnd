"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var testController_1 = require("../Controllers/testController/testController");
var rutaTest = express_1.Router();
rutaTest.get("/", testController_1.generar5productos);
exports.default = rutaTest;
