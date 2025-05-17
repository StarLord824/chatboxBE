import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";


const chatRouter = Router();
const prisma = new PrismaClient();

chatRouter.get("/", async (req: Request, res: Response) => {
    console.log("Chat route hit");
});

chatRouter.post("/create", async (req: Request, res: Response) => {
    console.log("Create chat route hit");
    const { name, participantIds } = req.body;

    const chat = await prisma.chat.create({
        data: {
            name,
            participants: {
                connect: participantIds.map((id: string) => ({ id })),
            },
        },
    });

    res.status(201).json(chat);
});
