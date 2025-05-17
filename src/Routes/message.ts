import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const messageRouter = Router();
const prisma = new PrismaClient();

messageRouter.post("/create", async (req: Request, res: Response) => {
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

    res.status(201).json({ message: "Message created successfully"});
});

export default messageRouter;

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