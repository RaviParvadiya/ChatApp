import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: { users: [] },
  reducers: {
    setUsers: (state, action) => {
      const currentUser = action.payload.currentUser;
      const currentRoom = action.payload.currentRoom;
      state.users = action.payload.users.filter(
        (user) => user.username !== currentUser && user.room == currentRoom
      );
    },
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
