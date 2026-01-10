import axios from "axios";

const api = axios.create({
  baseURL: "https://yourbackend.onrender.com/api/create",
});

export default api;
