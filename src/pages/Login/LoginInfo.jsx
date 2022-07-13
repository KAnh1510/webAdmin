import { Form } from "react-bootstrap";
import Datepicker from "react-datepicker";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useLocationForm from "~/hook/useLocationForm";

import { getAllUsers, getUser, updateUser } from "~/pages/UserManage/UserSlice";
import Header from "~/components/Header";

const LoginInfo = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.users.values);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const existingUser = userList.filter((item) => item.id === 3);

  const [values, setValues] = useState(...existingUser);
  console.log(userList);

  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(false);

  // const handleLoginInfo = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     updateUser({
  //       id: params.id,
  //       data: {
  //         name: values.name,
  //         email: values.email,
  //         address: values.address,
  //         phoneNumber: values.phoneNumber,
  //         birthday: values.birthday,
  //         role: values.role,
  //         gender: values.gender,
  //         password: values.password,
  //       },
  //     })
  //   );
  //   setValues({
  //     name: "",
  //     email: "",
  //     address: "",
  //     password: "",
  //     phoneNumber: "",
  //     birthday: new Date(),
  //   });
  //   navigate("/users");
  // };

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  return (
    <>
      <Header title="Quản lý người dùng" />
      <div className="table-wrapper">
        <Form>
          <div className="row mb-4">
            <div className="col l-6">
              <Form.Group>
                <Form.Label htmlFor="fullName">Full name</Form.Label>
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
                <Form.Label htmlFor="phoneNumber">Phone</Form.Label>
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
                <Form.Label htmlFor="address">Address</Form.Label>
                <Select
                  name="cityId"
                  key={`cityId_${selectedCity?.value}`}
                  className="mb-4"
                  isDisabled={cityOptions.length === 0}
                  options={cityOptions}
                  onChange={(option) => onCitySelect(option)}
                  placeholder="Tỉnh/Thành"
                  defaultValue={selectedCity}
                />

                <Select
                  name="districtId"
                  key={`districtId_${selectedDistrict?.value}`}
                  isDisabled={districtOptions.length === 0}
                  options={districtOptions}
                  className="mb-4"
                  onChange={(option) => onDistrictSelect(option)}
                  placeholder="Quận/Huyện"
                  defaultValue={selectedDistrict}
                />

                <Select
                  name="wardId"
                  key={`wardId_${selectedWard?.value}`}
                  isDisabled={wardOptions.length === 0}
                  options={wardOptions}
                  className="mb-4"
                  placeholder="Phường/Xã"
                  onChange={(option) => onWardSelect(option)}
                  defaultValue={selectedWard}
                />
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
            {/* <div className="col l-6">
              <Form.Group className="form-outline">
                <Form.Label htmlFor="birthday">Birthday</Form.Label>
                <Datepicker
                  selected={values.birthday}
                  className="form-control"
                  custom="true"
                  placeholder={values.birthday}
                  value={values.birthday}
                  onChange={(e) => {
                    setValues({ ...values, birthday: e.target.value });
                  }}
                />
              </Form.Group>
            </div> */}
          </div>

          <div className="row mb-4">
            <div className="col l-6">
              <Form.Group>
                <Form.Label htmlFor="gender">Gender</Form.Label>
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

          {/* <div className="row mb-4" style={{ justifyContent: "flex-end" }}>
            <button
              type="submit"
              className="btn btn-primary btn-block col l-2"
              onClick={() => handleLoginInfo()}
            >
              Edit User
            </button>
          </div> */}
        </Form>
      </div>
    </>
  );
};

export default LoginInfo;
