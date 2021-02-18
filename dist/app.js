"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const database = require("./api/provider/database");
const logger = require("./api/provider/logging");
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
app.get("/", (req, res) => {
    return res.status(200).send("Server running");
});
// Log requests to console
app.use(morgan_1.default('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors_1.default());
console.log(routes_1.default);
app.use(routes_1.default);
app.use((err, req, res, next) => {
    // This check makes sure this is a JSON parsing issue, but it might be
    // coming from any middleware, not just body-parser:
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        res.status(400); // Bad request
    }
    next();
});
// database.connection();
database
    .connection()
    .then(() => {
    app.listen(config.server.port, config.server.host, () => {
        logger.info(`Server running on http://${config.server.host}:${config.server.port}`);
    });
})
    .catch((error) => {
    logger.error(error);
});
