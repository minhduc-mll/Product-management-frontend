import "./login.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "utils/apiAxios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await apiRequest.post("auth/login", {
                username,
                password,
            });
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            navigate("/");
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className="login">
            <div className="login-card">
                <h1>Login</h1>
                <h2>Enter your credentials</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="">Username</label>
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="error">{error}</span>
                    <Link to={"/login"} className="link">
                        Forget your password?
                    </Link>
                    <button type="submit">LOGIN</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
