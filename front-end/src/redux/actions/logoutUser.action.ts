import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../util/errorHandler";
import { axiosInstance } from "../../config/axiosInstance";

export const userLogoutAction: AsyncThunk<undefined, void, object> =
  createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/logout`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  });
