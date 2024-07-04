import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../util/errorHandler";
import { axiosInstance } from "../../config/axiosInstance";

export const verifyUser: AsyncThunk<undefined, string, object> =
  createAsyncThunk(
    "user/verify",
    async (token: string, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.post(`/verify`, { token });
        return data;
      } catch (error) {
        return rejectWithValue(handleErrors(error));
      }
    }
  );
