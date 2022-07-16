import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames/bind";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./CollectionManage.module.scss";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { deleteCollection, getAllCollections } from "./CollectionSlice";
import { getAllProducts } from "../ProductManage/ProductSlice";

const cx = classnames.bind(styles);

function CollectionManage() {
  const [errMes, setErrMes] = useState(false);
  const dispatch = useDispatch();
  const collectionList = useSelector((state) => state.collections.values);
  const productList = useSelector((state) => state.products.values);

  useEffect(() => {
    dispatch(getAllCollections());
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleRemoveCollection = (id, count) => {
    count > 0 ? setErrMes(true) : dispatch(deleteCollection({ id: id }));
  };
  useEffect(() => {
    setErrMes(false);
  }, [errMes]);

  return (
    <div>
      {errMes ? (
        <div>
          {toast.error("Danh mục có chứa sản phẩm! Không được xóa!", {
            position: toast.POSITION.TOP_RIGHT,
          })}
          <ToastContainer />
        </div>
      ) : (
        <></>
      )}
      <Header title="Quản lý danh mục" />
      <Table title="danh mục">
        <table className={cx("table")} style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Danh mục</th>
              <th>Số lượng sản phẩm</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {collectionList.map((collection) => {
              let count = 0;
              return (
                <tr key={collection.id}>
                  <td>{collection.id}</td>
                  <td>
                    <Link to="/">{collection.title}</Link>
                  </td>

                  {productList.forEach((product) => {
                    const check = product.collection_id === collection.id;
                    if (check) {
                      count = count + 1;
                    }
                  })}
                  <td>{count}</td>
                  {collection.title === "All" ? (
                    <td></td>
                  ) : (
                    <td>
                      <div>
                        <Link to={`edit-collection/${collection.id}`}>
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
                          onClick={() =>
                            handleRemoveCollection(collection.id, count)
                          }
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Table>
    </div>
  );
}

export default CollectionManage;
