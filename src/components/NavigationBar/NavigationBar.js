import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navigation-bar.css";
import ChatIcon from "../../assets/icons/ChatIcon";
import { AuthContext } from "../../context/AuthContext";

const NavigationBar = () => {
  const { isAuthed, setIsAuthed, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setIsAuthed(false);
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="flex items-center justify-center">
        <div className="logo">
          <Link to={"/"}>
            <img src={require("../../assets/logo.jpg")} alt="HUST" />
          </Link>
        </div>
      </div>

      {!isAuthed && (
        <div className="flex gap-2">
          <Link className="btn login" to={"/login"}>
            Log in
          </Link>
          <Link className="btn signup" to={"/signup"}>
            Sign up
          </Link>
        </div>
      )}

      {isAuthed && (
        <div className="flex gap-8 items-center">
          {role === 1 && (
            <div>
              <Link to={"/admin"}>Admin</Link>
            </div>
          )}
          {role === 0 && (
            <div>
              <Link to={"/chat"}>
                <ChatIcon />
              </Link>
            </div>
          )}
          <button
            className="flex items-center justify-center w-full border border-black p-3 h-10 font-bold hover:bg-black hover:text-white"
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
