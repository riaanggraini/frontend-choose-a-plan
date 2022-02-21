import axios from "axios";
import config from "../config";

const api = axios.create({
  baseURL: config.env.API_BASE_URL || "http://localhost:8000",
});

export default api;
