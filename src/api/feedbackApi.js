// api/collectionApi.js
import axiosClient from "./axiosClient";

const feedbackApi = {
  getAll: (params) => {
    const url = "/question";
    return axiosClient.get(url, { params });
  },
};

export default feedbackApi;
