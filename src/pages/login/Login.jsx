import "./Login.css";
import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //First Login user into the application
    login(email, password);
    // setEmail("");
    // setPassword("");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && (
        <button type="submit" className="btn">
          Sign in
        </button>
      )}
      {isPending && (
        <button disabled className="btn">
          loading...
        </button>
      )}
      {error && <div className="error">{error}</div>}
      <div className="click-link">
        <p>Don't have an account? Please</p>
        <span>
          <Link to="/signup">sign up</Link>
        </span>
      </div>
    </form>
  );
}
