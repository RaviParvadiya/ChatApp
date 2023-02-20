import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Home.css";
import LinkSwitcher from "../../Components/LinkSwitcher/LinkSwitcher";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import landImg from "../../Res/home-buddies.svg";
import Navbar from "../../Navbar";
import { APIENDPOINT } from "../../api/API";

const { io } = require("socket.io-client");
const socket = io(APIENDPOINT);

const Home = () => {
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const navigate = useNavigate();

  window.localStorage.setItem("room", selectedRoom);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token !== null) {
      socket.auth = { token: token };
      socket.connect();
    } else {
      navigate('/login');
    }
    socket.on("connect", () => {
      console.log(socket.id);
    });
  }, [navigate]);

  useEffect(() => {
    console.log('1',socket.emit("allRooms"));
   console.log('2',socket.on("allRooms", (data) => {
      console.log('rm', data);
      setRooms(data);
    }));
  });

  const createRoom = (e) => {
    e.preventDefault();
    socket.emit("joinRoom", room);
    setRoom("");
  };

  const joinRoom = (e) => {
    e.preventDefault();
    navigate("chat-room");
  };

  return (
    <LinkSwitcher>
      <div className="main-home">
        <Navbar />

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
                        {rooms.map((room) => (
                          <option
                            className="drp-dwn-option"
                            key={room._id}
                          >
                            {room.roomName}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button className="cta-home-btns" type="submit" disabled={!selectedRoom}>
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
