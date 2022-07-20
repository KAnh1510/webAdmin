import React, { useEffect } from "react";
import styles from "./Order.module.scss";
import classnames from "classnames/bind";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header";
import { deleteOrderDetail, getAllOrderDetail } from "./OrderDetailSlice";
import { getAllProducts } from "../ProductManage/ProductSlice";
import VndFormat from "~/components/VndFormat/VndFormat";

const cx = classnames.bind(styles);
function OrderDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetailList = useSelector((state) => state.order_detail.values);
  const productList = useSelector((state) => state.products.values);
  const currentOrderDetail = orderDetailList.filter(
    (item) => item.order_id === parseInt(params.id, 10)
  );

  useEffect(() => {
    dispatch(getAllOrderDetail());
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleRemoveProduct = (id) => {
    dispatch(deleteOrderDetail({ id: id }));
  };

  return (
    <div>
      <Header title="Quản lý đơn hàng" />
      <div className="table-wrapper">
        <table className={cx("table")}>
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Màu</th>
              <th>Size</th>
              <th>Số lượng</th>
              <th>Ảnh</th>
              <th></th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {currentOrderDetail.map((order_detail) => {
              let { id, number, product_id, color, size } = order_detail;
              let name_prd = "";
              let prices = 0;
              let imgFront = "";

              return (
                <tr key={order_detail.id} className={cx("tr-2")}>
                  {productList.forEach((product) => {
                    const check = product.id === product_id;
                    if (check) {
                      name_prd = product.name;
                      prices = product.prices;
                      imgFront = product.imgFront;
                    }
                  })}
                  <td>{name_prd}</td>
                  <td>{prices && VndFormat(prices)}</td>
                  <td>
                    <span
                      style={{
                        padding: "6px 16px",
                        borderRadius: "50%",
                        backgroundColor: `${color}`,
                      }}
                    ></span>
                  </td>

                  <td>{size ? size : ""}</td>
                  <td>{number}</td>
                  <td>
                    <img src={imgFront} alt="front" />
                  </td>
                  <td>
                    <div>
                      <Link to={`edit-product/${id}`}>
                        <button
                          className={cx("btn", "settings")}
                          title="Settings"
                          data-toggle="tooltip"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                      </Link>
                      <button
                        className={cx("btn", "delete")}
                        title="Delete"
                        data-toggle="tooltip"
                        onClick={() => handleRemoveProduct(id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </td>
                  <td style={{ color: "red", fontWeight: "600" }}>
                    {prices && VndFormat(prices * number)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="row mb-4" style={{ justifyContent: "flex-end" }}>
          <button
            className="btn btn-primary btn-block col l-2"
            onClick={() => navigate("/orders")}
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
