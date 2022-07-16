import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCollection } from "~/pages/CollectionManage/CollectionSlice";
import Header from "../Header";

const AddCollection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    id: 0,
    title: "",
  });

  const handleAddCollection = (e) => {
    e.preventDefault();
    dispatch(
      createCollection({
        id: Number(values.id),
        title: values.title,
      })
    );
    navigate("/collections");
  };

  return (
    <>
      <Header title="Quản lý danh mục" />
      <div className="table-wrapper">
        <Form>
          <div className="row mb-4">
            <div className="col l-6">
              <Form.Group>
                <Form.Label htmlFor="id">ID</Form.Label>
                <Form.Control
                  type="text"
                  id="id"
                  name="id"
                  value={values.id}
                  onChange={(e) => {
                    setValues({ ...values, id: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
            <div className="col l-6">
              <Form.Group>
                <Form.Label htmlFor="title">Tên danh mục: </Form.Label>
                <Form.Control
                  type="text"
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={(e) => {
                    setValues({ ...values, title: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row mb-4" style={{ justifyContent: "flex-end" }}>
            <button
              className="btn btn-primary btn-block col l-2"
              onClick={() => navigate("/collections")}
            >
              Quay lại
            </button>

            <button
              type="submit"
              className="btn btn-primary btn-block col l-2"
              onClick={handleAddCollection}
            >
              Thêm danh mục
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddCollection;
