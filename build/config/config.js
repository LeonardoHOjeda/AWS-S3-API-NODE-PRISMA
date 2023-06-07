"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '8000',
    AWS: {
        BUCKET_NAME: process.env.AWS_BUCKET_NAME,
        PUBLIC_KEY: process.env.AWS_PUBLIC_KEY,
        SECRET_KEY: process.env.AWS_SECRET_KEY,
        BUCKET_REGION: process.env.AWS_BUCKET_REGION
    }
};
//# sourceMappingURL=config.js.map