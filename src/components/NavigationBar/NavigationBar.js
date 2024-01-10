import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navigation-bar.css";
import { AuthContext } from "../../context/AuthContext";
import LogoutModal from "../LogoutModal/LogoutModal";

const NavigationBar = () => {
  const { isAuthed, setIsAuthed, role, email } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setIsAuthed(false);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="navbar px-3">
      <div className="flex-1">
        <Link to={"/"} className="btn-ghost w-32 h-auto">
          <img src={require("../../assets/logo.jpg")} alt="HUST" />
        </Link>
      </div>

      {!isAuthed && (
        <div className="flex gap-2">
          <Link className="btn" to={"/login"}>
            Log in
          </Link>
          <Link className="btn" to={"/signup"}>
            Sign up
          </Link>
        </div>
      )}

      {isAuthed && (
        <div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 h-10 rounded-full text-lg  bg-pink-500 text-white hover:bg-pink-600 uppercase">
                  <div className="w-full h-full flex items-center justify-center">
                    {email[0] + email[1]}
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-lg dropdown-content mt-3 z-10 p-2 shadow bg-white rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li className="rounded-xl hover:bg-gray-200">
                  <button
                    onClick={() =>
                      document.getElementById("my_logout_modal").showModal()
                    }
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <LogoutModal handleLogout={handleLogout} />
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
