import { useState } from "react";

const ChatBox = () => {
    const [chat, setChat] = useState("");
    const [chats, setChats] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

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
            setChats([...chats, data.message]);
            setChat("");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input value={chat} onChange={(e) => setChat(e.target.value)} />
                <button>Send</button>
            </form>

            {chats.map((c, i) => (
                <p key={i}>{c}</p>
            ))}
        </>
    );
};

export default ChatBox;