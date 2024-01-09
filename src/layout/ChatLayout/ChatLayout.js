import "./chat.css";
import ChatItem from "../../components/ChatItem/ChatItem";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserService from "../../services/UserService/UserService";
import BackIcon from "../../assets/icons/BackIcon";
import MainLayout from "../MainLayout/MainLayout";

const ChatLayout = ({ children }) => {
  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      try {
        const response = await UserService.getDeviceListOfUser();
        setChatList(response.data);
      } catch (err) {
        console.log(err);
        toast.error("Unauthorized");
        navigate("/");
      }
    }
    fetch();
  }, []);

  return (
    <MainLayout>
      <div className="chat">
        <div className="chat-list">
          {/* <div className="back-btn">
            <BackIcon />
            <Link to={"/"}>Back to home page</Link>
          </div> */}
          {chatList.length > 0 &&
            chatList.map((chat) => (
              <div key={chat.iotClientId}>
                <ChatItem item={chat} />
              </div>
            ))}
        </div>
        <div className="chat-inbox">{children}</div>
      </div>
    </MainLayout>
  );
};

export default ChatLayout;
