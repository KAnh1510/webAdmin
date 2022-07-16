import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import Image from "~/components/Images";
import VndFormat from "~/components/VndFormat/VndFormat";
const cx = classnames.bind(styles);

function ProductItem({ data }) {
  return (
    <Link to={`/products/detail/${data.id}`} className={cx("wrapper")}>
      <div className={cx("info")}>
        <p className={cx("name")}>{data.name}</p>
        <span className={cx("prices")}>{VndFormat(data.prices)}</span>
      </div>
      <Image className={cx("image")} src={data.imgFront} alt={data.name} />
    </Link>
  );
}

ProductItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProductItem;
