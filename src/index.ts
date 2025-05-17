import ws from 'ws';
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const wss = new ws.Server({ port: 8080 });

const app = express();
app.use(express.json());


let userCount = 1;
wss.on('connection', (ws) => {
    console.log(`${userCount++} user connected`);
    ws.send('Hello! You are connected!');
    
    ws.on('message', (message) => {
        const data = (message.toString());
        const jsonData = JSON.parse(data);
        // console.log(data);
        console.log(jsonData);
    })
})