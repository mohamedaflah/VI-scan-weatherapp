import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../util/errorHandler";
import { axiosInstance } from "../../config/axiosInstance";

export const getUserAction: AsyncThunk<undefined, void, object> =
  createAsyncThunk("user/get-user", async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/get-user`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  });
