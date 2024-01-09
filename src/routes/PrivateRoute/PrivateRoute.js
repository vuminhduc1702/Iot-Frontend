import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthed, role } = useContext(AuthContext);
  const location = useLocation();

  return <div></div>;
};
export default PrivateRoute;
