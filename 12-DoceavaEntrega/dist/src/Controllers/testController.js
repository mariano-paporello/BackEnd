"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crear5Productos = void 0;
var faker_1 = require("@faker-js/faker");
var crear5Productos = function () {
    var respuesta = [];
    for (var i = 0; i < 5; i++) {
        respuesta.push({
            id: Math.floor(Math.random() * 40),
            title: faker_1.faker.commerce.product(),
            price: faker_1.faker.commerce.price(),
            thumbnail: faker_1.faker.image.image()
        });
    }
    return respuesta;
};
exports.crear5Productos = crear5Productos;
