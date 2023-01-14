"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = __importDefault(require("winston"));
var createLogger = winston_1.default.createLogger, format = winston_1.default.format, transports = winston_1.default.transports;
var combine = format.combine, printf = format.printf, timestamp = format.timestamp, colorize = format.colorize;
exports.logger = createLogger({
    level: 'info',
    format: combine(timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
    }), colorize(), printf(function (info) { return "".concat(info.level, "|").concat([info.timestamp], "|").concat(info.message); })),
    transports: [
        new transports.Console({ level: 'info' }),
        new winston_1.default.transports.File({
            filename: './logs/error.log',
            level: 'error',
        }),
        new winston_1.default.transports.File({
            filename: './logs/warn.log',
            level: "warn"
        }),
    ],
});
