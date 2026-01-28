// Home.jsx - Updated with new UI
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isLogin
            ? "http://localhost:4000/api/auth/login"
            : "http://localhost:4000/api/auth/register";

        const body = isLogin
            ? { email, password }
            : { username, email, password };

        try {
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
                alert(data.message || "An error occurred");
            }
        } catch (error) {
            alert("Network error. Please try again.");
        }
    };

    return (
        <div className="login-register-container">
            <div className="auth-card">
                {/* Header */}
                <div className="auth-header">
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">
                        {isLogin 
                            ? "Sign in to your account to continue" 
                            : "Create a new account to get started"
                        }
                    </p>
                </div>
                
                {/* Tabs */}
                <div className="auth-tabs">
                    <div 
                        className={`auth-tab ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Sign In
                    </div>
                    <div 
                        className={`auth-tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </div>
                </div>
                
                {/* Form */}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-form-content">
                        {!isLogin && (
                            <div className="input-group">
                                <i className="input-icon">👤</i>
                                <input 
                                    className="auth-input"
                                    placeholder="Username" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        
                        <div className="input-group">
                            <i className="input-icon">✉️</i>
                            <input 
                                className="auth-input"
                                type="email"
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="input-group">
                            <i className="input-icon">🔒</i>
                            <input 
                                className="auth-input"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button 
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        
                        {isLogin && (
                            <div className="forgot-password">
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>
                        )}
                        
                        <button className="submit-btn" type="submit">
                            {isLogin ? "Sign In" : "Create Account"}
                        </button>
                        
                        <div className="switch-text">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <span 
                                className="switch-link"
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? "Sign up" : "Sign in"}
                            </span>
                        </div>
                        
                        <div className="divider">
                            <span>Or continue with</span>
                        </div>
                        
                        <div className="social-login">
                            <button type="button" className="social-btn google-btn">
                                <span>G</span> Google
                            </button>
                            <button type="button" className="social-btn github-btn">
                                <span>G</span> GitHub
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Home;