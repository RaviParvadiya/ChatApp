import { SELECT_ROOM } from "./selectRoomTypes";

export const selectRoom = (room) => {
  return {
    type: SELECT_ROOM,
    payload: room,
  };
};

export const resetSelectedRoom = () => {
  return {
    type: 'RESET_SELECTED_ROOM',
  };
};
