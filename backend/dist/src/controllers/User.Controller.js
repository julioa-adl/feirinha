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
const User_Service_1 = __importDefault(require("../services/User.Service"));
class UserController {
    constructor() {
        this.service = new User_Service_1.default();
        this.create = this.create.bind(this);
        this.login = this.login.bind(this);
        this.delete = this.delete.bind(this);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const { type, payload: { token } } = yield this.service.create(user);
                if (type) {
                    return res.status(409).json({ message: 'User already registered' });
                }
                return res.status(201).json({ token });
            }
            catch (err) {
                return res.status(500).json({
                    message: 'Erro ao criar usuário no banco',
                    error: String(err),
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const { type, payload: { token } } = yield this.service.login(user);
                if (type === 409) {
                    return res.status(409).json({ message: 'User does not exist' });
                }
                if (type === 404) {
                    return res.status(409).json({ message: 'Incorrect User or Password' });
                }
                return res.status(200).json({ token });
            }
            catch (err) {
                return res.status(500).json({
                    message: 'Erro ao fazer solicitação ao banco',
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
                if (result)
                    return res.status(200).json({
                        message: `usuário ${result.name} excluido com sucesso`
                    });
            }
            catch (err) {
                return res.status(500).json({
                    message: 'erro ao deletar usuário',
                    error: String(err),
                });
            }
        });
    }
}
exports.default = UserController;
