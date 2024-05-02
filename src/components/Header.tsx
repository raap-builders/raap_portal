import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../styles/header.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Cookies from "js-cookie";
import { fetchAPI } from "../utils/fetcher";
import { useUserStore } from "../store";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";

const NavLinks = [
  { id: 1, name: "Budget", to: "/Budget" },
  { id: 2, name: "Design", to: "/Design" },
  { id: 3, name: "Fabricate", to: "/Fabricate" },
];
const options = ["Budget", "Design", "Fabricate"];
const defaultOption = options[0];
function Header() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const {
    //@ts-ignore
    changeMeInfo,
    //@ts-ignore
    meInfo,
  } = useUserStore((state) => state);

  const onLogoutClicked = async () => {
    try {
      // const response = await fetchAPI({
      //   route: "logout",
      //   method: "GET",
      // });
      changeMeInfo({});
      Cookies.remove("accessTokenObject");
      Cookies.remove("refreshToken");
      navigate("/");
    } catch (error) {
      console.log("error in logout--->>", error);
    }
  };

  const divStyle = {
    backgroundColor: "#F9F9F9",
    boxShadow: "4px 8x 6px rgba(0, 0, 0, 0.1)",
  };
  return (
    <div
      style={divStyle}
      className="px-5 py-2 d-flex align-items-center rounded justify-content-between"
    >
      <NavLink to="/landing">
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
            style={{ textDecoration: "none", fontSize: 24 }}
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
      <Button
        className="text-secondary"
        aria-describedby={id}
        variant="text"
        onClick={handleClick}
      >
        {`${meInfo.data.firstName} ${meInfo.data.lastName}`}
        <ArrowDropDownCircleOutlinedIcon
          className="ml-2"
          style={{ fontSize: 18 }}
        />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          className="cursor-pointer"
          onClick={onLogoutClicked}
          sx={{ p: 2 }}
        >
          Logout
        </Typography>
      </Popover>
    </div>
  );
}

export default Header;
