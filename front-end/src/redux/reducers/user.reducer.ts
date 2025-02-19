import { createSlice } from "@reduxjs/toolkit";
import { UserReducerInitial } from "../../types/user.types";
import { userSignupAction } from "../actions/userSignp.action";
import toast from "react-hot-toast";
import { userLoginAction } from "../actions/userLoginaction";
import { verifyUser } from "../actions/verifyUseraction";
import { getUserAction } from "../actions/gerUseraction";
import { userLogoutAction } from "../actions/logoutUser.action";
import { addCity } from "../actions/cityActions/addCityAction";

const initialState: UserReducerInitial = {
  loading: false,
  err: false,
  user: null,
  verificationSend: false,
  selectedCity: null,
};
const userReducer = createSlice({
  name: "user reducer",
  initialState,
  reducers: {
    setSelectedCity: (state, { payload }) => {
      state.selectedCity = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignupAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignupAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.verificationSend = true;
        state.user = payload.user;
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
        toast.success("Login successful");
      })
      .addCase(userLoginAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        state.user = null;
        toast.error(state.err);
      })
      .addCase(verifyUser.pending, (state) => {
        state.loading = false;
      })
      .addCase(verifyUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        state.user = (payload as any).user;
        state.err = false;
        toast.success("Verification successful");
      })
      .addCase(verifyUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.err = payload as string;
        toast.error(state.err);
      })
      .addCase(getUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        state.user = (payload as any).user;
        state.err = false;
      })
      .addCase(getUserAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = String(payload);
        state.user = null;
      })
      .addCase(userLogoutAction.pending, (state) => {
        state.loading = false;
      })
      .addCase(userLogoutAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        payload;
        state.err = false;
        state.user = null;
        toast.success("Logout successful");
      })
      .addCase(userLogoutAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = String(payload);
        toast.error(state.err);
      })
      .addCase(addCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCity.fulfilled, (state, { payload }) => {
        state.loading = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        state.user = (payload as any).user;
        toast.success("City added");
      })
      .addCase(addCity.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload as string;
        toast.error(state.err);
      });
  },
});
export const { setSelectedCity } = userReducer.actions;
export default userReducer.reducer;
