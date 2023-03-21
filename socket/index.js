import { Server, Socket } from "socket.io";

const io = new Server(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = []

const addUser = (userId, socketId, peerId) => {
    if (!users.some(user => user.userId === userId))
        users.push({ userId, socketId, peerId });
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    const user = users.find(user => user.userId === userId);
    return user;
}



io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("addUser", ({ userId, peerId }) => {
        console.log("THêm", userId);
        addUser(userId, socket.id, peerId);
        console.log("DS", users);
        io.emit("getUsers", users);
    });


    // setup for chatting
    socket.on("sendMessage", ({ conversationId, senderId, receiverId, message }) => {
        const receiver = getUser(receiverId);
        if (receiver)
            io.to(receiver.socketId).emit("getMessage", { conversationId, message });
        else
            console.log("Receiver is offline")
    });


    // setup for calling
    socket.on("calling", () => {

    })
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        users[socket.id] = { roomId, userId };

        socket.to(roomId).broadcast.emit('user-connected', userId);

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId);
            delete users[socket.id];
        });

        socket.on('call-user', (data) => {
            socket.to(data.userToCall).emit('receive-call', { signal: data.signalData, from: data.from });
        });

        socket.on('answer-call', (data) => {
            socket.to(data.from).emit('call-accepted', data.signal);
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});