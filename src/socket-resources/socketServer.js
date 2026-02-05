import { Server } from "socket.io";
let io;

export const initSocketServer = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {
        console.log("a user connected:", socket.id);

        socket.on("joinUserRoom", (userId) => {
            socket.join(`user_${userId}`);
            console.log(`User ${userId} joined room `);
        });

        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id)
        });
    });
    return io;

};

export const getIo = () => {
    if (!io) {
        throw new Error("socket.io not initialized")
    }
    return io;
}

