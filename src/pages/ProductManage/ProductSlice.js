import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "~/api/productApi";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    values: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        action.payload = state.values.find(
          (product) => product === action.payload.id
        );
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        let index = state.values.findIndex(
          ({ id }) => id === action.payload.id
        );
        state.values.splice(index, 1);
      })
      .addCase(findProductsByName.fulfilled, (state, action) => {
        state = [...action.payload];
      });
  },
});

export const createProduct = createAsyncThunk(
  "product",
  async ({
    id,
    name,
    subtle,
    prices,
    imgFront,
    imgBack,
    collection_id,
    size,
    color,
    gallery,
  }) => {
    const res = await productApi.create({
      id,
      name,
      subtle,
      prices,
      imgFront,
      imgBack,
      collection_id,
      size,
      color,
      gallery,
    });
    console.log(res.data);
    return res.data;
  }
);
export const getAllProducts = createAsyncThunk("products/getAll", async () => {
  const res = await productApi.getAll();
  return res;
});

export const getProduct = createAsyncThunk("products/get", async (id) => {
  const res = await productApi.get(id);
  return [res];
});

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }) => {
    const res = await productApi.update(id, data);
    return res;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async ({ id }) => {
    await productApi.delete(id);
    return { id };
  }
);

export const findProductsByName = createAsyncThunk(
  "products/findByName",
  async ({ name }) => {
    const res = await productApi.findByTitle(name);
    return res.data;
  }
);

export default productSlice;
