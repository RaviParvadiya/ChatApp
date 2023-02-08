import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import ChatRoom from "./ChatRoom";
import ProtectedRoute from "./ProtectedRoute";
import useAuth from "./auth/useAuth";

const { io } = require("socket.io-client");
const socket = io("http://192.168.29.18:5000/");

function App() {
  useAuth(socket);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="*" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="/home/chat-room" element={<ChatRoom />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
