import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import ChatRoom from "./ChatRoom";
import useAuth from "./auth/useAuth";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const { io } = require("socket.io-client");
const socket = io("http://192.168.29.18:5000/");

function App() {
  useAuth(socket);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />} >
          <Route element={<Home />} path='/home' />
          <Route element={<ChatRoom />} path='/home/chat-room' />
        </Route>
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
