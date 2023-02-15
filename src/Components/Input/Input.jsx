import React from "react";
import "./input.css";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="send-msg-flex">
      <form className="input-form" onSubmit={sendMessage}>
        <div className="input-txt-flex">
        <input
          className="cta-ip-chatroom"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        
        <button className="chatroom-send" onClick={window.scrollTo(0, document.body.scrollHeight)} type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Input;
