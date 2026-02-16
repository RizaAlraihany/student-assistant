import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import axios from "../config/api";
import Button from "../components/Button";
import Input from "../components/Input";

const AuthPage = ({ type, onAuthSuccess, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = type === "login" ? "/login" : "/register";
      const payload =
        type === "login"
          ? { email: formData.email, password: formData.password }
          : formData;

      const response = await axios.post(endpoint, payload);
      const token = response.data.access_token;
      const user = response.data.user;

      if (!token || !user) {
        throw new Error("Invalid response format from server");
      }

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_data", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      onAuthSuccess(user);
    } catch (err) {
      let errorMessage = "Gagal terhubung ke server. ";

      if (err.response) {
        if (err.response.status === 422) {
          const errors = err.response.data.errors;
          if (errors) {
            errorMessage = Object.values(errors).flat().join(" ");
          } else {
            errorMessage = err.response.data.message || "Validasi gagal";
          }
        } else {
          errorMessage =
            err.response.data.message ||
            err.response.data.error ||
            `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMessage =
          "Server tidak merespons. Pastikan Laravel backend running di http://localhost:8000";
      } else {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-white" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Student Assistant
          </h2>
          <p className="text-gray-600 mt-2">
            {type === "login"
              ? "Masuk ke akun Anda"
              : "Buat akun untuk memulai"}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {type === "register" && (
              <Input
                label="Nama Lengkap"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            )}
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            {type === "register" && (
              <Input
                label="Konfirmasi Password"
                type="password"
                value={formData.password_confirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password_confirmation: e.target.value,
                  })
                }
                required
              />
            )}

            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? "Memproses..." : type === "login" ? "Masuk" : "Daftar"}
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            {type === "login" ? "Belum punya akun? " : "Sudah punya akun? "}
            <button
              onClick={() =>
                onNavigate(type === "login" ? "register" : "login")
              }
              className="text-blue-600 font-medium hover:underline"
            >
              {type === "login" ? "Daftar sekarang" : "Masuk di sini"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
