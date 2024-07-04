import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../util/errorHandler";
import { axiosInstance } from "../../config/axiosInstance";

export const userLoginAction: AsyncThunk<
  undefined,
  { email: string; password: string },
  object
> = createAsyncThunk(
  "user/login",
  async (
    userdata: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post("/login", userdata);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
