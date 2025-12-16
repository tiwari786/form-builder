import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api" || "https://form-builder-1-67cf.onrender.com",
});

export default API;
