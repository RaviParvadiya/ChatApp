import React, { useEffect, useState } from "react";

const { io } = require("socket.io-client");
const socket = io("http://192.168.29.18:5000/");

const ChatRoom = () => {
  const [msgs, setMsgs] = useState([]);
  const [users, setUsers] = useState();
  const [input, setInput] = useState("");

  const room = window.localStorage.getItem("room");
  // const username = window.localStorage.getItem("username");

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

    socket.on("allUser", (data) => {
      const names = data.map((user) => user.username);
      // console.log('allUser:', names);
    });

    socket.on("new message", (data) => {
      console.log("Received message:", data.message, "from", data.name);
      setMsgs((prevMsgs) => [...prevMsgs, data]);
    });

    return () => {
      socket.off("new message");
      socket.off("roomname");
    };
  });

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("new message", room, input);
    setInput("");
  };

  return (
    <div className="chat-room">
      <div id="wlc"></div>
      <div id="joinedMessage"></div>
      {msgs.map((m) => (
        <div key={Date.now() + Math.random()}>
          <p>{m.message}</p>
          <p>sent by {m.name}</p>
          <p>By {m.time}</p>
        </div>
      ))}
      <form className="input-form" onSubmit={sendMessage}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
