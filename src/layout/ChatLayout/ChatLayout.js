import "./chat.css";
import ChatList from "../../components/ChatList/ChatList";
import ChatItem from "../../components/ChatItem/ChatItem";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserService from "../../services/UserService/UserService";
import BackIcon from "../../assets/icons/BackIcon";

const ChatLayout = ({ children }) => {
  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      try {
        const response = await UserService.getDeviceListOfUser();
        setChatList(response.data);
      } catch (err) {
        // toast.error("Unauthorized");
        // navigate("/");
        console.log(err);
      }
    }
    fetch();
  }, []);

  return (
    <div className="chat">
      <div className="chat-list">
        <div className="back-btn">
          <BackIcon />
          <Link to={"/"}>Back to home page</Link>
        </div>
        <div className="list">
          {chatList.length > 0 &&
            chatList.map((chat) => (
              <div key={chat.iotClientId}>
                <ChatItem item={chat} />
              </div>
            ))}
        </div>
      </div>
      <div className="chat-inbox">{children}</div>
    </div>
  );
};

export default ChatLayout;
