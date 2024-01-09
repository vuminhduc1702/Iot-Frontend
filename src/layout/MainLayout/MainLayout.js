import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

const MainLayout = ({ children }) => {
  return (
    <div className="grid grid-col-1 grid-rows-12 h-screen">
      <div className="row-span-1">
        <NavigationBar />
      </div>
      <div className="row-span-11">{children}</div>
    </div>
  );
};

export default MainLayout;
