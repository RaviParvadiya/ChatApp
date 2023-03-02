import { combineReducers } from "redux";
import roomReducer from "./room/roomReducer";
import selectRoomReducer from "./selectRoom/selectRoomReducer";

const rootReducer = combineReducers({
  room: roomReducer,
  selectedRoom: selectRoomReducer
});

export default rootReducer;
