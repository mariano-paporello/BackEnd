"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generar5productos = void 0;
var faker_1 = require("@faker-js/faker");
faker_1.faker.locale = 'en';
var generar5productos = function (req, res) {
    var arrayObjects = [];
    for (var i = 0; i < 5; i++) {
        arrayObjects.push({
            nombre: faker_1.faker.commerce.product(),
            precio: faker_1.faker.commerce.price(),
            imagen: faker_1.faker.image.technics()
        });
    }
    res.json({
        data: arrayObjects
    });
};
exports.generar5productos = generar5productos;
