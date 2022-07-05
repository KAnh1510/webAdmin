import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ordersApi from "~/api/ordersApi";

export const OrdersSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    values: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(findOrdersByNameUser.fulfilled, (state, action) => {
        state = [...action.payload];
      });
  },
});

export const getAllOrders = createAsyncThunk("orders/getAll", async () => {
  const res = await ordersApi.getAll();
  return res;
});

export const getOrders = createAsyncThunk("orders/get", async (id) => {
  const res = await ordersApi.get(id);
  return [res];
});

export const findOrdersByNameUser = createAsyncThunk(
  "orders/findByNameUser",
  async ({ name }) => {
    const res = await ordersApi.findByTitle(name);
    return res.data;
  }
);

export default OrdersSlice;
