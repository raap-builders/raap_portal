import React from "react";
import Sider from "../components/Sider";

function Landing() {
  return (
    <div className="flex ">
      <div className=" md:block md:mx-[-15px] flex-3 flex-col lg:hidden md:ml-0 w-[35vw] md:mr-2 2xl:hidden ">
        <Sider />
      </div>
      <div className="w-[100%] flex-7 overflow-hidden">
        <img
          className="imageSize  h-auto xl:w-[98%] "
          src={require("../assets/North_pic.png")}
          alt="main_layout"
        />
      </div>
    </div>
  );
}

export default Landing;
