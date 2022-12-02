import "./Avatar.css";
import React from "react";

export default function className({ src }) {
  return (
    <div className="avatar">
      <img src={src} alt="user avatar" />
    </div>
  );
}
