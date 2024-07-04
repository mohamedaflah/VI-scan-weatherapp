import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../util/errorHandler";

export const userLoginAction: AsyncThunk<
  undefined,
  { email: string; password: string },
  object
> = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
