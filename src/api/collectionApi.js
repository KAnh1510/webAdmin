// api/collectionApi.js
import axiosClient from "./axiosClient";

const collectionApi = {
  getAll: (params) => {
    const url = "/collection";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/collection/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/collection`;
    return axiosClient.post(url, data);
  },

  update: (id, data) => {
    return axiosClient.put(`/collection/${id}`, data);
  },

  delete: (id) => {
    return axiosClient.delete(`/collection/${id}`);
  },

  findByTitle: (title) => {
    return axiosClient.get(`/collection?title=${title}`);
  },
};

export default collectionApi;
