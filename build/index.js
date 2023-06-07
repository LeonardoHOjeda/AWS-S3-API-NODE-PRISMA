"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./alias");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const routes_1 = __importDefault(require("./routes"));
const error_handler_1 = require("@middlewares/error_handler");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = config_1.default.PORT;
        this.routes();
        this.middlewares();
    }
    start() {
        this.app.listen(this.port, () => {
            console.log('🚀 Servidor corriendo en el puerto: ', this.port);
        });
    }
    // Rutas
    routes() {
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: './uploads'
            // debug: false
        }));
        this.app.use(routes_1.default);
        this.app.use(error_handler_1.handleErrorMiddleware);
    }
    // Middlewares
    middlewares() {
        this.app.use(express_1.default.json());
    }
}
const server = new Server();
server.start();
//# sourceMappingURL=index.js.map