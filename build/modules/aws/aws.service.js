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
exports.uploadFileToS3Service = exports.downloadFileFromS3Service = exports.getFileSignedUrlFromS3Service = exports.getSingleFileFromS3Service = exports.getFilesFromS3Service = void 0;
const fs_1 = __importDefault(require("fs"));
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = __importDefault(require("../../config/config"));
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const clientS3 = new client_s3_1.S3Client({
    region: config_1.default.AWS.BUCKET_REGION,
    credentials: {
        accessKeyId: config_1.default.AWS.PUBLIC_KEY,
        secretAccessKey: config_1.default.AWS.SECRET_KEY
    }
});
const getObjectCommand = (fileName) => {
    return new client_s3_1.GetObjectCommand({
        Bucket: config_1.default.AWS.BUCKET_NAME,
        Key: fileName
    });
};
function getFilesFromS3Service() {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new client_s3_1.ListObjectsCommand({
            Bucket: config_1.default.AWS.BUCKET_NAME
        });
        return yield clientS3.send(command);
    });
}
exports.getFilesFromS3Service = getFilesFromS3Service;
function getSingleFileFromS3Service(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = getObjectCommand(fileName);
        return yield clientS3.send(command);
    });
}
exports.getSingleFileFromS3Service = getSingleFileFromS3Service;
function getFileSignedUrlFromS3Service(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = getObjectCommand(fileName);
        return yield (0, s3_request_presigner_1.getSignedUrl)(clientS3, command, { expiresIn: 3600 });
    });
}
exports.getFileSignedUrlFromS3Service = getFileSignedUrlFromS3Service;
function downloadFileFromS3Service(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = getObjectCommand(fileName);
        const result = yield clientS3.send(command);
        const readableStream = result.Body;
        const writeStream = fs_1.default.createWriteStream(`./downloads/${fileName}`);
        readableStream.pipe(writeStream);
    });
}
exports.downloadFileFromS3Service = downloadFileFromS3Service;
function uploadFileToS3Service(file) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO Almacenar en la base de datos la URL prefirmada
        const stream = fs_1.default.createReadStream(file.tempFilePath);
        const uploadParams = {
            Bucket: config_1.default.AWS.BUCKET_NAME,
            Key: file.name,
            Body: stream
        };
        const command = new client_s3_1.PutObjectCommand(uploadParams);
        return yield clientS3.send(command);
    });
}
exports.uploadFileToS3Service = uploadFileToS3Service;
//# sourceMappingURL=aws.service.js.map