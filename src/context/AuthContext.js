import { useState, createContext, useEffect } from "react";

import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(() => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken ? (validateJwt(accessToken) ? true : false) : false;
  });
  const [email, setEmail] = useState("");
  const [role, setRole] = useState();

  console.log(role);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      checkRole(accessToken);
    }
  }, []);

  function validateJwt(jwtToken) {
    try {
      const decoded = jwtDecode(jwtToken);
      const expire = decoded.exp * 24 * 60 * 60 * 1000;
      if (decoded && expire > Date.now()) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  function checkRole(jwtToken) {
    try {
      const decoded = jwtDecode(jwtToken);
      const email = decoded.sub;
      setEmail(email);
      const role = decoded.role;
      if (role.includes("ROLE_ADMIN")) {
        setRole(1);
      } else {
        setRole(2);
      }
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthed,
        role,
        email,
        setIsAuthed,
        setRole,
        checkRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
