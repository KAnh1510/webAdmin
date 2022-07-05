import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderDetailApi from "~/api/orderDetailApi";

export const OrderDetailSlice = createSlice({
  name: "order_detail",
  initialState: {
    loading: false,
    values: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrderDetail.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getOrderDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getOrderDetail.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updateOrderDetail.fulfilled, (state, action) => {
        action.payload = state.values.find(
          (product) => product === action.payload.id
        );
      })

      .addCase(deleteOrderDetail.fulfilled, (state, action) => {
        let index = state.values.findIndex(
          ({ id }) => id === action.payload.id
        );
        state.values.splice(index, 1);
      })

      .addCase(deleteOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.values = [];
      });
  },
});
export const getAllOrderDetail = createAsyncThunk("orders/getAll", async () => {
  const res = await orderDetailApi.getAll();
  return res;
});

export const getOrderDetail = createAsyncThunk(
  "order_detail/get",
  async (id) => {
    const res = await orderDetailApi.get(id);
    return [res];
  }
);

export const updateOrderDetail = createAsyncThunk(
  "order_detail/update",
  async ({ id, data }) => {
    const res = await orderDetailApi.update(id, data);
    return res;
  }
);

export const deleteOrderDetail = createAsyncThunk(
  "order_detail/delete",
  async ({ id }) => {
    await orderDetailApi.delete(id);
    return { id };
  }
);
export default OrderDetailSlice;
