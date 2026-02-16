import React, { useState, useEffect, useRef } from "react";
import { Menu, Send, Bot } from "lucide-react";
import axios from "../config/api";
import Sidebar from "../components/Sidebar";
import ChatMessage from "../components/ChatMessage";
import Button from "../components/Button";

const ChatApp = ({ user, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get("/conversations");
        setConversations(res.data);
      } catch (err) {
        console.error("Gagal load history:", err);
      }
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectConversation = (conv) => {
    setActiveConvId(conv.id);
    setMessages(conv.messages || []);
    setError("");
    setSidebarOpen(false);
  };

  const startNewChat = () => {
    setActiveConvId(null);
    setMessages([]);
    setError("");
    setSidebarOpen(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    const tempUserMsg = {
      id: Date.now(),
      role: "user",
      content: userMessage,
    };

    setMessages((prev) => [...prev, tempUserMsg]);
    setInput("");
    setIsTyping(true);
    setError("");

    try {
      const res = await axios.post("/chat", {
        message: userMessage,
        conversation_id: activeConvId,
      });

      const { conversation_id, ai_response } = res.data;

      if (!ai_response) {
        throw new Error("No AI response received");
      }

      if (!activeConvId && conversation_id) {
        setActiveConvId(conversation_id);
        const refresh = await axios.get("/conversations");
        setConversations(refresh.data);
      }

      const aiMsg = {
        id: Date.now() + 1,
        role: "model",
        content: ai_response,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      let errorMessage = "Maaf, terjadi kesalahan. ";

      if (err.response) {
        errorMessage +=
          err.response.data.message ||
          err.response.data.error ||
          `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage += "Server tidak merespons. Pastikan backend running.";
      } else {
        errorMessage += err.message;
      }

      setError(errorMessage);

      const errorMsg = {
        id: Date.now() + 1,
        role: "model",
        content: errorMessage,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        user={user}
        conversations={conversations}
        activeConvId={activeConvId}
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
        onSelectConversation={selectConversation}
        onNewChat={startNewChat}
        onLogout={onLogout}
      />

      {/* Overlay untuk mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu size={24} />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900">
                Asisten Pembelajaran
              </h1>
              <p className="text-xs text-gray-500">
                Tanyakan apa saja tentang materi atau tugas kuliah
              </p>
            </div>
          </div>
        </header>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-3 text-sm">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-6">
          <div className="max-w-3xl mx-auto">
            {messages.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Bot size={32} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Halo! Ada yang bisa saya bantu?
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Saya siap membantu Anda dengan materi kuliah, diskusi tugas,
                  atau pertanyaan terkait pembelajaran.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                  <button
                    onClick={() =>
                      setInput(
                        "Jelaskan konsep Neural Network secara sederhana"
                      )
                    }
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 text-left transition-colors"
                  >
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Bantuan Materi
                    </p>
                    <p className="text-xs text-gray-600">
                      Jelaskan konsep pembelajaran dengan sederhana
                    </p>
                  </button>
                  <button
                    onClick={() =>
                      setInput(
                        "Bagaimana cara memulai project machine learning?"
                      )
                    }
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 text-left transition-colors"
                  >
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Diskusi Tugas
                    </p>
                    <p className="text-xs text-gray-600">
                      Konsultasi tentang project atau assignment
                    </p>
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg} />
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-blue-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white px-4 lg:px-6 py-4">
          <form onSubmit={handleSend} className="max-w-3xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ketik pertanyaan Anda..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  disabled={isTyping}
                />
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="h-12 w-12 rounded-xl p-0 flex items-center justify-center flex-shrink-0"
              >
                <Send size={20} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Platform pembelajaran berbasis AI untuk mahasiswa
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChatApp;
