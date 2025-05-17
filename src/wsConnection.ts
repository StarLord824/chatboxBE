import { WebSocketServer, WebSocket } from "ws";
import { configDotenv } from "dotenv";
import { PrismaClient } from "@prisma/client";

configDotenv();

const wss = new WebSocketServer({ port: 8080 });
const prisma = new PrismaClient();

interface SocketHeader {
    userId : Number;
    ws : WebSocket;
}

wss.on("connection", (socket : SocketHeader) => {
    const ws= socket.ws;

    console.log("User connected");
    ws.send("Hello! You are connected!");

    ws.on("message", async (message) => {
        
        const data = JSON.parse(message.toString());
        console.log(data);

        if (data.type === "message") {
            const { chatId, senderId, content } = data;
            console.log(chatId, senderId, content, "message received");
            const message = await prisma.message.create({
                data: {
                    content,
                    senderId: parseInt(senderId),
                    chatId: parseInt(chatId),
                },
            });
            console.log(message, "message created");
        }
        const jsonData = JSON.parse(data);
        console.log(jsonData);
    });

    ws.on("close", () => {
        console.log("User disconnected");
    });
    ws.on("error", (error) => {
        console.error("WebSocket error:", error);
    });
});