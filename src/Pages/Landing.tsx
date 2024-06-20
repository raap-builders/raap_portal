import React from "react";
import Sider from "../components/Sider";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import '../App.css'

function Landing() {
  const theme = useTheme();

  return (
    <div className={`flex h-full gap-3 max-lg:justify-center max-lg:items-center max-lg:py-10`} style={{
      width: "100%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundImage: `url(${require("../assets/North_pic.png")})`,
    }}>
      <div className="flex-3 flex-col w-1/2 max-md:w-4/5 hidden max-lg:block">
        <Sider />
      </div>
      <div className="w-[100%] flex-7 overflow-hidden max-lg:hidden">
        <img
          className="imageSize h-full pb-3"
          src={require("../assets/North_pic.png")}
          alt="main_layout"
        />
      </div>
    </div>
  );
}

export default Landing;
