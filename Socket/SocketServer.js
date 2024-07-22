const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", async(socket) => {
    console.log("Socket connection established", socket.id);
    socket.on("client_message", (message , ack) => {
        console.log("Message from client:", message);
        if (message.name == 'Nithi') {
            sample
            ack(`Server received: ${sample_function(message.name)}`);
        }
    });

    // socket.on("disconnect", () => {
    //     console.log("disconnect:", socket.id);
    // });
});
function sample_function(name) {
    // let userInput = 100;
    console.log("Welcome : " + name);
    return `Welcome ${name}`;
}

const PORT = 501;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
