import React from "react";
import "./chat-item.css";
import { Link } from "react-router-dom";

const ChatItem = ({ item }) => {
  return (
    <Link
      to={`/chat/${item.iotClientId}`}
      state={{ item: item }}
      className="chatItem"
    >
      <div className="chatItemImg">{item.iotClientName[0].toUpperCase()}</div>
      <div className="chatItemInfo">
        <span className="chatItemName">{item.iotClientName}</span>
        <span className="chatItemModel">{item.iotClientModel}</span>
      </div>
    </Link>
  );
};

export default ChatItem;
