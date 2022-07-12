import React, { useEffect, useState } from "react";
import styles from "./UserManage.module.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import Table from "../../components/Table";

import Header from "../../components/Header";
import { format } from "date-fns/esm";
import { deleteUser, getAllUsers } from "./UserSlice";

const cx = classnames.bind(styles);
function UserManage() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.values);
  console.log(userList);

  const users = [...userList];
  const [currentPage, setCurrentPage] = useState(1);
  const [UsersPerPage] = useState(6);
  const sortedUsers = users.sort((a, b) => (a.name < b.name ? -1 : 1));

  const indexOfLastUser = currentPage * UsersPerPage;
  const indexOfFirstUser = indexOfLastUser - UsersPerPage;
  // const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPagesNum = Math.ceil(sortedUsers.length / UsersPerPage);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleRemoveUser = (id) => {
    dispatch(deleteUser({ id: id }));
  };

  return (
    <>
      <Header title="Quản lý người dùng" />
      <Table
        title="người dùng"
        path="user"
        totalPagesNum={totalPagesNum}
        current={userList}
        sorted={sortedUsers}
        setCurrentPage={setCurrentPage}
      >
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
              return (
                <tr key={index}>
                  <td>
                    <Link to="/">{user.name ? user.name : ""}</Link>
                  </td>
                  <td>{user.email ? user.email : ""}</td>
                  <td>{user.address ? user.address : ""}</td>
                  <td>{user.phoneNumber ? user.phoneNumber : ""}</td>
                  <td>{user.birthday ? user.birthday : ""}</td>
                  <td>{user.gender ? user.gender : ""}</td>
                  <td>12/10/2022</td>
                  <td>{user.role ? user.role : ""}</td>
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
