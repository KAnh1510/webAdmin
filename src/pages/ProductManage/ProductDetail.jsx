import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "~/components/Header";
import styles from "./ProductManage.module.scss";
import classnames from "classnames/bind";
import { getProduct } from "./ProductSlice";
import { useDispatch, useSelector } from "react-redux";

const cx = classnames.bind(styles);
function ProductDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const productItem = useSelector((state) => state.products.values);

  useEffect(() => {
    dispatch(getProduct(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      <Header title="Quản lý sản phẩm" />
      <div className="table-wrapper">
        {productItem &&
          productItem.map((product) => {
            return (
              <div key={product.id}>
                <div className={cx("name-prd")}>
                  <h2>{product.name}</h2>
                </div>

                <div className="row mb-4">
                  <div className="col l-6">
                    <span style={{ fontSize: "1.6rem" }}>Số lượng: </span>
                    <span style={{ fontSize: "1.3rem", color: "red" }}>
                      {product.number ? product.number : ""}{" "}
                      <span>sản phẩm</span>
                    </span>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col l-6">
                    <h4>Mô tả sản phẩm: </h4>
                    <p>{product.desc ? product.desc : ""}</p>
                  </div>
                </div>

                <div className={cx("gallery")}>
                  <ul className="row">
                    {product.gallery &&
                      product.gallery.map((gallery) => (
                        <li className="col l-3" key={gallery.id}>
                          <img src={gallery.src} alt="" />
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            );
          })}
        <div className="row mb-4" style={{ justifyContent: "flex-end" }}>
          <button
            className="btn btn-primary btn-block col l-2"
            onClick={() => navigate("/products")}
          >
            Quay lại
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
