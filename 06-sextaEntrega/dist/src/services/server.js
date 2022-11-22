"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var morgan_1 = __importDefault(require("morgan"));
var express_handlebars_1 = require("express-handlebars");
var path_1 = __importDefault(require("path"));
var products_1 = __importDefault(require("../temp/products"));
var mensajes_1 = __importDefault(require("../temp/mensajes"));
var app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
console.log(products_1.default);
// HBS PART:
var viewPath = path_1.default.resolve(__dirname, '../../views');
var layoutsPath = viewPath + "/layouts";
var partialsPath = viewPath + "/partials";
var defaultLayoutPath = layoutsPath + "/index.hbs";
app.set('view engine', 'hbs');
app.set('views', viewPath);
app.engine('hbs', express_handlebars_1.engine({
    layoutsDir: layoutsPath,
    extname: 'hbs',
    partialsDir: partialsPath,
    defaultLayout: defaultLayoutPath
}));
app.get('/', function (req, res) {
    res.render('main', {
        productos: products_1.default,
        mensajes: mensajes_1.default
    });
});
var HTTPServer = new http_1.default.Server(app);
module.exports = HTTPServer;
