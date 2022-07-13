import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "~/api/authApi";
export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    values: [],
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.values = action.payload;
      })

      .addCase(deleteAuthUser.fulfilled, (state, action) => {
        let index = state.values.findIndex(
          ({ id }) => id === action.payload.id
        );
        state.values.splice(index, 1);
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.values.push(action.payload);
      });
  },
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ role, user_id, email, password }) => {
    const res = await authApi.login({
      user_id,
      role,
      email,
      password,
    });
    return res;
  }
);

export const getAuthUser = createAsyncThunk("auth/getAll", async () => {
  const res = await authApi.getAll();
  return res;
});

export const deleteAuthUser = createAsyncThunk(
  "auth/delete",
  async ({ id }) => {
    await authApi.delete(id);
    return { id };
  }
);

export default AuthSlice;
