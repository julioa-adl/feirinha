"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AbstractODM_1 = __importDefault(require("./AbstractODM"));
class UserModel extends AbstractODM_1.default {
    constructor() {
        const schema = new mongoose_1.Schema({
            name: { type: String, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
        });
        super(schema, 'User');
    }
}
exports.default = UserModel;
