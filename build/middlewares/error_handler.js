"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorMiddleware = exports.NotFoundError = exports.UnauthorizedError = exports.HTTPError = void 0;
class HTTPError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.HTTPError = HTTPError;
class UnauthorizedError extends HTTPError {
    constructor() {
        super(401, 'Unauthorized');
    }
}
exports.UnauthorizedError = UnauthorizedError;
class NotFoundError extends HTTPError {
    constructor() {
        super(404, 'Not found');
    }
}
exports.NotFoundError = NotFoundError;
const handleErrorMiddleware = (error, _req, res, _next) => {
    if (error instanceof HTTPError) {
        const { statusCode, message } = error;
        res.status(statusCode).json({
            statusCode, message
        });
    }
    else {
        res.status(500).json({
            statusCode: 500,
            message: 'Internal Server Error'
        });
    }
};
exports.handleErrorMiddleware = handleErrorMiddleware;
//# sourceMappingURL=error_handler.js.map