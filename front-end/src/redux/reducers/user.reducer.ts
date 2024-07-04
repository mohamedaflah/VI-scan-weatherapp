import { createSlice } from "@reduxjs/toolkit";
import { UserReducerInitial } from "../../types/user.types";

const initialState: UserReducerInitial = {
  loading: false,
  err: false,
  user: null,
};
const userReducer = createSlice({
  name: "user reducer",
  initialState,
  reducers: {},
});

export default userReducer.reducer;
