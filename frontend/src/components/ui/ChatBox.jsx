import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

const ChatBox = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        // socket connect with JWT
        socket = io("http://localhost:4000", {
            auth: {
                token,
            },
        });

        // receive messages
        socket.on("receiveMessage", (chat) => {
            setMessages((prev) => [...prev, chat]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // send message via socket
        socket.emit("sendMessage", message);

        setMessage("");
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h1 className="chat-title">Realtime Chat</h1>
                <p>Connected users can chat live 🚀</p>
            </div>

            {/* CHAT MESSAGES */}
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <span className="username">{msg.username}</span>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>

            {/* INPUT */}
            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    className="chat-input"
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="send-btn" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatBox;