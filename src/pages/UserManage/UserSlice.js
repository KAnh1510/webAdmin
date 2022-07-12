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

      .addCase(createUser.fulfilled, (state, action) => {
        state.values.push(action.payload);
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        // const existingUser = state.values.find((usersApi => usersApi === id);
        action.payload = state.values.find(
          (user) => user === action.payload.id
        );
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        let index = state.values.findIndex(
          ({ id }) => id === action.payload.id
        );
        state.values.splice(index, 1);
      })

      .addCase(findUsersByName.fulfilled, (state, action) => {
        state.values = [...action.payload];
      });
  },
});

export const createUser = createAsyncThunk(
  "usersApi/create",
  async ({
    name,
    email,
    address,
    phoneNumber,
    birthday,
    role,
    gender,
    password,
  }) => {
    const res = await usersApi.create({
      name,
      email,
      address,
      phoneNumber,
      birthday,
      role,
      gender,
      password,
    });
    return res.data;
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

export const deleteAllUsers = createAsyncThunk("users/deleteAll", async () => {
  const res = await usersApi.deleteAll();
  return res.data;
});

export const findUsersByName = createAsyncThunk(
  "users/findByName",
  async ({ name }) => {
    const res = await usersApi.findByTitle(name);
    return res.data;
  }
);

export default UserSlice;
