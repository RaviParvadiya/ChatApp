import "./App.css";
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Home from "./Pages/Home/Home";
import Login from "./Pages/SignIn/Login";
import SignUp from "./Pages/Registration/SignUp";
import ChatRoom from "./Pages/Chat/ChatRoom";
import ProtectedRoute from "./Components/PrivateRoute/ProtectedRoute";
=======
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import ChatRoom from "./ChatRoom";
>>>>>>> aa2ab24cb2b397d340bf4af4c95127861ec3b15f
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
