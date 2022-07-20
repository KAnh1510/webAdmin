import { Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../pages/ProductManage/ProductManage.module.scss";
import classnames from "classnames/bind";

import Header from "../Header";
import { updateProduct } from "~/pages/ProductManage/ProductSlice";
import { getAllCollections } from "~/pages/CollectionManage/CollectionSlice";
import VndFormat from "../VndFormat/VndFormat";
import InputColor from "react-input-color";
const cx = classnames.bind(styles);

export default function EditProduct() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productEdit = useSelector((state) => state.products.values);
  const collectionList = useSelector((state) => state.collections.values);

  const productFilter = productEdit.filter(
    (item) => item.id === parseInt(params.id, 10)
  );

  const [values, setValues] = useState(...productFilter);
  // const [idColor, setIdColor] = React.useState(values.color);

  useEffect(() => {
    dispatch(getAllCollections());
  }, [dispatch]);

  let type = "";
  let collectionTitle = [];
  collectionList.forEach((collection) => {
    if (collection.id === values.collection_id) {
      type = collection.title;
    }
    collectionTitle.push(collection.title);
  });

  const [size, setSize] = useState(values.size);
  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...size];
    list[index][name] = value;
    setSize(list);
  };
  const handleAddSize = () => {
    setSize([...size, { id: Math.floor(Math.random(100) * 10 + 1), name: "" }]);
  };
  const handleRemoveSize = (index) => {
    const list = [...size];
    list.splice(index, 1);
    setSize(list);
  };

  const [gallery, setGallery] = useState(values.gallery);
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

  const handleEditProduct = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        id: params.id,
        data: {
          name: values.name,
          subtle: values.subtle,
          collection_id: values.collection_id,
          prices: values.prices,
          imgFront: values.imgFront,
          imgBack: values.imgBack,
          number: values.number,
          size: size,
          color: values.color,
          gallery: gallery,
        },
      })
    );
    navigate("/products");
  };

  return (
    <>
      <Header title="Quản lý người dùng" />
      <div className="table-wrapper">
        <Form>
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
                  {values.color.map((colorItem, index) => {
                    return (
                      <li key={index}>
                        <InputColor
                          initialValue={colorItem.idColor}
                          placement="right"
                        />
                        <div
                          style={{
                            width: "50",
                            height: "50",
                            marginTop: "20",
                            backgroundColor: colorItem.idColor,
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
              </Form.Group>
            </div>

            <div className="col l-1">
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
                {size.length === 0 ? (
                  <button
                    className={cx("btn-gallery", "add")}
                    onClick={handleAddSize}
                  >
                    Thêm
                  </button>
                ) : (
                  size.map((item, index) => (
                    <div key={item.id} className="row mb-4">
                      <div className="col l-6">
                        <Form.Control
                          id="size"
                          name="name"
                          value={item.name}
                          onChange={(e) => handleSizeChange(e, index)}
                        />
                        {size.length - 1 === index && size.length < 6 && (
                          <button
                            className={cx("btn-gallery", "add")}
                            onClick={handleAddSize}
                          >
                            Thêm
                          </button>
                        )}
                      </div>
                      {size.length !== 1 && (
                        <div className="col l-6">
                          <button
                            className={cx("btn-gallery", "remove")}
                            onClick={() => handleRemoveSize(index)}
                          >
                            Xóa
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </Form.Group>
            </div>
          </div>

          <Form.Group>
            <Form.Label htmlFor="gallery">Mô tả: </Form.Label>
            {gallery.map((item, index) => (
              <div key={item.id} className="row mb-4">
                <div className="col l-6 mb-4">
                  <Form.Control
                    id="gallery"
                    name="gallery"
                    value={item.src}
                    onChange={(e) => handleGalleryChange(e, index)}
                  />
                  {gallery.length - 1 === index && gallery.length < 6 && (
                    <button
                      className={cx("btn-gallery", "add")}
                      onClick={handleAddImg}
                    >
                      Thêm
                    </button>
                  )}
                </div>
                <div className="col l-2">
                  <div style={{ width: "100%", border: "1px solid #ccc" }}>
                    <img
                      style={{ width: "100%" }}
                      src={item.src}
                      alt="imgFront"
                    />
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
          </Form.Group>

          <div className="row mb-4" style={{ justifyContent: "flex-end" }}>
            <button
              type="submit"
              className="btn btn-primary btn-block col l-2"
              onClick={handleEditProduct}
            >
              Cập nhật
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
