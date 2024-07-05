import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../../util/errorHandler";
import { axiosInstance } from "../../../config/axiosInstance";

export const addCity: AsyncThunk<
  undefined,
  { userId: string; cityname: string },
  object
> = createAsyncThunk(
  "user/add-city",
  async (body: { userId: string; cityname: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/city/favorites`, body);
      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error)
      return rejectWithValue(handleErrors(error));
    }
  }
);

