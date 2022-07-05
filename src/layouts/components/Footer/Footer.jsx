import React from "react";

import styles from "./Footer.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);
function Footer() {
  return (
    <footer className={cx("main-footer")}>
      <div>
        <strong>
          Copyright &copy; 2014-2021
          <a href="https://adminlte.io">AdminLTE.io</a>.
        </strong>
        All rights reserved.
      </div>
      <div className={cx("float-right")}>
        <b>Version</b> 3.2.0
      </div>
    </footer>
  );
}

export default Footer;
