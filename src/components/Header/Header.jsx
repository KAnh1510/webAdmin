import React from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.scss";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import Search from "../Search/Search";

const cx = classnames.bind(styles);

function Header({ title }) {
  return (
    <div className={cx("content-header")}>
      <div className={cx("col l-6")}>
        <ol className={cx("breadcrumb-list")}>
          <li className={cx("breadcrumb-item")}>
            <Link to="/account">Trang chủ</Link>
          </li>
          <li className={cx("breadcrumb-item", "active")}>{title}</li>
        </ol>
      </div>
      <div className={cx("col l-6")}>
        <Search />
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
