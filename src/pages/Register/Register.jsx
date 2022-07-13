import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../UserManage/UserSlice";

function Register() {
  const dispatch = useDispatch();
  const [startDate, setDate] = useState("");
  const today = new Date().toLocaleDateString();
  const [values, setValues] = useState([]);
  const [successMess, setSuccessMes] = useState(false);
  const [passwordError, setPasswordErr] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;
    const NewPasswordInput = {
      ...passwordInput,
      [passwordInputFieldName]: passwordInputValue,
    };
    setPasswordInput(NewPasswordInput);
  };

  const handleValidation = (e) => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;

    //for password
    if (passwordInputFieldName === "password") {
      const minLengthRegExp = /.{6,}/;

      const passwordLength = passwordInputValue.length;
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);

      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Mật khẩu chưa được nhập";
      } else if (!minLengthPassword) {
        errMsg = "Nhập mật khẩu ít nhất 6 kí tự";
      } else {
        errMsg = "";
      }
      setPasswordErr(errMsg);
    }

    // for confirm password
    if (
      passwordInputFieldName === "confirmPassword" ||
      (passwordInputFieldName === "password" &&
        passwordInput.confirmPassword.length > 0)
    ) {
      if (passwordInput.confirmPassword !== passwordInput.password) {
        setConfirmPasswordError("Mật khẩu nhập lại không trùng khớp");
      } else {
        setConfirmPasswordError("");
        setValues({ ...values, password: passwordInput.password });
      }
    }
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        birthday: values.birthday,
        role: "admin",
        gender: values.gender,
        address: values.address,
        password: values.password,
        create_at: today,
        status: "work",
      })
    );
    setSuccessMes(true);
  };

  return (
    <div className="card bg-dark text-white h-100" style={{ border: "1rem" }}>
      <div className="card-body p-5 text-center" style={{ height: "100vh  " }}>
        <div className="mb-md-5 mt-md-4 pb-5">
          <h2 className="fw-bold mb-2 text-uppercase">Đăng kí</h2>
          {successMess ? (
            <p style={{ marginTop: "10px", color: "blue" }}>
              Bạn đã đăng kí tài khoản thành công.
            </p>
          ) : (
            <></>
          )}

          <Form style={{ margin: "30px 100px", padding: "30px" }}>
            <div className="row mb-4">
              <div className="col l-3"></div>
              <div className="col l-4">
                <Form.Group>
                  <Form.Control
                    required
                    type="name"
                    name="customer[firstName]"
                    id="customer_firstName"
                    value={values.name ? values.name : ""}
                    onChange={(e) => {
                      setValues({ ...values, name: e.target.value });
                    }}
                    placeholder="Họ và tên"
                  />
                </Form.Group>
              </div>

              <div className="col l-4">
                <Form.Group>
                  <Form.Control
                    required
                    type="email"
                    name="customer[email]"
                    id="customer_email"
                    placeholder="Email"
                    value={values.email ? values.email : ""}
                    onChange={(e) => {
                      setValues({ ...values, email: e.target.value });
                    }}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col l-3"></div>
              <div className="col l-4">
                <Form.Group>
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

              <div className="col l-4">
                <Form.Group>
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
              <div className="col l-3"></div>
              <div className="col l-4">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Địa chỉ"
                    name="customer[address]"
                    id="address"
                    value={values.address}
                    onChange={(e) => {
                      setValues({ ...values, address: e.target.value });
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col l-4">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Số điện thoại"
                    name="customer[phoneNumber]"
                    id="phoneNumber"
                    value={values.phoneNumber}
                    onChange={(e) => {
                      setValues({ ...values, phoneNumber: e.target.value });
                    }}
                    size="30"
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col l-3"></div>
              <div className="col l-4">
                <Form.Group>
                  <Form.Control
                    type="password"
                    value={passwordInput.password}
                    onChange={handlePasswordChange}
                    onKeyUp={handleValidation}
                    name="password"
                    placeholder="Mật khẩu"
                  />
                  <p className="text-danger" style={{ color: "red" }}>
                    {passwordError}
                  </p>
                </Form.Group>
              </div>

              <div className="col l-4">
                <Form.Group>
                  <Form.Control
                    type="password"
                    value={passwordInput.confirmPassword}
                    onChange={handlePasswordChange}
                    onKeyUp={handleValidation}
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                  />
                  <p className="text-danger" style={{ color: "red" }}>
                    {confirmPasswordError}
                  </p>
                </Form.Group>
              </div>
            </div>

            <button
              className="btn btn-outline-light bg-white w-25 text-primary"
              type="submit"
              onClick={handleSubmitRegister}
            >
              Đăng kí
            </button>
          </Form>
        </div>

        <div>
          <p className="mb-0">
            Bạn đã có tài khoản?{" "}
            <Link to="/" className="text-white-50 fw-bold">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
