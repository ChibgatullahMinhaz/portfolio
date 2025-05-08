import React from "react";

import RightSide from "./RightSide";
import LeftSide from "./LeftSide";
import MinddlePart from "./MinddlePart";

const Banner = () => {
  return (
    <div className="relative w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Left Side Floating Icons */}
      <aside className="fixed left-2 top-1/2 transform -translate-y-1/2 z-50">
        <RightSide />
      </aside>

      {/* Main Content */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 items-center px-6 md:px-12 ">
        <div className="md:col-span-11 md:ml-10 flex flex-col md:flex-row justify-between items-center w-full">
         <MinddlePart />
          <LeftSide />
        </div>
      </div>
    </div>
  );
};

export default Banner;
