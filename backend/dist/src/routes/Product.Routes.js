"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_Controller_1 = __importDefault(require("../controllers/Product.Controller"));
const productRouter = (0, express_1.Router)();
const productController = new Product_Controller_1.default();
productRouter
    .post('/', productController.create)
    .put('/', productController.update);
exports.default = productRouter;
