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
  return (
    <div
      style={{ backgroundColor: "#F1F1F2" }}
      className="px-5 py-2 d-flex align-items-center justify-content-between"
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
          <NavLink
            to={to}
            style={{ textDecoration: "none" }}
            className="px-4 navlink-text"
            key={id}
          >
            {name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Header;
