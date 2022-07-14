import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../UserManage/UserSlice";
import { loginUser } from "./AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errMes, setErrMes] = useState(false);
  const [values, setValues] = useState({});

  const userList = useSelector((state) => state.users.values);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (currentUser.length > 0) {
      await dispatch(
        loginUser({
          user_id: currentUser[0].id,
          role: "user",
          email: values.email,
          password: values.password,
          login_at: new Date().toLocaleString(),
        })
      );
      navigate("/account");
    } else setErrMes(true);
  };

  const currentUser = [];
  userList.forEach((user) => {
    if (
      user.email === values.email &&
      user.password === values.password &&
      user.role === "admin"
    ) {
      currentUser.push(user);
    }
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="card bg-dark text-white h-100" style={{ border: "1rem" }}>
      <div className="card-body p-5 text-center">
        <div className="mb-md-5 mt-md-4 pb-5">
          <h2 className="fw-bold mb-2 text-uppercase">Đăng nhập</h2>
          <p className="text-white-50 mb-5">Điền email và mật khẩu của bạn!</p>
          {errMes ? (
            <p style={{ marginTop: "10px", color: "red" }}>
              Email hoặc mật khẩu không đúng! Vui lòng kiểm tra lại.
            </p>
          ) : (
            <></>
          )}

          <div className="d-flex align-items-center flex-column justify-content-center">
            <div className="form-outline form-white mb-4 w-50">
              <label className="form-label" htmlFor="typeEmailX">
                Email
              </label>
              <input
                type="email"
                id="typeEmailX"
                className="form-control form-control-lg"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>

            <div className="form-outline form-white mb-4 w-50">
              <label className="form-label" htmlFor="typePasswordX">
                Mật khẩu
              </label>
              <input
                type="password"
                id="typePasswordX"
                className="form-control form-control-lg"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>
          </div>

          <p className="small mb-5 pb-lg-2">
            <a className="text-white-50" href="#!">
              Quên mật khẩu?
            </a>
          </p>

          <button
            className="btn btn-outline-light bg-white w-25 text-primary"
            type="submit"
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
        </div>

        <div>
          <p className="mb-0">
            Bạn chưa có tài khoản?{" "}
            <Link to="/register" className="text-white-50 fw-bold">
              Đăng kí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
