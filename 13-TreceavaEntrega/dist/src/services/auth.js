"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpFunc = exports.loginFunc = exports.checkAuth = exports.generateAuthToken = void 0;
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = require("passport-local");
var index_1 = __importDefault(require("../config/index"));
var user_1 = require("../models/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// JWS PART
var generateAuthToken = function (user) {
    var payload = {
        usedId: user._id,
        username: user.username
    };
    var token = jsonwebtoken_1.default.sign(payload, index_1.default.TOKEN_SECRET, { expiresIn: '1m' });
    return token;
};
exports.generateAuthToken = generateAuthToken;
var checkAuth = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decode, user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.header['x-login-token'];
                if (!token) {
                    return [2 /*return*/, res.status(401).json({ msg: "NO AUTORIZADO" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                decode = jsonwebtoken_1.default.veryify(token, index_1.default.TOKEN_SECRET);
                console.log(decode);
                return [4 /*yield*/, user_1.usersModel.findById(decode.userId)];
            case 2:
                user = _a.sent();
                req.user = user;
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(401).json({ msg: ' NO AUTORIZADO' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.checkAuth = checkAuth;
// PASSPORT PART
var strategyOptions = {
    username: "username",
    password: "password",
    passReqToCallback: true,
};
var logIn = function (req, username, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("LOOOGEOOO");
                return [4 /*yield*/, user_1.usersModel.logIn(username, password)];
            case 1:
                user = _a.sent();
                if (user) {
                    req.session.nombre = user.username;
                    req.session.contraseña = user.password;
                    return [2 /*return*/, done(null, user)];
                }
                else {
                    return [2 /*return*/, done(null, false, { msg: "Usuario no encontrado" })];
                }
                return [2 /*return*/];
        }
    });
}); };
var signUp = function (req, username, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('SIGNUP!!');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.usersModel.singUp({ username: username, password: password })];
            case 2:
                user = _a.sent();
                req.session.nombre = user.username;
                req.session.contraseña = user.password;
                return [2 /*return*/, done(null, user)];
            case 3:
                err_2 = _a.sent();
                console.log('Hubo un error!');
                console.log(err_2);
                return [2 /*return*/, done(null, false, { mensaje: 'Error Inesperado', err: err_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginFunc = new passport_local_1.Strategy(strategyOptions, logIn);
exports.signUpFunc = new passport_local_1.Strategy(strategyOptions, signUp);
passport_1.default.serializeUser(function (user, done) {
    done(null, user._id);
});
passport_1.default.deserializeUser(function (userId, done) {
    console.log('Se Ejecuta el desserializeUser');
    user_1.usersModel.findById(userId).then(function (user) {
        return done(null, user);
    });
});
