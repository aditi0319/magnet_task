import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("🔵 Login button clicked");

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("🟢 API response:", response.data);

      login(response.data);
      alert("Login successful");

      navigate("/dashboard");
    } catch (error) {
      console.error("🔴 Login error:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="auth-container">
    <form onSubmit={submitHandler}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>

      <p>
        New user? <Link to="/register">Register here</Link>
      </p>
    </form>
    </div>
  );
};

export default Login;
