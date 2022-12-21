"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Sync object
var config = {
    verbose: true,
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    moduleDirectories: ['<rootDir>/src', 'node_modules']
    // moduleNameMapper: {
    //   "^@root/(.)$": ["/$1"],
    //   "^@configs/(.*)$": ["src/configs/$1"],
    //   "^@components/(.*)$": ["src/components/$1"],
    //   "^@entities/(.*)$": ["src/entities/$1"],
    //   "^@services/(.*)$": ["src/services/$1"],
    //   "^@models/(.*)$": ["src/models/$1"],
    //   "^@libs/(.*)$": ["src/libs/$1"],
    //   "^@icons/(.*)$": ["src/icons/$1"],
    //   "^@styles/(.*)$": ["styles/$1"],
    // }
};
exports.default = config;
