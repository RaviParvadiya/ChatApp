import React, { useEffect, useState } from "react";
import useAuth from "../../auth/useAuth";
import Message from "../../Components/Message/Message";
import jwt_decode from "jwt-decode";
import Input from "../../Components/Input/Input";
import { useNavigate } from "react-router-dom";

const { io } = require("socket.io-client");
const socket = io("http://192.168.29.18:5000/");

const ChatRoom = () => {
  const [msgs, setMsgs] = useState([]);
  // const [users, setUsers] = useState();
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const room = window.localStorage.getItem("room");
  // const username = window.localStorage.getItem("username");

  useAuth(socket);

  useEffect(() => {
    socket.emit("joinRoom", room);

    socket.on("message", (msg) => {
      const messageContainer = document.getElementById("wlc");
      messageContainer.innerHTML = msg.username + ": " + msg.text;
    });

    socket.on("info", (msg) => {
      const messageContainer = document.getElementById("joinedMessage");
      messageContainer.innerHTML = msg.username + " " + msg.text;
    });

    socket.emit("getroominfo", room);

    /*     socket.on("allUser", (data) => {
      const names = data.map((user) => user.username);
      // console.log('allUser:', names);
    }); */

    socket.on("new message", (data) => {
      console.log("Received message:", data.message, "from", data.name);
      setMsgs((prevMsgs) => [...prevMsgs, data]);
    });

    return () => {
      socket.off("new message");
    };
  });

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("new message", room, input);
    setInput("");
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    socket.disconnect();
    navigate(-1);
  };

  socket.on("leavemessage", (message) => {
    const messageElement = document.getElementById("leave-message");
    messageElement.innerHTML = message.username + " " + message.text;
  });

  const token = window.localStorage.getItem("token");
  const decoded = jwt_decode(token);

  return (
    <div className="chat-room">
      <div id="wlc"></div>
      <div id="joinedMessage"></div>
      {msgs.map((m) => (
        <div key={Date.now() + Math.random()}>
          <Message
            user={m.name}
            message={m.message}
            time={m.time}
            name={decoded.username}
          />
        </div>
      ))}
      {/* <form className="input-form" onSubmit={sendMessage}>
        <input placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form> */}
      <Input message={input} setMessage={setInput} sendMessage={sendMessage} />
      <div id="leave-message"></div>
      <button onClick={leaveRoom}>Leave</button>
    </div>
  );
};

export default ChatRoom;
