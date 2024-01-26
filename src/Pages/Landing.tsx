import React from "react";
import Sider from "../components/Sider";

function Landing() {
  return (
    <div className="flex ">
      <div className=" md:block  lg:hidden md:mr-12 2xl:hidden flex">
        <Sider />
      </div>
      <div className="w-full ">
        <img
          className="imageSize 2xl:w-[100%] mb-4 mt-2"
          src={require("../assets/North_pic.png")}
          alt="main_layout"
        />
      </div>
    </div>
  );
}

export default Landing;
