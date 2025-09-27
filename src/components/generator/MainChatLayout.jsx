import React, { useEffect, useRef, useState } from 'react';
import WelcomeSection from './WelcomeSection';
import ChatInput from './ChatInput';
import { ChatMessage, LoadingMessage } from './ChatMessage';

const MainChatLayout = ({ messages, onGenerate, onSelectVersion, isLoading }) => {
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleExampleClick = (examplePrompt) => {
    onGenerate(examplePrompt);
  };

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

  const isWelcomeState = messages.length <= 1;

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 헤더 (채팅이 시작된 후에만 표시) */}
      {!isWelcomeState && (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                AI 템플릿 생성
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                카카오톡 알림톡 템플릿을 AI로 자동 생성하세요
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>AI 준비됨</span>
            </div>
          </div>
        </header>
      )}

      {isWelcomeState ? (
        /* 초기 상태: Claude.ai/new 완전 중앙 레이아웃 */
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-3xl">
            {/* 컴팩트한 환영 섹션 */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
                  className="w-8 h-8 text-white"
                >
                  <path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3z" />
                  <path d="M3 12L4.5 9.5L7 8L4.5 6.5L3 4" />
                  <path d="M17 20L19.5 18.5L21 16L19.5 13.5L17 12" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                AI 알림톡 템플릿 생성
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                원하는 내용을 설명해주시면 카카오톡 알림톡 템플릿을 자동으로 생성해드립니다.
              </p>
            </div>

            {/* 중앙 입력창 */}
            <div className="mb-8">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows="3"
                  className="w-full p-4 pr-14 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none max-h-48 text-base placeholder-gray-500 shadow-sm"
                  placeholder="어떤 알림톡 템플릿을 만들까요? 구체적으로 설명해주세요..."
                  disabled={isLoading}
                />
                <button
                  onClick={handleGenerateClick}
                  disabled={isLoading || !prompt.trim()}
                  className="absolute right-3 bottom-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl p-2.5 transition-colors duration-200 shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
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

            {/* 예시 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => handleExampleClick("쇼핑몰 주문 확인 알림톡 템플릿을 생성해주세요. 주문번호, 상품명, 배송정보를 포함해주세요.")}
                className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md hover:border-indigo-300 transition-all duration-200 text-left group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">🛍️</div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">쇼핑몰 주문 확인</h3>
                <p className="text-xs text-gray-600">주문번호와 배송 정보 안내</p>
              </button>

              <button
                onClick={() => handleExampleClick("배송 시작 알림톡 템플릿을 생성해주세요. 송장번호와 예상 도착시간을 포함해주세요.")}
                className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md hover:border-indigo-300 transition-all duration-200 text-left group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">📦</div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">배송 알림</h3>
                <p className="text-xs text-gray-600">실시간 배송 현황 안내</p>
              </button>

              <button
                onClick={() => handleExampleClick("할인 이벤트 안내 알림톡 템플릿을 생성해주세요. 할인율과 이벤트 기간을 포함해주세요.")}
                className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md hover:border-indigo-300 transition-all duration-200 text-left group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">🎉</div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">이벤트 안내</h3>
                <p className="text-xs text-gray-600">특별 할인 혜택 알림</p>
              </button>
            </div>

            {/* 사용 팁 */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                💡 <strong>팁:</strong> 구체적인 목적, 대상 고객, 포함할 정보를 설명하고 '템플릿 생성'을 입력해주세요
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* 채팅 시작 후: 기존 스타일 */
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-4">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  onSelectVersion={onSelectVersion}
                />
              ))}

              {isLoading && <LoadingMessage />}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* 하단 입력 영역 */}
          <ChatInput
            onGenerate={onGenerate}
            isLoading={isLoading}
            placeholder="추가로 수정하고 싶은 내용이 있나요?"
          />
        </div>
      )}
    </div>
  );
};

export default MainChatLayout;