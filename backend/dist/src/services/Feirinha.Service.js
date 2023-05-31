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
const Feirinha_1 = __importDefault(require("../domains/Feirinha"));
const Feirinha_Model_1 = __importDefault(require("../models/Feirinha.Model"));
class FeirinhaService {
    constructor() {
        this.model = new Feirinha_Model_1.default();
    }
    createFeirinhaDomain(feirinha) {
        if (feirinha) {
            return new Feirinha_1.default(feirinha);
        }
        return null;
    }
    create(feirinha) {
        return __awaiter(this, void 0, void 0, function* () {
            const register = yield this.model.create(feirinha);
            if (register)
                return { type: null, message: 'feirinha salva!' };
            return { type: 500, message: 'Erro ao cadastrar' };
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const search = yield this.model.findAll();
            if (!search)
                return { type: 404, message: 'nenhuma feinha encontrada' };
            return { type: null, message: search };
        });
    }
}
exports.default = FeirinhaService;
