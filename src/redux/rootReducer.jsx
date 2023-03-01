import { combineReducers } from "redux";
import roomReducer from "./room/roomReducer";

const rootReducer = combineReducers({
  room: roomReducer,
});

export default rootReducer;
