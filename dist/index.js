"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const wss = new ws_1.default.Server({ port: 8080 });
let userCount = 1;
wss.on('connection', (ws) => {
    console.log(`${userCount++} user connected`);
    ws.send('Hello! You are connected!');
    ws.on('message', (message) => {
        const data = (message.toString());
        const jsonData = JSON.parse(data);
        // console.log(data);
        console.log(jsonData);
    });
});
