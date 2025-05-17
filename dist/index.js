"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("./Routes/user"));
const prisma = new client_1.PrismaClient();
const wss = new ws_1.default.Server({ port: 8080 });
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Parses incoming JSON requests
app.use(express_1.default.urlencoded({ extended: true })); // Parses URL-encoded data
app.use('/api/v1/user', user_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
let userCount = 1;
// wss.on('connection', (ws) => {
//     console.log(`${ userCount++ } user connected`);
//     ws.send('Hello! You are connected!');
//     ws.on('message', (message) => {
//         const data = (message.toString());
//         const jsonData = JSON.parse(data);
//         // console.log(data);
//         console.log(jsonData);
//     })
// })
