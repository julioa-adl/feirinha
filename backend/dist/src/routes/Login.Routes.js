"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Controller_1 = __importDefault(require("../controllers/User.Controller"));
const loginRouter = (0, express_1.Router)();
const userController = new User_Controller_1.default();
loginRouter
    .post('/', userController.login);
exports.default = loginRouter;
