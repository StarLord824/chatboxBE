"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./Routes/user"));
const chats_1 = __importDefault(require("./Routes/chats"));
const message_1 = __importDefault(require("./Routes/message"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Parses incoming JSON requests
app.use(express_1.default.urlencoded({ extended: true })); // Parses URL-encoded data
app.get('/', (req, res) => {
    res.send('Welcome to the ChatBox API!');
});
app.use('/api/v1/user', user_1.default);
app.use('/api/v1/chat', chats_1.default);
app.use('/api/v1/message', message_1.default);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
