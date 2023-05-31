"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Controller_1 = __importDefault(require("../controllers/User.Controller"));
const User_Middleware_1 = __importDefault(require("../middlewares/User.Middleware"));
const userRouter = (0, express_1.Router)();
const userController = new User_Controller_1.default();
userRouter
    .post('/', User_Middleware_1.default, userController.create)
    .delete('/', userController.delete);
exports.default = userRouter;
