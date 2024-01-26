import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "../styles/header.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
const NavLinks = [
  { id: 1, name: "Budget", to: "/Budget" },
  { id: 2, name: "Prototype", to: "/Prototype" },
  { id: 3, name: "Design", to: "/Design" },
  { id: 4, name: "Fabricate", to: "/Fabricate" },
];
const options = ["Budget", "Prototype", "Design", "Fabricate"];
const defaultOption = options[0];
function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const divStyle = {
    backgroundColor: "#F9F9F9",
    boxShadow: "4px 8x 6px rgba(0, 0, 0, 0.1)",
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
      <div className=" hidden sm:block md:block lg:block xl:block 2xl:block">
        {NavLinks.map(({ id, name, to }) => (
          <span
            // to={name === "Budget" ? "/" : ""}
            style={{ textDecoration: "none" }}
            className={`px-4 ${
              name === "Budget"
                ? "text-[#519259] font-extrabold"
                : "text-secondary"
            }`}
            key={id}
          >
            {name}
          </span>
        ))}
      </div>
      {/* <div className="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="mobile-dropdown-btn"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <ul
          className={`dropdown-menu ${isDropdownOpen ? "show" : ""} `}
          style={{ position: "relative", top: "100%", right: 100 }}
        >
          {NavLinks.map(({ id, name, to }) => (
            <li key={id} className="dropdown-item ">
              <span
                // to={name === "Budget" ? "/" : ""}
                style={{ textDecoration: "none" }}
                className={`px-4 ${
                  name === "Budget"
                    ? "text-[#519259] font-extrabold"
                    : "text-secondary"
                }`}
                key={id}
              >
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div> */}
      <div className="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
        <Dropdown options={options} value={defaultOption} placeholder="" />
      </div>
    </div>
  );
}

export default Header;
