import { Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "~/pages/ProductManage/ProductSlice";
import { getAllCollections } from "~/pages/CollectionManage/CollectionSlice";

export default function AddProduct() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productEdit = useSelector((state) => state.products.values);
  const collectionList = useSelector((state) => state.collections.values);

  const productFilter = productEdit.filter(
    (item) => item.id === parseInt(params.id, 10)
  );
  const data = {
    id: 0,
    name: "",
    subtle: "",
    collection_id: 0,
    prices: 0,
    imgFront: "",
    imgBack: "",
    size: [
      {
        id: 1,
        name: "M",
      },
    ],
    color: [
      {
        idColor: "#000000",
        name_color: "Black",
      },
    ],
    gallery: [
      {
        id: 1,
        src: "https://product.hstatic.net/200000436739/product/0db50047-70f4-4bc3-8e1e-9a48be0e49b0_a207335ee455425d9ebca682512e962b_master.jpeg",
      },
    ],
  };
  const [values, setValues] = useState({ ...data });

  useEffect(() => {
    dispatch(getAllCollections());
  }, [dispatch]);

  let type = "";
  let collectionTitle = collectionList.map((collection) => collection.title);
  //   collectionList.forEach((collection) => {
  //     if (collection.id === values.collection_id) {
  //       type = collection.title;
  //     }
  //     collectionTitle.push(collection.title);
  //   });

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
        size: values.size,
        color: values.color,
        gallery: values.gallery,
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
                  type="text"
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
            <div className="col l-4">
              <Form.Group>
                <Form.Label htmlFor="imgFront">Màu: </Form.Label>
                <ul
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {values.color
                    ? values.color.map((colorItem, index) => {
                        return (
                          <li key={index}>
                            <Form.Control
                              type="color"
                              value={colorItem.idColor}
                              onChange={(e) => {
                                setValues({
                                  ...values,
                                  // color: e.target.value,
                                });
                              }}
                            />
                          </li>
                        );
                      })
                    : ""}
                </ul>
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
                {values.size.map((item, index) => (
                  <Form.Control
                    key={index}
                    value={item.name}
                    className="mb-4"
                    onChange={(e) => {
                      setValues({
                        ...values,
                        // size: e.target.value,
                      });
                    }}
                  />
                ))}
              </Form.Group>
            </div>
          </div>

          <div>
            <Form.Group>
              <Form.Label htmlFor="gallery">Mô tả: </Form.Label>
              {values.gallery.map((item) => (
                <div key={item.id} className="row mb-4">
                  <div className="col l-6 mb-4">
                    <Form.Control
                      id="gallery"
                      name="gallery"
                      value={item.src}
                      onChange={(e) => {
                        // setValues({ ...values, src: e.target.value });
                      }}
                    />
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
                </div>
              ))}
            </Form.Group>
          </div>

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
