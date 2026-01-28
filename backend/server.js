import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();
const server = http.createServer(app);

// 🔥 Allowed origins (frontend + local)
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "https://chat-app-frontend-mu-six.vercel.app"
];

// 🔥 EXPRESS CORS (for fetch / axios)
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(express.json());

// 🔥 SOCKET.IO CORS (IMPORTANT)
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// DB
connectDB();

// Routes
app.get("/", (req, res) => {
    res.send("API Working");
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// 🔐 SOCKET AUTH (JWT)
io.use((socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("No token"));

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        next();
    } catch (err) {
        next(new Error("Invalid token"));
    }
});

// 💬 SOCKET CONNECTION
io.on("connection", (socket) => {
    console.log("User connected:", socket.user.username);

    socket.on("sendMessage", async (message) => {
        const chat = {
            userId: socket.user.id,
            username: socket.user.username,
            message,
        };

        // broadcast to all users
        io.emit("receiveMessage", chat);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// SERVER START
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});