import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import collectionApi from "~/api/collectionApi";

export const CollectionSlice = createSlice({
  name: "collections",
  initialState: {
    loading: false,
    values: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollections.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCollections.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllCollections.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getCollection.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        action.payload = state.values.find(
          (collection) => collection === action.payload.id
        );
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        let index = state.values.findIndex(
          ({ id }) => id === action.payload.id
        );
        state.values.splice(index, 1);
      })
      .addCase(findCollectionsByTitle.fulfilled, (state, action) => {
        state = [...action.payload];
      });
  },
});

export const createCollection = createAsyncThunk(
  "collections/create",
  async ({ id, title }) => {
    const res = await collectionApi.create({
      id,
      title,
    });
    return res;
  }
);
export const getAllCollections = createAsyncThunk(
  "collections/getAll",
  async () => {
    const res = await collectionApi.getAll();
    return res;
  }
);

export const getCollection = createAsyncThunk("collections/get", async (id) => {
  const res = await collectionApi.get(id);
  return [res];
});

export const updateCollection = createAsyncThunk(
  "collections/update",
  async ({ id, data }) => {
    const res = await collectionApi.update(id, data);
    return res;
  }
);

export const deleteCollection = createAsyncThunk(
  "collections/delete",
  async ({ id }) => {
    await collectionApi.delete(id);
    return { id };
  }
);

export const findCollectionsByTitle = createAsyncThunk(
  "collections/findByTitle",
  async ({ title }) => {
    const res = await collectionApi.findByTitle(title);
    return res.data;
  }
);

export default CollectionSlice;
