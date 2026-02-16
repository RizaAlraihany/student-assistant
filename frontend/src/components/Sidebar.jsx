import React from "react";
import {
  BookOpen,
  MessageSquare,
  FileText,
  Home,
  X,
  Clock,
  LogOut,
} from "lucide-react";
import Button from "./Button";

const Sidebar = ({
  user,
  conversations,
  activeConvId,
  sidebarOpen,
  onCloseSidebar,
  onSelectConversation,
  onNewChat,
  onLogout,
}) => {
  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white" size={20} />
            </div>
            <span className="font-semibold text-gray-900">
              Student Assistant
            </span>
          </div>
          <button
            onClick={onCloseSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <Button onClick={onNewChat} className="w-full text-sm">
          <MessageSquare size={16} />
          Percakapan Baru
        </Button>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 border-b border-gray-200">
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
            <Home size={18} />
            Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
            <BookOpen size={18} />
            Materi
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
            <FileText size={18} />
            Tugas
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
            <MessageSquare size={18} />
            Diskusi
          </button>
        </div>
      </nav>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Riwayat Percakapan
        </h3>
        <div className="space-y-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeConvId === conv.id
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Clock size={14} className="text-gray-400" />
                <span className="truncate">
                  {conv.title || "Percakapan Baru"}
                </span>
              </div>
            </button>
          ))}
          {conversations.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-8">
              Belum ada riwayat percakapan
            </p>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-700 font-semibold">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <Button variant="danger" onClick={onLogout} className="w-full text-sm">
          <LogOut size={16} />
          Keluar
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
