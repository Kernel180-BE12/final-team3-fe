import React, { useState, useEffect, useRef } from 'react';

const ArrowUpIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>
);

const ChatInput = ({ onGenerate, isLoading, placeholder = "발송하고 싶은 내용을 입력해주세요" }) => {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);

  // 입력 내용에 따라 textarea 높이를 동적으로 조절
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [prompt]);

  const handleGenerateClick = () => {
    if (!prompt.trim() || isLoading) return;
    onGenerate(prompt);
    setPrompt("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerateClick();
    }
  };

  return (
    <div className="p-6 bg-white border-t border-gray-200">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="1"
            className="w-full p-4 pr-14 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none max-h-[12rem] text-base placeholder-gray-500 shadow-sm"
            placeholder={placeholder}
            disabled={isLoading}
          />
          <button
            onClick={handleGenerateClick}
            disabled={isLoading || !prompt.trim()}
            className="absolute right-3 bottom-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl p-2.5 transition-colors duration-200 shadow-sm"
          >
            <ArrowUpIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* 입력 힌트 */}
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-500">
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd>로 전송,
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs ml-1">Shift + Enter</kbd>로 줄바꿈
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;