import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
const NavLinks = [
  { id: 1, name: "Budget", to: "/Budget" },
  { id: 2, name: "Prototype", to: "/Prototype" },
  { id: 3, name: "Design", to: "/Design" },
  { id: 4, name: "Fabricate", to: "/Fabricate" },
];

function Header() {
  const divStyle = {
    backgroundColor: "#F9F9F9",
    boxShadow: "4px 8x 6px rgba(0, 0, 0, 0.1)", // Adjust the shadow properties as needed
  };
  return (
    <div
      style={divStyle}
      className="px-5 py-2 d-flex align-items-center rounded justify-content-between"
    >
      <NavLink to="/">
        <img
          src={require("../assets/Header/New_RaaP_Logo.png")}
          alt="RaaP_Logo"
          style={{
            width: 95,
            height: 50,
          }}
        />
      </NavLink>
      <div>
        {NavLinks.map(({ id, name, to }) => (
          <span
            // to={name === "Budget" ? "/" : ""}
            style={{ textDecoration: "none" }}
            className={`px-4 ${
              name === "Budget" ? "text-success" : "text-secondary"
            }`}
            key={id}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Header;
