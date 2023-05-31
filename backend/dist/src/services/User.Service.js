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
const User_1 = __importDefault(require("../domains/User"));
const User_Model_1 = __importDefault(require("../models/User.Model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtFunctions_1 = require("../auth/jwtFunctions");
class UserService {
    constructor() {
        this.model = new User_Model_1.default();
    }
    createUserDomain(user) {
        if (user) {
            return new User_1.default(user);
        }
        return null;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = user;
            const existingUser = yield this.model.findOne({ email: email });
            if (existingUser)
                return { type: 409, payload: { token: null } };
            const saltRounds = 10;
            const validPwd = yield bcrypt_1.default.hash(password, saltRounds);
            const newUser = yield this.model.create({ name, email, password: validPwd });
            const { password: _password } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
            const token = (0, jwtFunctions_1.createToken)(userWithoutPassword);
            return { type: null, payload: { token } };
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = user;
            const existingUser = yield this.model.findOne({ email: email });
            if (!existingUser)
                return { type: 409, payload: { token: null } };
            const match = yield bcrypt_1.default.compare(password, existingUser.password);
            if (match) {
                const { password: _password } = existingUser, userWithoutPassword = __rest(existingUser, ["password"]);
                const token = (0, jwtFunctions_1.createToken)(userWithoutPassword);
                return { type: null, payload: { token } };
            }
            else {
                return { type: 404, payload: { token: null } };
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.delete(id);
        });
    }
}
exports.default = UserService;
