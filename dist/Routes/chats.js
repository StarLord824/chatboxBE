"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const chatRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
chatRouter.get("/", async (req, res) => {
    console.log("Chat route hit");
    res.status(200).json({ message: "Chat route hit" });
});
//create a new chat
// add participants to the chat
// join a chat
// leave a chat
chatRouter.post("/create", async (req, res) => {
    console.log("Create chat route hit");
    const { name, creatorId } = req.body;
    const chat = await prisma.chat.create({
        data: {
            name,
            participants: {
                connect: {
                    id: parseInt(creatorId),
                },
            },
        },
    });
    res.status(201).json({ message: "Chat created successfully", chat });
});
chatRouter.post("/join", async (req, res) => {
    console.log("Join chat route hit");
    const { chatId, userId } = req.body;
    console.log(chatId, userId);
    const chat = await prisma.chat.update({
        where: {
            id: parseInt(chatId),
        },
        data: {
            participants: {
                connect: {
                    id: parseInt(userId),
                },
            },
        },
    });
    res.status(200).json({ message: "User added to chat successfully", chat });
    return;
});
chatRouter.post("/leave", async (req, res) => {
    console.log("Leave chat route hit");
    const { chatId, userId } = req.body;
    console.log(chatId, userId);
    const chat = await prisma.chat.update({
        where: {
            id: parseInt(chatId),
        },
        data: {
            participants: {
                disconnect: {
                    id: parseInt(userId),
                },
            },
        },
        include: {
            participants: true,
        },
    });
    res.status(200).json({ message: "User removed from chat successfully", chat });
    return;
});
exports.default = chatRouter;
