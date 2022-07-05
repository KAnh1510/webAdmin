import React from "react";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames/bind";

import styles from "./Search.module.scss";
import { SearchIcon } from "../Icons";

const cx = classnames.bind(styles);
const Search = () => {
  return (
    <div>
      <div className={cx("search")}>
        <input type="text" placeholder="Tìm kiếm..." size="10" />

        <button className={cx("search-btn")}>
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default Search;
