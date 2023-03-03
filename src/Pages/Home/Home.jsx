import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Home.css";
import LinkSwitcher from "../../Components/LinkSwitcher/LinkSwitcher";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import landImg from "../../Res/home-buddies.svg";
import Navbar from "../../Navbar";
import { APIENDPOINT } from "../../api/API";
import useAuth from "../../auth/useAuth";
import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "../../redux/room/roomActions";
import { selectRoom } from "../../redux";
import Spinner from "../../Components/Spinner/Spinner";

const { io } = require("socket.io-client");
const socket = io(APIENDPOINT);

const Home = () => {
  const [room, setRoom] = useState("");
  // const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const allRooms = useSelector((state) => state.room.rooms);
  const dispatch = useDispatch();

  useAuth(socket);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
      // socket.emit("allRooms");
      socket.on("allRooms", (data) => {
        dispatch(setRooms(data));
        setLoading(false);
      });
    });

    socket.on("newRoomEvent", (msg) => {
      console.log(msg);
      setSnackbarMessage(msg.msg);
      setSnackbarOpen(true);
    });

    socket.on("updateRooms", (data) => {
      dispatch(setRooms(data));
    });

    return () => {
      socket.off("newRoomEvent");
      socket.off("updateRooms");
    };
  }, [dispatch]);

  if(loading) return <Spinner />;

  const createRoom = (e) => {
    e.preventDefault();
    socket.emit("createRoom", room);
    dispatch(selectRoom(room));
    navigate("chat-room");
    setRoom("");
  };

  const joinRoom = (e) => {
    e.preventDefault();
    dispatch(selectRoom(selectedRoom));
    navigate("chat-room");
  };

  return (
    <LinkSwitcher>
      <div className="main-home">
        <Navbar />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
        <div className="wlcm-txt">
          <h2 className="home-head">
            Hey! Welcome to Chat AR<span className="style-e">é</span>NA
          </h2>
          <p className="ani-txt">Let's</p>
          <p className="span-txt">
            <span className="animated-txt"></span>
          </p>
          <div className="img-back">
            <img alt="" className="img-login-home" src={landImg}></img>
            <img alt="" className="img-login-k" src={landImg}></img>

            {/* <img alt='background-img' src='./Res/login-img.png'></img> */}
          </div>
          <div
            className="scroll-hit"
            onClick={() => window.location.replace("#create-rm")}
          >
            <p>Create Room</p>
            <FaExternalLinkSquareAlt />
          </div>
        </div>
        <div className="page-2" id="create-rm">
          <div className="flexbox-p2">
            <div className="create-room-box">
              <div className="main-home-child">
                <p className="head-join-create">Create Room</p>
              </div>
              <div className="create-room-div">
                <form onSubmit={createRoom}>
                  <div className="room-name-txt">
                    <label>
                      <input
                        placeholder="Enter room name"
                        className="cta-txt-home-page"
                        type="text"
                        value={room}
                        required
                        onChange={(e) => setRoom(e.target.value)}
                      />
                    </label>
                    <button className="cta-home-btns" type="submit">
                      Create Room
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="join-room-box">
              <div className="main-home-child-2">
                <p className="head-join-create">Join Room</p>
              </div>
              <div className="join-room-div">
                <form onSubmit={joinRoom}>
                  <div className="select-room-drp-dwn">
                    <label>
                      <select
                        className="cta-drp-dwn"
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                      >
                        <option className="drp-dwn-dft" value={null} hidden>
                          Select an option
                        </option>
                        {allRooms.map((room) => (
                          <option className="drp-dwn-option" key={room._id}>
                            {room.roomName}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      className="cta-home-btns"
                      type="submit"
                      disabled={!selectedRoom}
                    >
                      Join Room
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LinkSwitcher>
  );
};

export default Home;
