import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/SignIn/Login";
import SignUp from "./Pages/Registration/SignUp";
import ChatRoom from "./Pages/Chat/ChatRoom";
import ProtectedRoute from "./Components/PrivateRoute/ProtectedRoute";
import useAuth from "./auth/useAuth";

const { io } = require("socket.io-client");
const socket = io("http://192.168.29.18:5000/");

function App() {
  useAuth(socket);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
