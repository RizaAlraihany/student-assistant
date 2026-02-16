import React, { useState, useEffect } from "react";
import { Settings, LogOut } from "lucide-react";
import axios from "../config/api";
import Button from "../components/Button";

const AdminPanel = ({ user, onLogout }) => {
  const [settings, setSettings] = useState({
    system_instruction: "",
    temperature: 0.7,
    max_tokens: 2048,
    model_name: "gemini-2.5-flash",
  });
  const [loading, setLoading] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [msg, setMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("/admin/settings");
        if (res.data) {
          setSettings((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        setMsg({
          text: "Gagal memuat pengaturan. Menggunakan default.",
          type: "error",
        });
      } finally {
        setLoadingSettings(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setMsg({ text: "", type: "" });

    try {
      await axios.post("/admin/settings", settings);
      setMsg({
        text: "Konfigurasi berhasil disimpan",
        type: "success",
      });
      setTimeout(() => setMsg({ text: "", type: "" }), 3000);
    } catch (err) {
      setMsg({
        text:
          "Gagal menyimpan: " + (err.response?.data?.message || err.message),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat pengaturan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Settings className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-xs text-gray-500">Kelola konfigurasi sistem</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <Button variant="danger" onClick={onLogout} className="text-sm">
              <LogOut size={16} />
              <span className="hidden sm:inline">Keluar</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Konfigurasi AI Assistant
          </h2>

          {msg.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                msg.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {msg.text}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={settings.model_name || ""}
                onChange={(e) =>
                  setSettings({ ...settings, model_name: e.target.value })
                }
                placeholder="gemini-2.5-flash"
              />
              <p className="text-xs text-gray-500 mt-1.5">
                Nama model Gemini yang akan digunakan
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Persona AI
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg h-40 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                value={settings.system_instruction || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    system_instruction: e.target.value,
                  })
                }
                placeholder="Contoh: Kamu adalah asisten pembelajaran yang membantu mahasiswa memahami materi dengan cara yang sederhana dan mudah dipahami..."
              ></textarea>
              <p className="text-xs text-gray-500 mt-1.5">
                Instruksi sistem yang menentukan perilaku AI
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature: {settings.temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={settings.temperature}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      temperature: parseFloat(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1.5">
                  <span>Presisi (0.0)</span>
                  <span>Kreatif (2.0)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Tokens
                </label>
                <input
                  type="number"
                  min="1"
                  max="8192"
                  value={settings.max_tokens}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      max_tokens: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan Konfigurasi"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
