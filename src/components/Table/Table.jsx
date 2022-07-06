import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames/bind";
import styles from "./Table.module.scss";
import Pagination from "../pagination/Pagination";

const cx = classnames.bind(styles);

function Table({
  title,
  children,
  path,
  totalPagesNum,
  setCurrentPage,
  current,
  sorted,
}) {
  return (
    <div className={cx("container")}>
      <div className={cx("table-responsive")}>
        <div className={cx("table-wrapper")}>
          <div className={cx("row", "btn")}>
            {title ? (
              <Link to={`add-${path}`} className={cx("col l-3")}>
                <button>
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Thêm {title}</span>
                </button>
              </Link>
            ) : (
              ""
            )}
          </div>
          {children}

          <Pagination
            pages={totalPagesNum}
            setCurrentPage={setCurrentPage}
            current={current}
            sorted={sorted}
          />
        </div>
      </div>
    </div>
  );
}

Table.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  route: PropTypes.string,
};

export default Table;
