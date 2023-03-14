import axios from "axios";

export default axios.create({
  baseURL: `https://chat-server-vo3q.onrender.com/`,
});

export const APIENDPOINT = "https://chat-server-vo3q.onrender.com/";


//==>  http://localhost:5000
//==>  https://chat-server-vo3q.onrender.com
