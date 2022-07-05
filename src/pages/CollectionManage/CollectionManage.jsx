import React, { useEffect, useState } from "react";
import styles from "./CollectionManage.module.scss";
import classnames from "classnames/bind";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCollections } from "./CollectionSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

function CollectionManage() {
  const dispatch = useDispatch();
  const collectionList = useSelector((state) => state.collections.values);
  const productList = useSelector((state) => state.products.values);

  useEffect(() => {
    dispatch(getAllCollections());
    dispatch(getAllCollections());
  }, []);

  const collections = [...collectionList];
  const [currentPage, setCurrentPage] = useState(1);
  const [CollectionsPerPage] = useState(3);
  const sortedCollections = collections.sort((a, b) =>
    a.name < b.name ? -1 : 1
  );

  const indexOfLastCollection = currentPage * CollectionsPerPage;
  const indexOfFirstCollection = indexOfLastCollection - CollectionsPerPage;
  const currentCollections = sortedCollections.slice(
    indexOfFirstCollection,
    indexOfLastCollection
  );
  const totalPagesNum = Math.ceil(
    sortedCollections.length / CollectionsPerPage
  );

  const handleRemoveCollection = () => {};

  return (
    <div>
      <Header title="Quản lý danh mục" />
      <Table
        title="danh mục"
        totalPagesNum={totalPagesNum}
        currentUsers={currentCollections}
        sortedUsers={sortedCollections}
        setCurrentPage={setCurrentPage}
      >
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
                        onClick={() => handleRemoveCollection(collection.id)}
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
    </div>
  );
}

export default CollectionManage;
