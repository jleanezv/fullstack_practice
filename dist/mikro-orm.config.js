"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Job_1 = require("./entities/Job");
const path_1 = __importDefault(require("path"));
const User_1 = require("./entities/User");
const config = {
    user: '',
    password: '',
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
    },
    entities: [Job_1.Job, User_1.User],
    dbName: "installersDB",
    type: "postgresql",
    debug: !constants_1.__prod__,
    allowGlobalContext: true
};
exports.default = config;
//# sourceMappingURL=mikro-orm.config.js.map