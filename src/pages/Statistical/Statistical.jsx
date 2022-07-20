import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "~/components/Header";
import VndFormat from "~/components/VndFormat/VndFormat";
import { getAllOrders } from "../OrderManage/OrdersSlice";

function Statistical() {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orders.values);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  let month = 0;
  let year = 0;

  let totalItem = 0;
  let arrTmp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div>
      <Header title="Thống kê" />
      <table style={{ width: "100%", margin: "10px" }}>
        <thead>
          <tr>
            <th>Tháng</th>
            <th>Tổng doanh thu</th>
          </tr>
        </thead>

        <tbody>
          {arrTmp.map((i, index) => {
            totalItem = 0;
            // eslint-disable-next-line no-loop-func
            orderList.forEach((order) => {
              const tempInter = new Date(order.create_at);
              month = tempInter.getMonth() + 1;
              year = tempInter.getFullYear();
              if (month === i) {
                totalItem += order.total_money;
              }
            });
            return totalItem === 0 ? (
              <tr key={index}></tr>
            ) : (
              <tr key={index}>
                <td>
                  {i} / {year}
                </td>
                <td>{totalItem ? VndFormat(totalItem) : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Statistical;
