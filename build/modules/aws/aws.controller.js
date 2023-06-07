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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.downloadSingleFile = exports.getSingleFileSignedUrl = exports.getSingleFile = exports.getAllFiles = void 0;
const aws_service_1 = require("./aws.service");
// import { HTTPError } from '@middlewares/error_handler'
const getAllFiles = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, aws_service_1.getFilesFromS3Service)();
    res.json(result.Contents);
});
exports.getAllFiles = getAllFiles;
const getSingleFile = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.params.fileName;
    const result = yield (0, aws_service_1.getSingleFileFromS3Service)(fileName);
    res.json(result.$metadata);
});
exports.getSingleFile = getSingleFile;
const getSingleFileSignedUrl = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.params.fileName;
    const result = yield (0, aws_service_1.getSingleFileFromS3Service)(fileName);
    res.json(result.url);
});
exports.getSingleFileSignedUrl = getSingleFileSignedUrl;
const downloadSingleFile = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.params.fileName;
    yield (0, aws_service_1.downloadFileFromS3Service)(fileName);
    res.json({ message: 'Archivo descargado' });
});
exports.downloadSingleFile = downloadSingleFile;
const uploadFile = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, aws_service_1.uploadFileToS3Service)(req.files.file);
    res.json({ result });
});
exports.uploadFile = uploadFile;
//# sourceMappingURL=aws.controller.js.map