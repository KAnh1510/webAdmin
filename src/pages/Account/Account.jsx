import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUser } from "../UserManage/UserSlice";
import { getAuthUser } from "../Login/AuthSlice";
import Header from "~/components/Header";
import { Form } from "react-bootstrap";

function Account() {
  const dispatch = useDispatch();
  const today = new Date();
  const authUser = useSelector((state) => state.auth.values);
  const userList = useSelector((state) => state.users.values);

  useEffect(() => {
    dispatch(getAuthUser());
    dispatch(getAllUsers());
  }, [dispatch]);

  const currentUser = userList.filter(
    (item) => item.id === authUser[0].user_id
  );

  console.log(authUser);

  const [values, setValues] = useState(...currentUser);

  const handleEditUser = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: authUser[0].user_id,
        data: {
          name: values.name,
          email: values.email,
          address: values.address,
          phoneNumber: values.phoneNumber,
          birthday: values.birthday,
          role: values.role,
          gender: values.gender,
          password: values.password,
        },
      })
    );
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: authUser[0].user_id,
        data: {
          status: "Delete",
        },
      })
    );
  };

  return (
    <div>
      <Header title="Thông tin của bạn"></Header>
      <div style={{ padding: " 15px" }}>
        <Form>
          <div className="row mb-4">
            <div className="col l-6">
              <Form.Group>
                <Form.Label htmlFor="fullName">Họ và tên:</Form.Label>
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
                <Form.Label htmlFor="phoneNumber">Số điện thoại</Form.Label>
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
                <Form.Label htmlFor="address">Địa chỉ:</Form.Label>
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
              <Form.Group>
                <Form.Label htmlFor="address">Ngày sinh:</Form.Label>
                <Form.Control
                  type="text"
                  name="customer[birthday]"
                  id="birthday"
                  min={today}
                  value={values.birthday}
                  onChange={(e) => {
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
                <Form.Label htmlFor="gender">Giới tính</Form.Label>
                <Form.Control
                  type="text"
                  value={values.gender}
                  onChange={(e) => {
                    setValues({ ...values, gender: e.target.value });
                  }}
                ></Form.Control>
              </Form.Group>
            </div>
            <div className="col l-6">
              <Form.Group>
                <Form.Label htmlFor="role">Role</Form.Label>
                <Form.Control
                  type="text"
                  value={values.role}
                  onChange={(e) => {
                    setValues({ ...values, role: e.target.value });
                  }}
                ></Form.Control>
              </Form.Group>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col l-6">
              <Form.Group className="form-outline">
                <Form.Label htmlFor="passWord">Mật khẩu</Form.Label>
                <Form.Control
                  readOnly
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
          </div>
          <div className="row mb-4" style={{ justifyContent: "flex-end" }}>
            <button
              type="submit"
              className="btn btn-primary btn-block col l-2"
              onClick={handleEditUser}
            >
              Cập nhật thông tin
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-block col l-2"
              onClick={handleDeleteUser}
            >
              Xóa tài khoản
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Account;
