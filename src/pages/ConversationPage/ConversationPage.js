import React, { useEffect, useRef, useState } from "react";
import "./chat-box.css";
import CameraIcon from "../../assets/icons/CameraIcon";
import ChatLayout from "../../layout/ChatLayout/ChatLayout";
import UserService from "../../services/UserService/UserService";
import Message from "../../components/Message/Message";
import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import toast from "react-hot-toast";
import SendIcon from "../../assets/icons/SendIcon";

const ConversationPage = () => {
  var stompClient = null;
  const [messages, setMessages] = useState([]);
  const [isAuto, setIsAuto] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { state } = useLocation();
  const { iotClientId } = useParams();
  const scrollRef = useRef();
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    async function fetch() {
      try {
        const response = await UserService.messageHistory(iotClientId);
        setMessages(response.data);
      } catch (err) {
        console.log(err);
        setMessages([]);
      }
    }
    fetch();
    connect();
  }, [iotClientId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setIsOwner(state.item.isOwner);
    setIsAuto(state.item.isAuto);
  }, [state]);

  const handleTakePhoto = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.publishMessage(iotClientId);
      // toast.success(response.status);
    } catch (err) {
      toast.error("Failed to take photo. Try again");
      console.log(err);
    }
  };
  const onSendMinute = async (data) => {
    try {
      const response = await UserService.setSendAuto(iotClientId);
      const response2 = await UserService.setMinute(iotClientId, data);
      toast.success(response.status);
      toast.success(response2.status);
      setIsAuto(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleStopAuto = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.setSendAuto(iotClientId);
      toast.success(response.status);
      setIsAuto(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const connect = () => {
    let Sock = new SockJS("https://dungdt.id.vn/ws");
    // let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    console.log("connected to", state.item.topic);
  };

  const onConnected = () => {
    if (stompClient.connected) {
      stompClient.subscribe(state.item.topic, onMessageReceived);
    }
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    console.log(payloadData);
    setMessages((prev) => [...prev, payloadData]);
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <ChatLayout>
      <div className="chat-box">
        <div className="chat-box-header">
          <div className="header-img">{state.item.iotClientName[0]}</div>
          <span className="header-name">{state.item.iotClientName}</span>
        </div>
        <div className="messenger">
          {messages.length > 0 &&
            messages.map((message) => (
              <div key={message.title} ref={scrollRef}>
                <Message message={message} />
              </div>
            ))}
        </div>

        <div className="chat-box-bottom">
          <div>
            <button
              className="bottom-button"
              onClick={(e) => handleTakePhoto(e)}
            >
              <CameraIcon />
              <span>Chụp ảnh</span>
            </button>
          </div>

          {isOwner && !isAuto ? (
            <div>
              <form
                onSubmit={handleSubmit(onSendMinute)}
                className="flex gap-2 items-center"
              >
                <p className="error">{errors.minutes?.message}</p>
                <input
                  type="number"
                  placeholder="Minute"
                  className="w-36 border-gray-400 focus:outline-none"
                  {...register("minutes", {
                    required: { value: true, message: "Minute is required" },
                  })}
                />
                <button className="w-fit text-blue-400 hover:text-blue-500 font-semibold">
                  <SendIcon />
                </button>
              </form>
            </div>
          ) : (
            ""
          )}

          {isOwner && isAuto ? (
            <div>
              <button
                onClick={(e) => handleStopAuto(e)}
                className="w-fit px-3 py-2 bg-red-400 hover:bg-red-500 text-white font-semibold"
              >
                Stop auto sending
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* {isOwner && isAuto ? (
          <div className="chat-box-bottom">
            <button
              onClick={(e) => handleStopAuto(e)}
              className="w-fit px-3 py-2 bg-red-400 hover:bg-red-500 text-white font-semibold"
            >
              Stop auto sending
            </button>
          </div>
        ) : (
          <div></div>
        )} */}
      </div>
    </ChatLayout>
  );
};

export default ConversationPage;
