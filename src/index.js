import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <BrowserRouter basename="/fe">
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "",
            duration: 4000,
            style: {
              width: "800px",
              height: "100px",
              fontSize: "20px",
            },
          }}
        />
      </BrowserRouter>
    </React.StrictMode>
  </AuthContextProvider>
);
