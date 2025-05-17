"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const messageRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
messageRouter.post("/create", async (req, res) => {
    console.log("Create message route hit");
    const { chatId, senderId, content } = req.body;
    console.log(chatId, content);
    await prisma.message.create({
        data: {
            content,
            senderId,
            chatId,
        },
    });
    res.status(201).json({ message: "Message created successfully" });
});
exports.default = messageRouter;
// let userCount = 1;
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
