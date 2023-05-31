"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_Routes_1 = __importDefault(require("./routes/User.Routes"));
const Login_Routes_1 = __importDefault(require("./routes/Login.Routes"));
const Marketing_Routes_1 = __importDefault(require("./routes/Marketing.Routes"));
const Product_Routes_1 = __importDefault(require("./routes/Product.Routes"));
const Feirinha_Routes_1 = __importDefault(require("./routes/Feirinha.Routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', User_Routes_1.default);
app.use('/login', Login_Routes_1.default);
app.use('/market', Marketing_Routes_1.default);
app.use('/product', Product_Routes_1.default);
app.use('/feirinha', Feirinha_Routes_1.default);
exports.default = app;
