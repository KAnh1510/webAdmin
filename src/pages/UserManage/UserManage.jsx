import React, { useEffect } from "react";
import styles from "./UserManage.module.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import Table from "../../components/Table";

import Header from "../../components/Header";
import { deleteUser, getAllUsers } from "./UserSlice";

const cx = classnames.bind(styles);
function UserManage() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.values);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleRemoveUser = (id) => {
    dispatch(deleteUser({ id: id }));
  };

  return (
    <>
      <Header title="Quản lý người dùng" />
      <Table title="người dùng" path="user">
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Ngày sinh</th>
              <th>Giới tính</th>
              <th>Ngày tạo</th>
              <th>Quyền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => {
              const {
                name,
                address,
                email,
                phoneNumber,
                birthday,
                gender,
                role,
                create_at,
              } = user;

              return (
                <tr key={index}>
                  <td>
                    <Link to="/">{name ? name : ""}</Link>
                  </td>
                  <td>{email ? email : ""}</td>
                  <td>{address ? address : ""}</td>
                  <td>{phoneNumber ? phoneNumber : ""}</td>
                  <td>{birthday ? birthday : " "}</td>
                  <td>{gender ? gender : ""}</td>
                  <td>{create_at}</td>
                  <td>{role}</td>
                  <td>
                    <div>
                      <Link to={`edit-user/${user.id}`}>
                        <button
                          className={cx("btn", "settings")}
                          title="Edits"
                          data-toggle="tooltip"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                      </Link>
                      <button
                        className={cx("btn", "delete")}
                        title="Delete"
                        data-toggle="tooltip"
                        onClick={() => handleRemoveUser(user.id)}
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

export default UserManage;
