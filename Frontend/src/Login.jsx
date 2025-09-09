import "./Login.css";
import { useState } from "react";

function Login({ onClose }) {
    const [isSignup, setIsSignup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isSignup ? "signup" : "login";

        try {
            const res = await fetch(`http://localhost:8080/api/auth/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message || "Success");
                // optionally save user data/token to localStorage here
                onClose(); // close modal on success
            } else {
                setMessage(data.message || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            setMessage("Server error");
        }
    };

    return (
        <div className="loginModalOverlay">
            <div className="loginModal">
                <h2>{isSignup ? "Sign Up" : "Log In"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
                </form>
                <p className="switchAuth" onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                </p>
                <p className="message">{message}</p>
                <p className="stayLoggedOut" onClick={onClose}>Cancel</p>
            </div>
        </div>
    );
}

export default Login;
