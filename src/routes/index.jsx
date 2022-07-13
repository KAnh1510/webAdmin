import CollectionManage from "../pages/CollectionManage";
import UserManage from "../pages/UserManage/UserManage";
import ProductManage from "../pages/ProductManage";
import OrderManage from "../pages/OrderManage";
import Statistical from "~/pages/Statistical";
import Account from "~/pages/Account";

const publicRoutes = [
  { path: "/account", component: Account },
  { path: "/users", component: UserManage },
  {
    path: "/collections",
    component: CollectionManage,
  },
  { path: "/orders", component: OrderManage },
  { path: "/products", component: ProductManage },
  { path: "/statistical", component: Statistical },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
