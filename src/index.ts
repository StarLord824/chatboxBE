import express from 'express';

import userRouter from './Routes/user';
import chatRouter from './Routes/chats';
import messageRouter from './Routes/message';

import wsConnection from './wsConnection';

const app = express();

wsConnection();  // Initialize WebSocket connection
app.use(express.json());  // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parses URL-encoded data

app.get('/', (req, res) => {
    res.send('Welcome to the ChatBox API!');
});

app.use('/api/v1/user', userRouter)
app.use('/api/v1/chat', chatRouter)
app.use('/api/v1/message', messageRouter)


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
