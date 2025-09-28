import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002",
    withCredentials: false,
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        console.error("API Error:", err.response?.data ?? err.message);
        return Promise.reject(err);
    }
);

export default api;
