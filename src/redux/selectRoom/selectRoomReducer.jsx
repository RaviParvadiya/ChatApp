import { SELECT_ROOM } from "./selectRoomTypes";
import { RESET_SELECTED_ROOM } from "./selectRoomTypes";

const initialState = {
  selectedRoom: null,
};

const selectRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ROOM:
      return {
        ...state,
        selectedRoom: action.payload,
      };

      case RESET_SELECTED_ROOM:
        return {
          ...state,
          selectedRoom: null,
        };

    default:
      return state;
  }
};

export default selectRoomReducer;
