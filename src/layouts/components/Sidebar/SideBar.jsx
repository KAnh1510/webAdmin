import React, { useState } from "react";
import styles from "./SideBar.module.scss";
import classnames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllProducts } from "~/pages/ProductManage/ProductSlice";

const cx = classnames.bind(styles);

const SIDEBAR_MENU = [
  {
    title: "Quản lý người dùng",
    link: "/users",
    icon: "person-outline",
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
  {
    title: "Đăng xuất",
    link: "/",
    icon: "log-out-outline",
  },
];

function SideBar() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
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
  );
}

SideBar.propTypes = {};

export default SideBar;
