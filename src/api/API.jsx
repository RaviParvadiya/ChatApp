import axios from "axios";

export default axios.create({
  baseURL: `http://192.168.29.20:5000/`,
});

export const APIENDPOINT = "http://192.168.29.20:5000/";
