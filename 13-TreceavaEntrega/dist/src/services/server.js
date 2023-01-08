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
exports.logged = void 0;
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var express_handlebars_1 = require("express-handlebars");
var index_1 = __importDefault(require("../routes/index"));
var path_1 = __importDefault(require("path"));
var products_1 = __importDefault(require("../models/products"));
var messages_1 = __importDefault(require("../models/messages"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_session_1 = __importDefault(require("express-session"));
var os_1 = __importDefault(require("os"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var index_2 = __importDefault(require("../config/index"));
var passport_1 = __importDefault(require("passport"));
var auth_1 = require("./auth");
var minimist_1 = __importDefault(require("minimist"));
var args = (0, minimist_1.default)(process.argv);
var app = (0, express_1.default)();
app.use("/api", index_1.default);
// Session Part:
exports.logged = {
    islogged: false,
    isDestroyed: false,
    nombre: '',
    contraseña: false
};
var unSegundo = 1000;
var unMinuto = unSegundo * 60;
var unaHora = unMinuto * 60;
var unDia = unaHora * 24;
var storeOptions = {
    store: connect_mongo_1.default.create({
        mongoUrl: index_2.default.MONGO_ATLAS_URL,
        crypto: {
            secret: index_2.default.CRYPTO_SECRET
        }
    }),
    secret: index_2.default.SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: unMinuto
    }
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.static('public'));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)(storeOptions));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use('login', auth_1.loginFunc);
passport_1.default.use('signup', auth_1.signUpFunc);
// HBS PART:
var viewPath = path_1.default.resolve(__dirname, '../../views');
var layoutsPath = "".concat(viewPath, "/layouts");
var partialsPath = "".concat(viewPath, "/partials");
var defaultLayoutPath = "".concat(layoutsPath, "/index.hbs");
app.set('view engine', 'hbs');
app.set('views', viewPath);
app.engine('hbs', (0, express_handlebars_1.engine)({
    layoutsDir: layoutsPath,
    extname: 'hbs',
    partialsDir: partialsPath,
    defaultLayout: defaultLayoutPath
}));
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (req.session.nombre && exports.logged.islogged && !exports.logged.isDestroyed) {
            +products_1.default.find({}).then(function (productos) {
                messages_1.default.find({}).then(function (mensajes) {
                    res.render('main', {
                        productos: productos.map(function (productoIndv) { return productoIndv.toJSON(); }),
                        mensajes: mensajes.map(function (mensajeIndv) { return mensajeIndv.toJSON(); }),
                        user: req.session.nombre
                    });
                });
            });
        }
        else {
            res.redirect("/login");
        }
        return [2 /*return*/];
    });
}); });
app.post('/login', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        passport_1.default.authenticate('login', {}, function (err, user, info) { return __awaiter(void 0, void 0, void 0, function () {
            var data, token;
            return __generator(this, function (_a) {
                data = req.body;
                if (user.username && user.password) {
                    token = (0, auth_1.generateAuthToken)(user);
                    exports.logged.nombre = user.username;
                    exports.logged.contraseña = true;
                    exports.logged.islogged = true;
                    res.header('x-login-token', token).redirect("/");
                }
                else {
                    res.status(400).json({
                        Error: "Datos ingresados no validos o nulos."
                    });
                }
                return [2 /*return*/];
            });
        }); })(req, res, next);
        return [2 /*return*/];
    });
}); });
app.post('/register', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        passport_1.default.authenticate('signup', {}, function (err, user, info) {
            var _a = req.body, username = _a.username, password = _a.password;
            if (!username || !password) {
                res.status(400).json({
                    Error: "Datos ingresados no validos o nulos"
                });
            }
            var token = (0, auth_1.generateAuthToken)(user);
            exports.logged.nombre = username;
            exports.logged.contraseña = true;
            exports.logged.islogged = true;
            res.header('x-login-token', token).redirect("/");
        })(req, res, next);
        return [2 /*return*/];
    });
}); });
app.get('/login', function (req, res) {
    exports.logged.isDestroyed = false;
    res.render("Login");
});
app.get('/register', function (req, res) {
    res.render("register");
});
app.get("/logout", function (req, res) {
    if (req.session.nombre) {
        res.render("Logout", {
            user: req.session.nombre
        });
        exports.logged.islogged = false;
        exports.logged.nombre = "";
        exports.logged.isDestroyed = true;
        setTimeout(function () {
            req.session.destroy(function (err) {
                console.error(err);
            });
        }, unMinuto);
    }
    else {
        res.redirect("/");
    }
});
app.get("/info", function (req, res) {
    console.log(process.version);
    res.json({
        "Directorio actual de trabajo": process.cwd(),
        "id ID Del proceso actual": process.pid,
        "Version de NodeJs corriendo": process.version,
        "Titulo del proceso": process.title,
        "Sistema Operativo": process.platform,
        "Uso de memoria": JSON.stringify(process.memoryUsage()),
        "Cantidad de procesadores": os_1.default.cpus().length,
        "port": args.port
    });
});
var HTTPServer = new http_1.default.Server(app);
module.exports = HTTPServer;
