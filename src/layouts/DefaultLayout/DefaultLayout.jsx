import React from "react";
import styles from "./DefaultLayout.module.scss";
import classnames from "classnames/bind";

import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const cx = classnames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Sidebar />
      <div className={cx("content")}>
        {/* <NavBar /> */}

        <div className={cx("content-wrapper", "grid")}>{children}</div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {};

export default DefaultLayout;
