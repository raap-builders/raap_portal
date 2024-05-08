import React from "react";
import Sider from "../components/Sider";

function Landing() {
  return (
    <div className="flex h-full gap-3">
      <div className="flex-3 flex-col w-1/2 hidden max-lg:block">
        <Sider />
      </div>
      <div className="w-[100%] flex-7 overflow-hidden">
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
