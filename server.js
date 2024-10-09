const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Gerencia conexão de clientes
io.on("connection", (socket) => {
    console.log("Um cliente se conectou");

    // Cliente entra em uma sala (room)
    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`Cliente entrou no canal: ${room}`);
    });

    // Escuta e retransmite mensagens
    socket.on('send_message', ({ room, message, username }) => {
        // Retransmite a mensagem para todos os usuários na sala (room), incluindo o nome do remetente
        io.to(room).emit('receive_message', { message, username });
    });

    // Quando o cliente se desconecta
    socket.on("disconnect", () => {
        console.log("Um cliente se desconectou");
    });
});

// Inicia o servidor na porta 3000
server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
