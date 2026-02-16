import React from "react";
import ReactMarkdown from "react-markdown";
import { User, Bot } from "lucide-react";

const ChatMessage = ({ message }) => {
  return (
    <div
      className={`flex gap-3 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.role !== "user" && (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Bot size={16} className="text-blue-600" />
        </div>
      )}
      <div
        className={`max-w-[80%] lg:max-w-[70%] rounded-2xl px-4 py-3 ${
          message.role === "user"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        {message.role === "user" ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        ) : (
          <div className="text-sm leading-relaxed prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">
                    {children}
                  </strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-2 space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-2 space-y-1">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="ml-2">{children}</li>,
                code: ({ inline, children }) =>
                  inline ? (
                    <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-gray-200 p-2 rounded text-xs font-mono overflow-x-auto mb-2">
                      {children}
                    </code>
                  ),
                h1: ({ children }) => (
                  <h1 className="text-lg font-bold mb-2">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-base font-bold mb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-bold mb-1">{children}</h3>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
      {message.role === "user" && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
