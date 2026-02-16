import axios from "axios";

// --- KONFIGURASI KONEKSI KE LARAVEL ---
export const API_BASE_URL = "http://localhost:8000/api";

// Setup axios
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

// Axios interceptor untuk handle error globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error);

    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      window.location.reload();
    }

    return Promise.reject(error);
  },
);

export default axios;
