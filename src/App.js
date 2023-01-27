import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/create-room" element={<CreateRoom />} />
      <Route path="/join-room" component={<JoinRoom />} />
    </Routes>
  );
}

export default App;
