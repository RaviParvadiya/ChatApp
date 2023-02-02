import React, { useEffect, useState } from "react";

const { io } = require("socket.io-client");
const socket = io("http://192.168.29.212:3000/");

const ChatRoom = (props) => {
  const [msgs, setMsgs] = useState([]);
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");

  console.log("room", props);

  return <div className="chat-room">Chatroom</div>;
};

export default ChatRoom;
