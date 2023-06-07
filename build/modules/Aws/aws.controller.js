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
exports.subirRecurso = exports.S3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = __importDefault(require("../../config/config"));
const error_handler_1 = require("@middlewares/error_handler");
exports.S3 = new aws_sdk_1.default.S3({
    accessKeyId: config_1.default.AWS.ACCESS_KEY,
    secretAccessKey: config_1.default.AWS.SECRET_ACCESS_KEY,
    region: config_1.default.AWS.REGION
});
const subirRecurso = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { originalname } = req.file;
    try {
        // Genera la URL prefirmada
        const url = yield exports.S3.getSignedUrlPromise('getObject', {
            Bucket: config_1.default.AWS.BUCKET_NAME,
            Key: originalname,
            Expires: 3600 // Tiempo de expiración en segundos
        });
        // Guarda la URL prefirmada en tu base de datos
        // Envía la respuesta al cliente con la URL prefirmada
        res.status(201).json({
            message: 'Archivo subido',
            url
        });
    }
    catch (error) {
        // console.error('Error al generar la URL prefirmada:', error)
        throw new error_handler_1.HTTPError(401, `Error al generar la URL prefirmada: ${error}`);
    }
});
exports.subirRecurso = subirRecurso;
//# sourceMappingURL=aws.controller.js.map