/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import styles from "./NavBar.module.scss";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);
function NavBar() {
  return (
    <nav className={cx("main-header")}>
      <ul className={cx("navbar-nav")}>
        <li className={cx("nav-item")}>
          <a className={cx("nav-link")} href="#" role="button">
            <FontAwesomeIcon icon={faBars} />
          </a>
        </li>
        <li className={cx("nav-item")}>
          <Link to="/" className={cx("nav-link")}>
            Home
          </Link>
        </li>
      </ul>
      {/* 
      <ul className={cx("navbar-nav")}>
        <li className={cx("nav-item ")}>
          <a className={cx("nav-link")} href="#">
            <FontAwesomeIcon icon={faBars} />
          </a>
        </li>
        <li className={cx("nav-item")}>
          <a className={cx("nav-link")} href="#" role="button">
            <FontAwesomeIcon icon={faSearch} />
          </a>
        </li>
      </ul> */}
    </nav>
  );
}

NavBar.propTypes = {};

export default NavBar;
