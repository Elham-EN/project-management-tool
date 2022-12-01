import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useLogout } from "../../hooks/useLogout";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <p>PMT</p>
        </li>
        <li>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          {!isPending && (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
          {isPending && (
            <button className="btn" disabled>
              Loging out...
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
