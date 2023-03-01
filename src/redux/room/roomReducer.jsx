import { SET_ROOMS } from "./roomTypes";

const initialState = {
  rooms: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };

    default:
      return state;
  }
};

export default roomReducer;
