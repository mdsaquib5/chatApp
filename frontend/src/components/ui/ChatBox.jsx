import { useState } from "react";

const ChatBox = () => {
    const [chat, setChat] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!chat.trim()) return;

        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:4000/api/chat/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ message: chat }),
            });

            const data = await res.json();

            if (res.ok) {
                setChat("");
                alert("Message sent!");
            } else {
                alert(data.message || "Error sending message");
            }
        } catch (error) {
            alert("Failed to send message. Please try again.");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h1 className="chat-title">Send Message</h1>
                <p>Type your message below</p>
            </div>

            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    className="chat-input"
                    type="text"
                    placeholder="Enter your message..."
                    value={chat}
                    onChange={(e) => setChat(e.target.value)}
                    required
                />
                <button className="send-btn" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatBox;