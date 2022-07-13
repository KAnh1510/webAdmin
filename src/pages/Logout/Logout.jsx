import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAuthUser, getAuthUser } from "../Login/AuthSlice";

import "./Logout.scss";
const Logout = ({ setConfirmLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.values);

  useEffect(() => {
    dispatch(getAuthUser());
  }, [dispatch]);

  const handleLogoutBtn = () => {
    navigate("/");
    dispatch(deleteAuthUser({ id: currentUser[0].id }));
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
