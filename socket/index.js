import { Server, Socket } from "socket.io";

const io = new Server(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = []

const addUser = (userId, socketId) => {
    if (!users.some(user => user.userId === userId))
        users.push({ userId, socketId });
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
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ conversationId, senderId, receiverId, message }) => {
        const receiver = getUser(receiverId);
        if (receiver)
            io.to(receiver.socketId).emit("getMessage", { conversationId, message });
        else
            console.log("Receiver is offline")
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
});