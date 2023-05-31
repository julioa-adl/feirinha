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
const Product_1 = __importDefault(require("../domains/Product"));
const Product_Model_1 = __importDefault(require("../models/Product.Model"));
class ProductService {
    constructor() {
        this.model = new Product_Model_1.default();
    }
    createProductDomain(product) {
        if (product) {
            return new Product_1.default(product);
        }
        return null;
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, code, category } = product;
            const existingProd = yield this.model.findOne({ code: code });
            if (existingProd)
                return { type: 409, message: 'Product alredy Register' };
            const newProduct = yield this.model.create({ name, category, code });
            return { type: null, message: `Product ${newProduct.name} successfuly registered` };
        });
    }
    update(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.update(id, obj);
        });
    }
}
exports.default = ProductService;
