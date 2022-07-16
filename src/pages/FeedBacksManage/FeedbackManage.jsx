import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "~/components/Header";
import { getAllFeedbacks } from "./FeedbackSlice";

function FeedbackManage() {
  const dispatch = useDispatch();
  const feedbackList = useSelector((state) => state.feedback.values);

  useEffect(() => {
    dispatch(getAllFeedbacks());
  }, []);

  return (
    <>
      <Header title="Quản lý phản hồi" />
      <table style={{ textAlign: "center", margin: " 0 10px", width: "100%" }}>
        <thead>
          <tr>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Phản hồi</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.map((feedback) => {
            return (
              <tr key={feedback.id}>
                <td>
                  <span>{feedback.name}</span>
                </td>
                <td>
                  <span>{feedback.email}</span>
                </td>
                <td>
                  <span>{feedback.phoneNumber}</span>
                </td>
                <td>
                  <span>{feedback.note}</span>
                </td>

                <td>
                  {feedback.status === 0 ? (
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "#fff",
                        padding: "8px",
                        cursor: "pointer",
                        border: "none",
                      }}
                    >
                      CHƯA XEM
                    </button>
                  ) : (
                    <button
                      style={{
                        backgroundColor: "Green",
                        color: "#fff",
                        padding: "8px",
                        cursor: "pointer",
                        border: "none",
                      }}
                    >
                      ĐÃ XEM
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default FeedbackManage;
