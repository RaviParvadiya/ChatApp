import React from "react";
import "./input.css";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="">
      <form className="input-form" onSubmit={sendMessage}>
        <input
          className=""
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Input;
