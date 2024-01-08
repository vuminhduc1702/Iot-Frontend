import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <NavigationBar />
      {children}
    </div>
  );
};

export default MainLayout;
