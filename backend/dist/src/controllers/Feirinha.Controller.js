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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Feirinha_Service_1 = __importDefault(require("../services/Feirinha.Service"));
class FeirinhaController {
    constructor() {
        this.service = new Feirinha_Service_1.default();
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feirinha = req.body;
                const { type, message } = yield this.service.create(feirinha);
                if (type) {
                    return res.status(type).json({ message });
                }
                return res.status(201).json({ message });
            }
            catch (err) {
                return res.status(500).json({
                    message: 'erro ao registrar feirinha',
                    error: String(err),
                });
            }
        });
    }
    getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, message } = yield this.service.getAll();
                if (!type)
                    return res.status(200).json(message);
                return res.status(type).json({ message });
            }
            catch (err) {
                return res.status(500).json({
                    message: 'erro ao buscar no banco',
                    error: String(err),
                });
            }
        });
    }
}
exports.default = FeirinhaController;
