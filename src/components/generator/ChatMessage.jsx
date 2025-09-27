import React from 'react';

const ChatMessage = ({ message, onSelectVersion }) => {
  return (
    <div
      className={`flex ${
        message.type === "user" ? "justify-end" : "justify-start"
      } mb-6`}
    >
      <div
        className={`max-w-[70%] ${
          message.type === "user"
            ? "bg-indigo-600 text-white rounded-2xl rounded-br-md px-4 py-3"
            : "bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm"
        }`}
      >
        {message.type === "version" ? (
          <div>
            <button
              onClick={() => onSelectVersion?.(message.versionData)}
              className="inline-flex items-center bg-gray-800 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-200 mb-3"
            >
              <span className="mr-2">✨</span>
              버전 {message.versionData.templateId}
              <span className="ml-2">→</span>
            </button>
            <p className="text-sm text-gray-700 leading-relaxed">
              {message.text}
            </p>
          </div>
        ) : (
          <p
            className={`text-sm leading-relaxed whitespace-pre-line ${
              message.type === "user" ? "text-white" : "text-gray-800"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

const LoadingMessage = () => {
  return (
    <div className="flex justify-start mb-6">
      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm text-gray-600">템플릿을 생성하고 있습니다...</span>
        </div>
      </div>
    </div>
  );
};

export { ChatMessage, LoadingMessage };