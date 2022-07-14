import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCollection from "./components/Add/AddCollection";
import AddProduct from "./components/Add/AddProduct";
import AddUser from "./components/Add/AddUser";
import EditCollection from "./components/Edit/EditCollection";
import EditProduct from "./components/Edit/EditProduct";
import EditUser from "./components/Edit/EditUser";
import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./pages/Login/Login";
import OrderDetail from "./pages/OrderManage/OrderDetail";
import ProductDetail from "./pages/ProductManage/ProductDetail";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import { publicRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {publicRoutes.map((route, index) => {
            let Page = route.component;
            let Layout = DefaultLayout;

            return (
              <Route
                key={index}
                path={`/${route.path}`}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          <Route
            path="users/add-user"
            element={
              <DefaultLayout>
                <AddUser />
              </DefaultLayout>
            }
          />
          <Route
            path="users/edit-user/:id"
            element={
              <DefaultLayout>
                <EditUser />
              </DefaultLayout>
            }
          />
          <Route
            path="products/add-product"
            element={
              <DefaultLayout>
                <AddProduct />
              </DefaultLayout>
            }
          />
          <Route
            path="products/edit-product/:id"
            element={
              <DefaultLayout>
                <EditProduct />
              </DefaultLayout>
            }
          />
          <Route
            path="products/detail/:id"
            element={
              <DefaultLayout>
                <ProductDetail />
              </DefaultLayout>
            }
          />
          <Route
            path="orders/order_detail/:id"
            element={
              <DefaultLayout>
                <OrderDetail />
              </DefaultLayout>
            }
          />
          <Route
            path="collections/add-undefined"
            element={
              <DefaultLayout>
                <AddCollection />
              </DefaultLayout>
            }
          />
          <Route
            path="collections/edit-collection/:id"
            element={
              <DefaultLayout>
                <EditCollection />
              </DefaultLayout>
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
