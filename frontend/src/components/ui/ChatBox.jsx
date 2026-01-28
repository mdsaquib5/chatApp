import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const ChatBox = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const socketRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        // ✅ create socket connection ONLY ONCE
        socketRef.current = io("http://localhost:4000", {
            auth: { token },
            transports: ["websocket"], // prevents polling reconnect issues
        });

        // ✅ receive message
        socketRef.current.on("receiveMessage", (chat) => {
            setMessages((prev) => [...prev, chat]);
        });

        // cleanup
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // ✅ send message
        socketRef.current.emit("sendMessage", message);

        setMessage("");
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h1 className="chat-title">Real-Time Chat</h1>
                <p>Chat without refresh 🚀</p>
            </div>

            {/* messages */}
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <strong>{msg.username}: </strong>
                        {msg.message}
                    </div>
                ))}
            </div>

            {/* input */}
            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    className="chat-input"
                    type="text"
                    placeholder="Type message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="send-btn">Send</button>
            </form>
        </div>
    );
};


export default ChatBox;