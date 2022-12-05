import "./ProjectList.scss";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../avatar/Avatar";

export default function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <ul>
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              fontSize: "0.7em",
              display: "flex",
              justifyContent: "flex-end",
              gap: "3px",
            }}
          >
            <b>Category:</b> {project.category}
          </div>
        </Link>
      ))}
    </div>
  );
}
