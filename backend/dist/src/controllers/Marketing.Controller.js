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
const Marketing_Service_1 = __importDefault(require("../services/Marketing.Service"));
class MarketingController {
    constructor() {
        this.service = new Marketing_Service_1.default();
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body;
                const { type, message } = yield this.service.create(name);
                if (type) {
                    return res.status(type).json({ message });
                }
                return res.status(201).json({ message });
            }
            catch (err) {
                return res.status(500).json({
                    message: 'erro ao registrar mercado',
                    error: String(err),
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const result = yield this.service.delete(id);
                return res.status(200).json({ message: `${result} excluido com sucesso` });
            }
            catch (err) {
                return res.status(500).json({
                    message: 'erro ao deletar mercado',
                    error: String(err),
                });
            }
        });
    }
}
exports.default = MarketingController;
