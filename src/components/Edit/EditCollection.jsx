import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllCollections,
  updateCollection,
} from "~/pages/CollectionManage/CollectionSlice";
import Header from "../Header";

const EditCollection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const collectionList = useSelector((state) => state.collections.values);

  useEffect(() => {
    dispatch(getAllCollections());
  }, []);

  const collectionListFilter = collectionList.filter(
    (item) => item.id === parseInt(params.id, 10)
  );
  console.log(collectionListFilter);

  const [values, setValues] = useState(...collectionListFilter);

  const handleUpdateCollection = (e) => {
    e.preventDefault();
    dispatch(
      updateCollection({
        id: Number(values.id),
        data: {
          id: Number(values.id),
          title: values.title,
        },
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
                <Form.Label htmlFor="title">Title</Form.Label>
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
              type="submit"
              className="btn btn-primary btn-block col l-2"
              onClick={handleUpdateCollection}
            >
              Edit Collection
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditCollection;
