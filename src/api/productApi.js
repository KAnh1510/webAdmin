// api/productApi.js
import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params) => {
    const url = "/product";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    return axiosClient.post("/product", data);
  },

  update: (id, data) => {
    return axiosClient.put(`/product/${id}`, data);
  },

  delete: (id) => {
    return axiosClient.delete(`/product/${id}`);
  },

  deleteAll: () => {
    return axiosClient.delete(`/product`);
  },

  findByName: (name) => {
    return axiosClient.get(`/product?name=${name}`);
  },
};

export default productApi;
