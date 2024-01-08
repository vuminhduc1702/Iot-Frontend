import React from "react";
import "./chat-list.css";
import ChatItem from "../ChatItem/ChatItem";

const ChatList = ({ chatList }) => {
  return (
    <div className="menu">
      <div className="menu-search-wrapper">
        <input
          className="menu-search"
          type="text"
          placeholder="Search for device"
        />
      </div>
      <div className="list">
        {chatList?.length > 0 &&
          chatList.map((chat) => (
            <div>
              <ChatItem item={chat} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatList;
