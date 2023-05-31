"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateUserBody = (req, res, next) => {
    if (!req.body.name)
        return res.status(400).json({ message: 'Body needs a name key' });
    if (!req.body.email)
        return res.status(400).json({ message: 'Body needs an email key' });
    if (!req.body.password)
        return res.status(400).json({ message: 'Body needs a password' });
    next();
};
exports.default = validateUserBody;
