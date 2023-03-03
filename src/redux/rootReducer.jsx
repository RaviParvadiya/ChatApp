import { combineReducers } from "redux";
import roomReducer from "./room/roomReducer";
import selectRoomReducer from "./selectRoom/selectRoomReducer";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
  room: roomReducer,
  selectedRoom: selectRoomReducer,
  user: userSlice
});

export default rootReducer;
