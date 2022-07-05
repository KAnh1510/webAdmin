// api/productApi.js
import axiosClient from "./axiosClient";

const orderDetailApi = {
  getAll: (params) => {
    const url = "/order_detail";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/order_detail/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/order_detail`;
    return axiosClient.post(url, data);
  },

  update: (id, data) => {
    return axiosClient.put(`/order_detail/${id}`, data);
  },

  delete: (id) => {
    return axiosClient.delete(`/order_detail/${id}`);
  },
};

export default orderDetailApi;
