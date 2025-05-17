import ws from 'ws';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import userRouter from './Routes/user';
import chatRouter from './Routes/chats';

const prisma = new PrismaClient();

const wss = new ws.Server({ port: 8080 });

const app = express();

app.use(express.json());  // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parses URL-encoded data

app.use('/api/v1/user', userRouter)
app.use('/api/v1/chat', chatRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


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