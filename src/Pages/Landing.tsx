import React from "react";
import Sider from "../components/Sider";

function Landing() {
  return (
    <div className="md:grid md:grid-cols-6 lg:flex">
      <div className=" md:grid md:col-span-2  lg:hidden ">
        <Sider />
      </div>
      <div className="w-[100%] flex-7 overflow-hidden">
        <img
          className="imageSize w-full md:h-[82vh] lg:h-[80vh] 2xl:h-[82vh] "
          src={require("../assets/North_pic.png")}
          alt="main_layout"
        />
      </div>
    </div>
  );
}

export default Landing;
