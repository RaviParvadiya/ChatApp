import { SET_ROOMS } from "./roomTypes";

export const setRooms = (data) => {
  return {
    type: SET_ROOMS,
    payload: data,
  };
};
