import api from "./api";

export default { auth: { login: (data) => api.post("v1/auth", data) } };
