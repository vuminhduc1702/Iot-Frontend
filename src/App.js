import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import ConversationPage from "./pages/ConversationPage/ConversationPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import NewDevicePage from "./pages/NewDevicePage/NewDevicePage";
import NewUserPage from "./pages/NewUserPage/NewUserPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:iotClientId" element={<ConversationPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/new-device" element={<NewDevicePage />} />
        <Route path="/admin/device/:iotClientId" element={<NewUserPage />} />
      </Routes>
    </div>
  );
}

export default App;
