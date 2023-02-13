import React from "react";

const Message = ({ user, message, time, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    <div>
      {isSentByCurrentUser ? (
        <div>
          <p>{message}</p>
          <p>{time}</p>
        </div>
      ) : (
        <div>
          <p>{user}</p>
          <p>{message}</p>
          <p>{time}</p>
        </div>
      )}
    </div>
  );
};

export default Message;