import React from "react";
import "./Message.css"

const Message = ({ user, message, time, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    <div className="msg-div">
      {isSentByCurrentUser ? (
        <div className="msg-sender-box">
        <div className="msg-curr-user">
          <p className="msg-sender">{message}</p>
          <p className="msg-time">{time}</p>
        </div>
        </div>
      ) : (
        <div className="">
          <div className="user-rec">
            <ul className="wrapper">
              <li className="icon">
                <span className="tooltip">{user.slice(0,1).toUpperCase() + user.slice(1).toLowerCase()}</span>
                <span className="single-char">{user.slice(0,1).toUpperCase()}</span>
              </li>
            </ul>
          {/* <p className="user"></p> */}
          </div>

            <div className="msg-rec-box">
              <div className="msg-receive">
                <p className="msg-rec">{message}</p>
                <p className="msg-time">{time}</p>
              </div>

            </div>
        </div>
      )}
    </div>
  );
};

export default Message;