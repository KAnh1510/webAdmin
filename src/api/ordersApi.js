// api/productApi.js
import axiosClient from "./axiosClient";

const ordersApi = {
  getAll: (params) => {
    const url = "/orders";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },

  findByName: (nameUser) => {
    return axiosClient.get(`/orders?name_user=${nameUser}`);
  },
};

export default ordersApi;
