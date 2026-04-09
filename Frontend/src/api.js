import axios from "axios";

const api = axios.create({
  baseURL: "https://compact-url.onrender.com",
});

export default api;
