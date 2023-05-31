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
const Marketing_Model_1 = __importDefault(require("../models/Marketing.Model"));
const Marketing_1 = __importDefault(require("../domains/Marketing"));
class MarketingService {
    constructor() {
        this.model = new Marketing_Model_1.default();
    }
    createMarketingDomain(marketing) {
        if (marketing) {
            return new Marketing_1.default(marketing);
        }
        return null;
    }
    create(marketing) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = marketing;
            const existingMarketing = yield this.model.findOne({ name: name });
            if (existingMarketing)
                return { type: 409, message: 'Marketing alredy register' };
            const newMarketing = yield this.model.create({ name });
            return { type: null, message: `Marketing ${newMarketing.name} successfully registered` };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.delete(id);
        });
    }
}
exports.default = MarketingService;
