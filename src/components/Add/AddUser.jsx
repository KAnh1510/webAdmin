import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { registerUser } from "../../pages/UserManage/UserSlice";
import Header from "../Header";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const [startDate, setDate] = useState("");
  const today = new Date().toLocaleDateString();
  const [values, setValues] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    birthday: today,
    role: "",
    gender: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        id: uuidv4(),
        name: values.name,
        email: values.email,
        address: values.address,
        phoneNumber: values.phoneNumber,
        birthday: values.birthday,
        role: values.role,
        gender: values.gender,
        password: values.password,
      })
    );
    navigate("/users");
  };

  return (
    <>
      <Header title="Quản lý người dùng" />
      <div className="table-wrapper">
        <Form onClick={() => handleAddUser()}>
          <div className="row mb-4">
            <div className="col l-6">
              <Form.Group>
                <Form.Label htmlFor="fullName">Họ và tên: </Form.Label>
                <Form.Control
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={values.name}
                  onChange={(e) => {
                    setValues({ ...values, name: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col l-6">
              <Form.Group>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  type="text"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={(e) => {
                    setValues({ ...values, email: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
            <div className="col l-6">
              <Form.Group>
                <Form.Label htmlFor="phoneNumber">Số điện thoại: </Form.Label>
                <Form.Control
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={(e) => {
                    setValues({ ...values, phoneNumber: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col l-6">
              <Form.Group>
                <Form.Label htmlFor="address">Địa chỉ: </Form.Label>
                <Form.Control
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Số nhà,thôn/xóm..."
                  value={values.address}
                  onChange={(e) => {
                    setValues({ ...values, address: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
            <div className="col l-6">
              <Form.Group className="form-outline">
                <Form.Label htmlFor="birthday">Ngày sinh: </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="mm/dd/yyyy"
                  name="customer[birthday]"
                  id="birthday"
                  min={today}
                  value={startDate}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setValues({ ...values, birthday: e.target.value });
                  }}
                  size="30"
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col l-6">
              <Form.Group>
                <Form.Label htmlFor="gender">Giới tính:</Form.Label>
                <Form.Control
                  as="select"
                  value={values.gender}
                  onChange={(e) => {
                    setValues({ ...values, gender: e.target.value });
                  }}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className="col l-6">
              <Form.Group>
                <Form.Label htmlFor="role">Role</Form.Label>
                <Form.Control
                  as="select"
                  value={values.role}
                  onChange={(e) => {
                    setValues({ ...values, role: e.target.value });
                  }}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col l-6">
              <Form.Group className="form-outline">
                <Form.Label htmlFor="passWord">Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  id="passWord"
                  name="passWord"
                  value={values.password}
                  onChange={(e) => {
                    setValues({ ...values, password: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
            <div className="col l-6">
              <Form.Group>
                <Form.Label htmlFor="comfirmPassWord">
                  Nhập lại mật khẩu
                </Form.Label>
                <Form.Control
                  type="password"
                  id="confirmPassWord"
                  name="confirmPassWord"
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-4" style={{ justifyContent: "flex-end" }}>
            <button
              className="btn btn-primary btn-block col l-2"
              onClick={() => navigate("/users")}
            >
              Quay lại
            </button>

            <button type="submit" className="btn btn-primary btn-block col l-2">
              Thêm người dùng
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default AddUser;
