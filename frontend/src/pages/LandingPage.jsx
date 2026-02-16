import React from "react";
import { BookOpen, FileText, CheckCircle } from "lucide-react";
import Button from "../components/Button";

const LandingPage = ({ onNavigate }) => (
  <div className="min-h-screen bg-white">
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="text-white" size={20} />
          </div>
          <span className="text-xl font-semibold text-gray-900">
            Student Assistant
          </span>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onNavigate("login")}>
            Masuk
          </Button>
          <Button onClick={() => onNavigate("register")}>Daftar</Button>
        </div>
      </div>
    </nav>

    <main className="max-w-6xl mx-auto px-6">
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Platform Pembelajaran
          <br />
          <span className="text-blue-600">Berbasis AI</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Asisten virtual untuk membantu mahasiswa dalam proses pembelajaran,
          diskusi materi, dan penyelesaian tugas.
        </p>
        <div className="flex justify-center">
          <Button
            onClick={() => onNavigate("register")}
            className="text-lg px-8 py-3"
          >
            Mulai Sekarang
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 pb-20">
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="text-blue-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Bantuan Materi
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Dapatkan penjelasan materi kuliah dengan bahasa yang mudah dipahami
            dan contoh aplikatif.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <FileText className="text-green-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Diskusi Tugas
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Konsultasikan tugas dan project dengan asisten AI yang tersedia
            24/7 untuk membantumu.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <CheckCircle className="text-purple-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Belajar Efektif
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Platform yang dirancang untuk meningkatkan efektivitas belajar
            dengan metode interaktif.
          </p>
        </div>
      </div>
    </main>

    <footer className="border-t border-gray-200 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
        © 2026 Student Assistant. Platform pembelajaran berbasis AI untuk
        mahasiswa.
      </div>
    </footer>
  </div>
);

export default LandingPage;
