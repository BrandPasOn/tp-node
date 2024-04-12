"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = {
    PORT: parseInt(process.env.PORT || "3000"),
    JWT_SECRET: process.env.JWT_SECRET || "MonS3cr3tTropBienGardé123:!",
    REFRESH_SECRET: process.env.REFRESH_SECRET || "MonS3cr3tTropBienGardé123IlEstR3fr3sh§:!",
    NODE_ENV: process.env.NODE_ENV || 'development'
};
exports.default = env;
