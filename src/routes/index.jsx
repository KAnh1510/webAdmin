import CollectionManage from "../pages/CollectionManage";
import UserManage from "../pages/UserManage/UserManage";
import ProductManage from "../pages/ProductManage";
import OrderManage from "../pages/OrderManage";
import Statistical from "~/pages/Statistical";
import Account from "~/pages/Account";
import FeedBacksManage from "~/pages/FeedBacksManage";

const publicRoutes = [
  { path: "/account", component: Account },
  { path: "/users", component: UserManage },
  {
    path: "/collections",
    component: CollectionManage,
  },
  { path: "/orders", component: OrderManage },
  { path: "/products", component: ProductManage },
  { path: "/feedbacks", component: FeedBacksManage },
  { path: "/statistical", component: Statistical },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
