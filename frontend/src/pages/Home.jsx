import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isLogin
            ? "http://localhost:4000/api/auth/login"
            : "http://localhost:4000/api/auth/register";

        const body = isLogin
            ? { email, password }
            : { username, email, password };

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            navigate("/chat");
        } else {
            alert(data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {!isLogin && (
                <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            )}
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button>{isLogin ? "Login" : "Register"}</button>
            <p onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Create account" : "Already have account"}
            </p>
        </form>
    );
}

export default Home;