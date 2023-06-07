"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const aws_controller_1 = require("./aws.controller");
const router = (0, express_1.Router)();
router.get('/upload', aws_controller_1.getAllFiles);
router.get('/upload/:fileName', aws_controller_1.getSingleFile);
router.get('/download/:fileName', aws_controller_1.downloadSingleFile);
router.post('/upload', aws_controller_1.uploadFile);
// router.post('/upload', subirRecurso)
exports.default = router;
//# sourceMappingURL=aws.routes.js.map