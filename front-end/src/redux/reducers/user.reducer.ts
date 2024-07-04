import { createSlice } from "@reduxjs/toolkit";
import { UserReducerInitial } from "../../types/user.types";
import { userSignupAction } from "../actions/userSignp.action";
import toast from "react-hot-toast";
import { userLoginAction } from "../actions/userLoginaction";

const initialState: UserReducerInitial = {
  loading: false,
  err: false,
  user: null,
  verificationSend: false,
};
const userReducer = createSlice({
  name: "user reducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userSignupAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignupAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.verificationSend = true;
        toast.success(payload.message);
        state.err = false;
      })
      .addCase(userSignupAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        toast.error(state.err);
      })
      .addCase(userLoginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLoginAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        state.user = (payload as any)?.user;
        state.err = false;
      })
      .addCase(userLoginAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        toast.error(state.err);
      });
  },
});

export default userReducer.reducer;
