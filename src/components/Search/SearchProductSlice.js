import { createSlice } from "@reduxjs/toolkit";

const searchProductSlice = createSlice({
  name: "products",
  initialState: {
    search: "",
  },
  reducers: {
    searchProductChange: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default searchProductSlice;
