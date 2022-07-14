import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "~/api/authApi";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    values: [],
  },

  reducers: {
    logout(state) {
      //clear local storage
      state.current = {};
      localStorage.removeItem("currentAdmin");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.values.push(action.payload);
    });
  },
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ role, user_id, email, password, login_at }) => {
    const res = await authApi.login({
      user_id,
      role,
      email,
      password,
      login_at,
    });
    localStorage.setItem("currentAdmin", JSON.stringify(res));
    return res;
  }
);

export const { logout } = AuthSlice.actions;
export default AuthSlice;
