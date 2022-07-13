import { configureStore } from "@reduxjs/toolkit";

import { UserSlice } from "../pages/UserManage/UserSlice";
import { productSlice } from "../pages/ProductManage/ProductSlice";
import OrdersSlice from "~/pages/OrderManage/OrdersSlice";
import OrderDetailSlice from "~/pages/OrderManage/OrderDetailSlice";
import CollectionSlice from "~/pages/CollectionManage/CollectionSlice";
import AuthSlice from "~/pages/Login/AuthSlice";

const store = configureStore({
  reducer: {
    users: UserSlice.reducer,
    auth: AuthSlice.reducer,
    collections: CollectionSlice.reducer,
    products: productSlice.reducer,
    orders: OrdersSlice.reducer,
    order_detail: OrderDetailSlice.reducer,
  },
  devTools: true,
});

export default store;
