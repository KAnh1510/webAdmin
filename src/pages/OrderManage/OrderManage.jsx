import React, { useEffect, useState } from "react";
import styles from "./Order.module.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Table from "../../components/Table";
import Header from "../../components/Header";
import { getAllOrders } from "./OrdersSlice";
import { getAllUsers } from "../UserManage/UserSlice";

const cx = classnames.bind(styles);
function OrderManage() {
  const dispatch = useDispatch();
  const ordersList = useSelector((state) => state.orders.values);
  const usersList = useSelector((state) => state.users.values);

  const orders = [...ordersList];
  const [currentPage, setCurrentPage] = useState(1);
  const [OrdersPerPage] = useState(7);
  const sortedOrders = orders.sort((a, b) => (a.name < b.name ? -1 : 1));

  const indexOfLastOrder = currentPage * OrdersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - OrdersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPagesNum = Math.ceil(sortedOrders.length / OrdersPerPage);

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <Header title="Quản lý đơn hàng" />
      <Table
        totalPagesNum={totalPagesNum}
        current={currentOrders}
        sorted={sortedOrders}
        setCurrentPage={setCurrentPage}
      >
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>Tên khách hàng</th>
              <th>Địa chỉ</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Ngày tạo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => {
              let name = "";
              let email = "";
              let address = "";
              let phone_number = "";
              return (
                <tr key={index}>
                  {usersList.forEach((user) => {
                    if (user.id === order.user_id) {
                      name = user.name;
                      email = user.email;
                      address = user.address;
                      phone_number = user.phoneNumber;
                    }
                  })}
                  <td>{name}</td>
                  <td className={cx("td-2")}>{address}</td>
                  <td>{email}</td>
                  <td>{phone_number}</td>
                  <td>{order.create_at}</td>
                  <td>
                    <Link to={`order_detail/${order.id}`}>
                      Chi tiết đơn hàng
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Table>
    </div>
  );
}

export default OrderManage;
