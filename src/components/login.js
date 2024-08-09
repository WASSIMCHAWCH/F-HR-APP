import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
    const [matricul, setMatricul] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); // Correct usage of useNavigate

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple authentication logic (replace with real authentication)
        if (matricul === "123" && password === "password") {
            navigate("/home"); // Redirect to the home page upon successful login
        } else {
            setError("Invalid matricul or password");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label>Matricul</label>
                    <input
                        type="number"
                        value={matricul}
                        onChange={(e) => setMatricul(e.target.value)}
                        placeholder="matricul"
                        required
                        maxLength="3" 
                        onInput={(e) => {
                            if (e.target.value.length > 3) {
                                e.target.value = e.target.value.slice(0, 3);
                            }
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
