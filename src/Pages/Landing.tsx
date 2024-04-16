import React from "react";
import Sider from "../components/Sider";

function Landing() {
  return (
    <div className="grid grid-cols-6 lg:flex">
      <div className=" md:grid col-span-2  lg:hidden ">
        <Sider />
      </div>
      <div className="w-full overflow-x-hidden md:grid col-span-4">
        <img
          className="imageSize w-full h-[82vh] lg:h-[80vh] 2xl:h-[82vh] "
          src={require("../assets/North_pic.png")}
          alt="main_layout"
        />
      </div>
     
    </div>
  );
}

export default Landing;
