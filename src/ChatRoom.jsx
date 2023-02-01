import React from "react";

const { io } = require("socket.io-client");
const socket = io("http://192.168.29.212:3000/");

const ChatRoom = () => {
  socket.on("allUser", (data) => {
    console.log(data);
  })
  socket.emit("new message", "input");
  socket.on("send message", (msg) => {
    console.log(msg);
  });
  return <div>ChatRoom</div>;
};

export default ChatRoom;
