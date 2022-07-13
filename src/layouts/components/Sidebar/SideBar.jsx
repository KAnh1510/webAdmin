import React, { useState } from "react";
import styles from "./SideBar.module.scss";
import classnames from "classnames/bind";
import { NavLink } from "react-router-dom";
import Logout from "~/pages/Logout";

const cx = classnames.bind(styles);

const SIDEBAR_MENU = [
  {
    title: "Tài khoản của bạn",
    link: "/account",
    icon: "person-outline",
  },
  {
    title: "Quản lý người dùng",
    link: "/users",
    icon: "people-outline",
  },
  {
    title: "Quản lý danh mục",
    link: "/collections",
    icon: "albums-outline",
  },
  {
    title: "Quản lý sản phẩm",
    link: "/products",
    icon: "chatbox-outline",
  },
  {
    title: "Quản lý đơn hàng",
    link: "/orders",
    icon: "cart-outline",
  },
  {
    title: "Thống kê",
    link: "/statistical",
    icon: "bar-chart-outline",
  },
];

function SideBar() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const handleLogout = () => {
    setConfirmLogout(true);
  };
  return (
    <>
      <div
        className={showSidebar ? cx("navigation") : cx("navigation", "active")}
      >
        <ul>
          {SIDEBAR_MENU.map((item, index) => {
            const { title, link, icon } = item;
            return (
              <li className={cx("list")} key={index}>
                <NavLink
                  to={link}
                  className={({ isActive }) => (isActive ? cx("active") : " ")}
                  title={title}
                >
                  <span className={cx("icon")}>
                    <ion-icon name={icon}></ion-icon>
                  </span>
                  <span className={cx("title")}>{title}</span>
                </NavLink>
              </li>
            );
          })}
          <li
            className={cx("list")}
            style={{ display: "flex", color: "#fff", cursor: "pointer" }}
          >
            <span
              className={cx("icon")}
              style={{ display: "inline-block", width: "60px" }}
            >
              <ion-icon name="log-out-outline"></ion-icon>
            </span>
            <span className={cx("title")} onClick={handleLogout}>
              Đăng xuất
            </span>
          </li>
          {confirmLogout ? (
            <Logout setConfirmLogout={setConfirmLogout} />
          ) : (
            <></>
          )}
        </ul>

        <div className={cx("toggle")}>
          <ion-icon
            name="menu-outline"
            onClick={() => setShowSidebar(true)}
            style={showSidebar ? { display: "none" } : { display: "block" }}
          ></ion-icon>
          <ion-icon
            name="close-outline"
            onClick={() => setShowSidebar(false)}
            style={showSidebar ? { display: "block" } : { display: "none" }}
          ></ion-icon>
        </div>
      </div>
    </>
  );
}

export default SideBar;
