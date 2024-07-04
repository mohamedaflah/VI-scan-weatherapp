import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/user.types";
import { handleErrors } from "../../util/errorHandler";
import { axiosInstance } from "../../config/axiosInstance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userSignupAction:any = createAsyncThunk(
  "user/signup",
  async (user: User, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/register`, user);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
