import { useEffect } from "react";

const useAuth = (socket) => {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token !== null) {
      socket.auth = { token: token };
      socket.connect();
    }
  }, [socket]);
};

export default useAuth;
