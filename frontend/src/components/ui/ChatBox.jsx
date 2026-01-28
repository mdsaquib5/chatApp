import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const ChatBox = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        socketRef.current = io("http://localhost:4000", {
            auth: { token },
            transports: ["websocket"],
        });

        socketRef.current.on("receiveMessage", (chat) => {
            setMessages((prev) => [...prev, chat]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        socketRef.current.emit("sendMessage", message);
        setMessage("");
    };

    return (
        <div className="chat-container">
            <div className="chat-wrapper">

                <div className="chat-header">
                    <h1 className="chat-title">Real-Time Chat</h1>
                    <p className="chat-subtitle">Chat instantly without refresh 🚀</p>
                </div>

                <div className="chat-messages-container">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message-wrapper ${msg.username === "You" ? "user" : "other"}`}
                        >
                            <div className={`message-bubble ${msg.username === "You" ? "user" : "other"}`}>
                                <span className="message-sender">{msg.username}</span>
                                <div className="message-text">{msg.message}</div>
                                <div className="message-time">
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-container">
                    <form onSubmit={handleSubmit} className="chat-form">
                        <input
                            className="chat-input"
                            type="text"
                            placeholder="Type your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit" className="send-btn">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;