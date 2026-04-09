import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/create",
});

export default api;
