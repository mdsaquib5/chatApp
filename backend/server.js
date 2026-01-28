import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import "dotenv/config";

import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Chat from "./models/chatModel.js";

const app = express();
const PORT = process.env.PORT || 4000;

// DB connect
connectDB();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173", // React/Vite port
    credentials: true,
}));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("API Working");
});

// REST APIs
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

/* ================= SOCKET.IO SETUP ================= */

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// 🔐 Socket JWT Auth
io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
        return next(new Error("No token provided"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded; // { userId, username }
        next();
    } catch (err) {
        next(new Error("Invalid token"));
    }
});

// Socket connection
io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.user.username);

    // Receive message
    socket.on("sendMessage", async (message) => {
        try {
            const chat = await Chat.create({
                userId: socket.user.userId,
                username: socket.user.username,
                message,
            });

            // 🔥 Send to all connected users
            io.emit("receiveMessage", chat);
        } catch (err) {
            console.log("Chat save error:", err);
        }
    });

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.user.username);
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});