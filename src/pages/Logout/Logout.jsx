import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Login/AuthSlice";

import "./Logout.scss";
const Logout = ({ setConfirmLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutBtn = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <div>
      <p className="title-logout">Bạn có chắc chắn muốn đăng xuất ?</p>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button className="btn-logout" onClick={handleLogoutBtn}>
          Có
        </button>
        <button className="btn-logout" onClick={() => setConfirmLogout(false)}>
          Không
        </button>
      </div>
    </div>
  );
};

Logout.propTypes = {
  setConfirmLogout: PropTypes.func,
};

export default Logout;
