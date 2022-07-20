import { Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import InputColor from "react-input-color";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../pages/ProductManage/ProductManage.module.scss";
import classnames from "classnames/bind";

import Header from "../Header";
import { createProduct } from "~/pages/ProductManage/ProductSlice";
import { getAllCollections } from "~/pages/CollectionManage/CollectionSlice";

const cx = classnames.bind(styles);
export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [idColor, setIdColor] = React.useState([]);
  const collectionList = useSelector((state) => state.collections.values);

  const data = {
    id: 0,
    name: "",
    subtle: "",
    collection_id: 0,
    prices: 0,
    imgFront: "",
    imgBack: "",
    number: 0,
  };
  const [values, setValues] = useState({ ...data });
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    dispatch(getAllCollections());
  }, [dispatch]);

  let type = "";
  let collectionTitle = collectionList.map((collection) => collection.title);

  const color = [];
  const size = [];
  const [gallery, setGallery] = useState([
    { id: Math.floor(Math.random(100) * 10 + 1), src: "" },
  ]);

  color.push({ idColor: idColor.hex });

  const sizeList = ["S", "M", "L", "XL"];
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  var checkedItems = checked.length ? checked.map((item) => item) : "";
  Array.isArray(checkedItems)
    ? checkedItems.map((item) =>
        size.push({ id: Math.floor(Math.random(100) * 10 + 1), name: item })
      )
    : (checkedItems = []);

  const handleGalleryChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...gallery];
    list[index][name] = value;
    setGallery(list);
  };

  const handleAddImg = () => {
    setGallery([
      ...gallery,
      { id: Math.floor(Math.random(100) * 10 + 1), src: "" },
    ]);
  };

  const handleRemoveImg = (index) => {
    const list = [...gallery];
    list.splice(index, 1);
    setGallery(list);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        id: Math.floor(Math.random() * 100),
        name: values.name,
        subtle: values.subtle,
        collection_id: values.collection_id,
        prices: values.prices,
        imgFront: values.imgFront,
        imgBack: values.imgBack,
        number: values.number,
        size: size,
        color: color,
        gallery: gallery,
      })
    );
    navigate("/products");
  };

  return (
    <>
      <Header title="Quản lý người dùng" />
      <div className="table-wrapper">
        <Form>
          {/* name, subtle, collection, price */}
          <div className="row mb-4">
            <div className="col l-3">
              <Form.Group>
                <Form.Label htmlFor="name">Tên sản phẩm: </Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={(e) => {
                    setValues({ ...values, name: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
            <div className="col l-3">
              <Form.Group>
                <Form.Label htmlFor="subtle">Sub title: </Form.Label>
                <Form.Control
                  type="text"
                  id="subtle"
                  name="subtle"
                  value={values.subtle}
                  onChange={(e) => {
                    setValues({ ...values, subtle: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
            <div className="col l-3">
              <Form.Group>
                <Form.Label htmlFor="type">Danh mục: </Form.Label>
                <Form.Control
                  as="select"
                  values={type}
                  onChange={(e) => {
                    collectionList.forEach((collection) => {
                      if (collection.title === e.target.value) {
                        setValues({ ...values, collection_id: collection.id });
                      }
                    });
                  }}
                >
                  {collectionTitle.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
            <div className="col l-3">
              <Form.Group>
                <Form.Label htmlFor="imgFront">Giá: </Form.Label>
                <Form.Control
                  type="number"
                  id="prices"
                  name="prices"
                  value={values.prices}
                  onChange={(e) => {
                    setValues({ ...values, prices: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
          </div>

          {/* imgfront, color,number */}
          <div className="row mb-4">
            <div className="col l-4">
              <Form.Group>
                <Form.Label htmlFor="imgFront">Ảnh mặt trước: </Form.Label>
                <Form.Control
                  type="text"
                  id="imgFront"
                  name="imgFront"
                  value={values.imgFront}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      imgFront: e.target.value,
                    });
                  }}
                />
              </Form.Group>
            </div>
            <div className="col l-2">
              <div style={{ width: "100%", border: "1px solid #ccc" }}>
                <img
                  style={{ width: "100%" }}
                  src={values.imgFront}
                  alt="imgFront"
                />
              </div>
            </div>

            <div className="col l-3">
              <Form.Group>
                <Form.Label htmlFor="imgFront">Màu: </Form.Label>
                <ul
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <InputColor
                    initialValue="#5e72e4"
                    onChange={setIdColor}
                    placement="right"
                  />
                  <div
                    style={{
                      width: "50",
                      height: "50",
                      marginTop: "20",
                      backgroundColor: idColor.hex,
                    }}
                  />
                </ul>
              </Form.Group>
            </div>
            <div className="col l-2">
              <Form.Group>
                <Form.Label htmlFor="imgFront">Số lượng: </Form.Label>
                <Form.Control
                  type="number"
                  id="number"
                  name="number"
                  value={values.number}
                  onChange={(e) => {
                    setValues({ ...values, number: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
          </div>

          {/* imgBack, size */}
          <div className="row mb-4">
            <div className="col l-4">
              <Form.Group>
                <Form.Label htmlFor="imgBack">Ảnh mặt sau</Form.Label>
                <Form.Control
                  type="text"
                  id="imgBack"
                  name="imgBack"
                  value={values.imgBack}
                  onChange={(e) => {
                    setValues({ ...values, imgBack: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
            <div className="col l-2">
              <div style={{ width: "100%", border: "1px solid #ccc" }}>
                <img
                  style={{ width: "100%" }}
                  src={values.imgBack}
                  alt="imgBack"
                />
              </div>
            </div>

            <div className="col l-4">
              <Form.Group>
                <Form.Label htmlFor="imgFront">Size: </Form.Label>
                {sizeList.map((item, index) => (
                  <div key={index}>
                    <input
                      value={item}
                      type="checkbox"
                      onChange={handleCheck}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </Form.Group>
            </div>
          </div>

          {/* gallery */}
          <Form.Label htmlFor="gallery">Mô tả: </Form.Label>
          {gallery.map((item, index) => (
            <div className="row mb-4" key={index}>
              <div className="col l-4">
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="src"
                    name="src"
                    value={item.src}
                    onChange={(e) => handleGalleryChange(e, index)}
                  />

                  {gallery.length - 1 === index && gallery.length < 5 && (
                    <button
                      className={cx("btn-gallery", "add")}
                      onClick={handleAddImg}
                    >
                      Thêm
                    </button>
                  )}
                </Form.Group>
              </div>
              <div className="col l-2">
                <div style={{ width: "100%", border: "1px solid #ccc" }}>
                  <img style={{ width: "100%" }} src={item.src} alt="src" />
                </div>
              </div>

              {gallery.length !== 1 && (
                <div className="col l-2 ">
                  <button
                    className={cx("btn-gallery", "remove")}
                    onClick={() => handleRemoveImg(index)}
                  >
                    Xóa
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="row mb-4" style={{ justifyContent: "flex-end" }}>
            <button
              className="btn btn-primary btn-block col l-2"
              onClick={() => navigate("/products")}
            >
              Quay lại
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-block col l-2"
              onClick={handleAddProduct}
            >
              Thêm sản phẩm
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
