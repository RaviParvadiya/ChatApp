import React, { useEffect, useState } from "react";
import useAuth from "../../auth/useAuth";
import Message from "../../Components/Message/Message";
import jwt_decode from "jwt-decode";
import Input from "../../Components/Input/Input";
import { useNavigate } from "react-router-dom";
import { APIENDPOINT } from "../../api/API";
import "./ChatRoom.css";
import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectedRoom } from "../../redux";
import { setUsers } from "../../redux/userSlice/userSlice";

const { io } = require("socket.io-client");
const socket = io(APIENDPOINT);

const ChatRoom = () => {
  const [msgs, setMsgs] = useState({
    joinmessage: [],
    messages: [],
    leavemessage: [],
  });
  // const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const room = useSelector((state) => state.selectedRoom.selectedRoom);
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  const token = window.localStorage.getItem("token");
  const decoded = jwt_decode(token);

  useAuth(socket);

  useEffect(() => {
    socket.emit("joinRoom", room);

    socket.on("message", (msg) => {
      const messageContainer = document.getElementById("wlc");
      messageContainer.innerHTML = msg.username + " " + msg.text;
    });

    // socket.emit("getroominfo", room);

    socket.on("new message", (data) => {
      // console.log("Received message:", data.message, "from", data.name);
      setMsgs((prevMsgs) => ({
        ...prevMsgs,
        messages: [...prevMsgs.messages, data],
      }));
    });

    socket.on("newRoomEvent", (msg) => {
      if (msg.username !== decoded.username) {
        setSnackbarMessage(msg.msg);
        setSnackbarOpen(true);
      }
    });

    return () => {
      socket.off("new message");
      socket.off("info");
    };
  }, [decoded.username]);

  socket.on("allUser", (data) => {
/*     const filteredData = data.filter(
      (obj) => obj.username !== decoded.username
    ); */
    // setUsers(filteredData);
    dispatch(setUsers({ users: data, currentUser: decoded.username, currentRoom: room }));
  });

  socket.on("roomUsers", (data) => {
    dispatch(setUsers({ users: data, currentUser: decoded.username }));
  });

  useEffect(() => {
    socket.on("info", (msg) => {
      // console.log("info:", msg.username, msg.text, msg);
      setMsgs((prevMsgs) => {
        const exists = prevMsgs.joinmessage.some(
          (m) => m.username === msg.username
        );
        if (!exists) {
          return {
            ...prevMsgs,
            joinmessage: [...prevMsgs.joinmessage, msg],
          };
        }
        return prevMsgs;
      });
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("new message", room, input);
    setInput("");
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    socket.disconnect();
    navigate(-1);
    dispatch(resetSelectedRoom());
  };

  useEffect(() => {
    socket.on("leavemessage", (message) => {
      // console.log("leave:", message.username, message.text);
      setMsgs((prevMsgs) => ({
        ...prevMsgs,
        leavemessage: [...prevMsgs.leavemessage, message],
      }));
    });
    return () => {
      socket.off("leavemessage");
    };
  });

  return (
    <div className="chat-room-main">
      <div className="chat-room">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
        <div>You are entered in {room} chat</div>
        {users.map((u) => (
          <div key={u.id}>
            <p>{u.username}</p>
          </div>
        ))}
        <div id="wlc"></div>
        {msgs.joinmessage.map((msg, index) => (
          <div key={`join-${index}`}>
            <p id="wlc">
              {msg.username} {msg.text}
            </p>
          </div>
        ))}
        {msgs.messages.map((m) => (
          <div key={Date.now() + Math.random()}>
            <Message
              user={m.name}
              message={m.message}
              time={m.time}
              name={decoded.username}
            />
          </div>
        ))}
        {msgs.leavemessage.map((msg, index) => (
          <div key={`leave-${index}`}>
            <p id="wlc">
              {msg.username} {msg.text}
            </p>
          </div>
        ))}
        <Input
          className="cta-ip-chatroom"
          message={input}
          setMessage={setInput}
          sendMessage={sendMessage}
        />
        <div className="leave-flex">
          <button className="leave-btn" onClick={leaveRoom}>
            Leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
