"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Marketing_Controller_1 = __importDefault(require("../controllers/Marketing.Controller"));
const marketingRouter = (0, express_1.Router)();
const marketingController = new Marketing_Controller_1.default();
marketingRouter
    .post('/', marketingController.create)
    .delete('/', marketingController.delete);
exports.default = marketingRouter;
