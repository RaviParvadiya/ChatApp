import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/SignIn/Login";
import SignUp from "./Pages/Registration/SignUp";
import ChatRoom from "./Pages/Chat/ChatRoom";
import ProtectedRoute from "./Components/PrivateRoute/ProtectedRoute";
import useAuth from "./auth/useAuth";
import { APIENDPOINT } from "./api/API";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

const { io } = require("socket.io-client");
const socket = io(APIENDPOINT);
let persistor = persistStore(store);

function App() {
  useAuth(socket);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
    </PersistGate>
    </Provider>
  );
}

export default App;
