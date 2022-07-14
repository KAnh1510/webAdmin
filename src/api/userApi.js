// api/usersApi.js
import axiosClient from "./axiosClient";

const usersApi = {
  register: (data) => {
    const url = `/users`;
    return axiosClient.post(url, data);
  },

  getAll: (params) => {
    const url = "/users";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    return axiosClient.post("/users", data);
  },

  update: (id, data) => {
    return axiosClient.put(`/users/${id}`, data);
  },

  delete: (id) => {
    return axiosClient.delete(`/users/${id}`);
  },

  findByName: (name) => {
    return axiosClient.get(`/users?name=${name}`);
  },
};

export default usersApi;
