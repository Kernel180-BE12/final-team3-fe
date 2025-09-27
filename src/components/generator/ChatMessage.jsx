import React from 'react';

const ChatMessage = ({ message, onSelectVersion }) => {
  // 에러 메시지인 경우 별도 스타일 적용
  if (message.type === "error") {
    return (
      <div className="flex justify-start mb-6">
        <div className="max-w-[70%] bg-red-50 border border-red-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
          <div className="flex items-start space-x-3">
            {/* 에러 아이콘 */}
            <svg
              className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-red-800 text-sm font-medium mb-1">오류가 발생했습니다</p>
              <p className="text-red-700 text-sm leading-relaxed">{message.text}</p>
              <p className="text-red-600 text-xs mt-2">다시 시도하거나 다른 방식으로 요청해보세요.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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