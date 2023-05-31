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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_Service_1 = __importDefault(require("../services/Product.Service"));
class ProductController {
    constructor() {
        this.service = new Product_Service_1.default();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.body;
                const { type, message } = yield this.service.create(product);
                if (type) {
                    return res.status(type).json({ message });
                }
                return res.status(201).json({ message });
            }
            catch (err) {
                return res.status(500).json({
                    message: 'erro ao registrar novo produto',
                    error: String(err),
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { id } = _a, obj = __rest(_a, ["id"]);
                const result = yield this.service.update(id, obj);
                return res.status(200).json({ message: `${result === null || result === void 0 ? void 0 : result.name} atualizado` });
            }
            catch (err) {
                return res.status(500).json({
                    message: 'erro ao atualizar produto',
                    error: String(err),
                });
            }
        });
    }
}
exports.default = ProductController;
