import "./Signup.css";
import React, { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignUp();

  const handleFileChange = (e) => {
    setThumbnail(null); //Reset back to null
    let selected = e.target.files[0];
    if (!selected) {
      setThumbnailError("Please Select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    //Must not be greater than 100000 kilo bytes (150 kb)
    if (selected.size > 150000) {
      setThumbnailError("Image file size must be less than 100kb");
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
    // setEmail("");
    // setPassword("");
    // setDisplayName("");
    // setThumbnail(null);
    // setThumbnailError(null);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
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
      <label>
        <span>display name:</span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>profile thumbnail:</span>
        <input required type="file" onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && (
        <button type="submit" className="btn">
          Sign up
        </button>
      )}
      {isPending && (
        <button disabled className="btn">
          loading...
        </button>
      )}
      {error && <div className="error">{error}</div>}
      <div className="click-link">
        <p>Already have an account? Please</p>
        <span>
          <Link to="/login">sign in</Link>
        </span>
      </div>
    </form>
  );
}
