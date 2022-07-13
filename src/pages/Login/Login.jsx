import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../UserManage/UserSlice";
import { toast } from "react-toastify";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.users.values);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleLogin = () => {
    setValues({
      email: values.email,
      password: values.password,
    });
    console.log(values);
    const userListFilter = userList.filter(
      (user) => user.email === values.email && user.password === values.password
    );
    console.log(userListFilter);
    userListFilter.push({
      role: "guest",
    });

    if (userListFilter[0].role === "admin") {
      navigate("/login/info");
    } else {
      toast.error("Infomation wrong!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <div className="card bg-dark text-white h-100" style={{ border: "1rem" }}>
        <div className="card-body p-5 text-center">
          <div className="mb-md-5 mt-md-4 pb-5">
            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
            <p className="text-white-50 mb-5">
              Please enter your login and password!
            </p>

            <div className="d-flex align-items-center flex-column justify-content-center">
              <div className="form-outline form-white mb-4 w-50">
                <input
                  type="email"
                  id="typeEmailX"
                  className="form-control form-control-lg"
                  ref={emailRef}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
                <label className="form-label" htmlFor="typeEmailX">
                  Email
                </label>
              </div>

              <div className="form-outline form-white mb-4 w-50">
                <input
                  type="password"
                  id="typePasswordX"
                  className="form-control form-control-lg"
                  ref={passwordRef}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      password: e.target.value,
                    })
                  }
                />
                <label className="form-label" htmlFor="typePasswordX">
                  Password
                </label>
              </div>
            </div>

            <p className="small mb-5 pb-lg-2">
              <a className="text-white-50" href="#!">
                Forgot password?
              </a>
            </p>

            <button
              className="btn btn-outline-light bg-white w-25 text-primary"
              type="submit"
              onClick={() => handleLogin()}
            >
              Login
            </button>
          </div>

          <div>
            <p className="mb-0">
              Don't have an account?{" "}
              <a href="#!" className="text-white-50 fw-bold">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {};

export default Login;
