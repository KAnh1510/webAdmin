import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersApi from "~/api/userApi";

export const UserSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    values: [],
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.values = action.payload;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.values = action.payload;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.values.push(action.payload);
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        action.payload = state.values.find(
          (user) => user === action.payload.id
        );
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        let index = state.values.findIndex(
          ({ id }) => id === action.payload.id
        );
        state.values.splice(index, 1);
      });
  },
});

export const registerUser = createAsyncThunk(
  "usersApi/register",
  async ({
    name,
    email,
    address,
    phoneNumber,
    birthday,
    role,
    gender,
    password,
    create_at,
    status,
  }) => {
    const res = await usersApi.register({
      name,
      email,
      address,
      phoneNumber,
      birthday,
      role,
      gender,
      password,
      create_at,
      status,
    });
    return res;
  }
);

export const getAllUsers = createAsyncThunk("users/getAll", async () => {
  const res = await usersApi.getAll();
  return res;
});

export const getUser = createAsyncThunk("users/get", async (id) => {
  const res = await usersApi.get(id);
  return [res];
});

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }) => {
    const res = await usersApi.update(id, data);
    return res;
  }
);

export const deleteUser = createAsyncThunk("users/delete", async ({ id }) => {
  await usersApi.delete(id);
  return { id };
});

export default UserSlice;
