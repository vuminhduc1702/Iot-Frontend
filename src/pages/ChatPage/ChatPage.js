import React from "react";
import "./chat.css";
import ChatLayout from "../../layout/ChatLayout/ChatLayout";
import TerminalIcon from "../../assets/icons/TerminalIcon";

const ChatPage = () => {
  return (
    <ChatLayout>
      <div className="boxWrapper">
        <TerminalIcon />
        <span>Choose a device</span>
      </div>
    </ChatLayout>
  );
};

export default ChatPage;
