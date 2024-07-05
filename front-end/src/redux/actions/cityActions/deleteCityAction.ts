import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../../util/errorHandler";
import { axiosInstance } from "../../../config/axiosInstance";

export const deleteCity: AsyncThunk<
  undefined,
  { userId: string; cityId: string },
  object
> = createAsyncThunk(
  "user/delete-city",
  async (body: { userId: string; cityId: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/favorites?userId=${body.userId}&cityId=${body.cityId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
//   userId, cityId -> delete
