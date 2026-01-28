import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const ChatBox = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("user"));
    // user = { id, username }

    useEffect(() => {
        const token = localStorage.getItem("token");

        socketRef.current = io("http://localhost:4000", {
            auth: { token },
            transports: ["websocket"],
        });

        socketRef.current.on("connect", () => {
            console.log("Socket connected");
        });

        socketRef.current.on("receiveMessage", (chat) => {
            setMessages((prev) => [...prev, chat]);
        });

        socketRef.current.on("connect_error", (err) => {
            console.error("Socket error:", err.message);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        socketRef.current.emit("sendMessage", message);

        // 🔥 instantly show own message
        setMessages((prev) => [
            ...prev,
            {
                message,
                username: user.username,
                userId: user.id,
                self: true,
            },
        ]);

        setMessage("");
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Realtime Chat</h2>
            </div>

            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-bubble ${msg.userId === user.id ? "own" : "other"
                            }`}
                    >
                        <span className="chat-user">{msg.username}</span>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    type="text"
                    placeholder="Type message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatBox;