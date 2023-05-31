"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AbstractODM_1 = __importDefault(require("./AbstractODM"));
class FeirinhaModel extends AbstractODM_1.default {
    constructor() {
        const schema = new mongoose_1.Schema({
            userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
            marketId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Market', required: true },
            listCart: [{ type: IListSchema, required: true }],
            date: { type: Date, required: true },
        });
        super(schema, 'Feirinha');
    }
}
exports.default = FeirinhaModel;
const IListSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: String, required: true },
    price: { type: String, required: true },
});
