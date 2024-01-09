import React from "react";
import "./message.css";

const Message = ({ message }) => {
  return (
    <div className="message own">
      <div className="message-top chat-bubble">
        <img src={message.url} alt="Image" />
      </div>
      <div className="message-bottom">Sended on {message.dateCreated}</div>
    </div>
  );
};

export default Message;
