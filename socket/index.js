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
        console.log("THêm", userId, peerId);
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

    // Nhận data từ NGƯỜI GỌI, tìm kiếm NGƯỜI NHẬN và phát 'incoming call' đến NGƯỜI NHẬN
    socket.on("calling", ({ callerID, calleeID }) => {
        console.log(callerID, "GỌI", calleeID);
        const callee = getUser(calleeID);
        if (callee) {
            console.log("PHÁT TÍN HIỆU TỚI", calleeID)
            io.to(callee.socketId).emit("incoming call", { callerID })
        }
    })

    socket.on("accept video call", ({ calleePeerID, callerID }) => {
        const caller = getUser(callerID);
        console.log(callerID, "CHẤP NHẬN CUỘC GỌI", caller.socketId)
        io.to(caller.socketId).emit("accepted calling", { calleePeerID });
        console.log("Đã gửi")

    })

    socket.on("deny calling", ({ callerID }) => {
        console.log(callerID, "HỦY CUỘC GỌI")
        const caller = getUser(callerID)
        io.to(caller.socketId).emit("denied calling");

    })

    socket.on("end calling", ({ finisher, callerID, calleeID }) => {
        console.log("KẾT THÚC CUỘC GỌI caller = ", callerID)
        const callee = getUser(calleeID)
        io.to(callee.socketId).emit("ended calling", {});
        const caller = getUser(callerID)
        io.to(caller.socketId).emit("ended calling", {});
        // if (finisher === callerID) {
        //     const callee = getUser(calleeID)
        //     io.to(callee.socketId).emit("ended calling", {});
        // }
        // else if (finisher === calleeID) {
        //     const caller = getUser(callerID)
        //     io.to(caller.socketId).emit("ended calling", {});
        // }

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
        removeUser(socket.id);
        console.log("User disconnected", users);
        // io.emit("getUsers", users);
    });
});