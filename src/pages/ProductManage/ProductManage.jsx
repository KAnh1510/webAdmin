import React, { useEffect } from "react";
import styles from "./ProductManage.module.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import Table from "../../components/Table";

import Header from "../../components/Header";
import { deleteProduct, getAllProducts } from "./ProductSlice";
import { getAllCollections } from "../CollectionManage/CollectionSlice";
import VndFormat from "~/components/VndFormat/VndFormat";

const cx = classnames.bind(styles);
function ProductManage() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products.values);
  const collectionList = useSelector((state) => state.collections.values);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCollections());
  }, []);

  const handleRemoveProduct = (id) => {
    dispatch(deleteProduct({ id: id }));
  };

  return (
    <>
      <Header title="Quản lý sản phẩm" />
      <Table title="sản phẩm" path="product">
        <table className={cx("table")} style={{ height: "60vh" }}>
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Loại</th>
              <th>Ghi chú</th>
              <th>Giá</th>
              <th>Màu</th>
              <th>Size</th>
              <th>Ảnh trước</th>
              <th>Ảnh sau</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product, index) => {
              const { name, prices, subtle, imgFront, imgBack, color, size } =
                product;
              let type = "";

              return (
                <tr key={index} className={cx("tr")}>
                  <td style={{ fontSize: "13px", fontWeight: 600 }}>{name}</td>
                  {collectionList.forEach((collection) => {
                    const check = collection.id === product.collection_id;
                    if (check) {
                      type = collection.title;
                    }
                  })}
                  <td>{type}</td>
                  <td>{subtle}</td>
                  <td>{VndFormat(prices)}</td>
                  <td>
                    {color
                      ? color.map((item, index) => (
                          <p
                            key={index}
                            style={{
                              backgroundColor: item.idColor,
                              marginBottom: "6px",
                              padding: "10px",
                              width: "20px",
                              borderRadius: "50%",
                              border: "1px solid #000",
                            }}
                          ></p>
                        ))
                      : ""}
                  </td>
                  <td>
                    {size
                      ? size.map((item, index) => (
                          <div key={index}>{item.name}</div>
                        ))
                      : ""}
                  </td>
                  <td>
                    <img src={imgFront} alt="front" />
                  </td>
                  <td>
                    <img src={imgBack} alt="back" />
                  </td>
                  <td>
                    <Link to={`detail/${product.id}`}>Chi tiết sản phẩm</Link>
                  </td>
                  <td>
                    <div>
                      <Link to={`edit-product/${product.id}`}>
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
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Table>
    </>
  );
}

export default ProductManage;
