import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";


const chatRouter = Router();
const prisma = new PrismaClient();

chatRouter.get("/", async (req: Request, res: Response) => {
    console.log("Chat route hit");
});

//create a new chat
// add participants to the chat
// join a chat
// leave a chat

chatRouter.post("/create", async (req: Request, res: Response) => {
    console.log("Create chat route hit");
    const { name , creatorId } = req.body;

    const chat = await prisma.chat.create({
        data: {
            name,
            participants: {
                connect: {
                    id: creatorId,
                },
            },
        },
    });

    res.status(201).json({ message: "Chat created successfully", chat });
});

chatRouter.post("/join", async (req: Request, res: Response) => {
    console.log("Join chat route hit");
    const { chatId, userId } = req.body;
    console.log(chatId, userId);
    const chat = await prisma.chat.update({
        where: {
            id: chatId,
        },
        data: {
            participants: {
                connect: {
                    id: userId,
                },
            },
        },
    });
    res.status(200).json({ message: "User added to chat successfully", chat });
    return;
});

chatRouter.post("/leave", async (req: Request, res: Response) => {
    console.log("Leave chat route hit");
    const { chatId, userId } = req.body;
    console.log(chatId, userId);
    const chat = await prisma.chat.update({
        where: {
            id: chatId,
        },
        data: {
            participants: {
                disconnect: {
                    id: userId,
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

export default chatRouter;