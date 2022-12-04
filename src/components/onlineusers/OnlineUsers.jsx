import "./OnlineUsers.css";
import React from "react";
import useCollection from "../../hooks/useCollection";
import Avatar from "../avatar/Avatar";

export default function OnlineUsers() {
  const { error, documents } = useCollection("users");
  return (
    <div className="user-list">
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((user) => {
          return (
            <div className="user-list-item" key={user.id}>
              {user.online && <span className="online-user"></span>}
              <span>{user.displayName}</span>
              <Avatar src={user.photoURL} />
            </div>
          );
        })}
      <h2>All Users</h2>
    </div>
  );
}
