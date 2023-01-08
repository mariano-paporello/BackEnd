"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testController_1 = require("../Controllers/testController");
describe('conjunto de pruebas de creacion de productos', function () {
    it('deben de ser correctamente creadas y de tipo producto', function () {
        var lol = (0, testController_1.crear5Productos)();
        expect(lol.length).toBe(5);
    });
});
