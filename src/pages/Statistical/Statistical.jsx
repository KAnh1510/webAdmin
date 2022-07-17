import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "~/components/Header";
import { getAllOrders } from "../OrderManage/OrdersSlice";

function Statistical() {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orders.values);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

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
          {orderList.map((order) => {
            const temp = new Date(order.create_at);
            let total = 0;

            const month = temp.getMonth() + 1; // tháng
            const year = temp.getFullYear(); // năm

            return (
              <tr>
                <td>
                  {month} / {year}
                </td>
                <td>{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Statistical;
