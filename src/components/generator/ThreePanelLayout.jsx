import React, { useEffect, useRef } from 'react';
import { ChatMessage, LoadingMessage } from './ChatMessage';

// 기존 GeneratorPage의 아이콘들을 재사용
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

// 채팅 패널 컴포넌트
const ChatPanel = ({ messages, onGenerate, onSelectVersion, isLoading }) => {
  const [prompt, setPrompt] = React.useState("");
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="w-full md:w-[600px] bg-white flex flex-col h-full border-r border-gray-200 panel-slide-in">
      {/* 채팅 헤더 */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="font-semibold text-gray-900">AI 대화</h2>
        <p className="text-sm text-gray-500">템플릿 생성 및 수정 요청</p>
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
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

      {/* 채팅 입력 영역 */}
      <div className="p-4 border-t bg-white">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="1"
            className="w-full p-3 pr-12 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-500 resize-none max-h-[12rem]"
            placeholder="템플릿을 수정하거나 새로운 요청을 입력하세요"
          />
          <button
            onClick={handleGenerateClick}
            disabled={isLoading || !prompt.trim()}
            className="absolute right-3 bottom-3 bg-indigo-600 hover:bg-indigo-700 rounded-full p-2"
          >
            <ArrowUpIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 미리보기 패널 컴포넌트
const PreviewPanel = ({ version, showVariables }) => {
  const formatContent = (content) => {
    if (!content) return "";

    if (showVariables) {
      if (!version.variables || version.variables.length === 0) {
        return content;
      }
      return version.variables.reduce((acc, variable) => {
        return acc.replace(
          new RegExp(variable.placeholder, "g"),
          variable.variableKey
        );
      }, content);
    }

    if (version.variables) {
      return version.variables.reduce((acc, variable) => {
        const highlightedVar = `<span class="font-bold text-yellow-700 bg-yellow-200 px-1 rounded-sm">${variable.placeholder}</span>`;
        return acc.replace(
          new RegExp(variable.placeholder, "g"),
          highlightedVar
        );
      }, content);
    }
    return content;
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-100 via-teal-100 to-green-100">
      {version ? (
        <div className="w-full max-w-sm mx-auto panel-slide-in">
          <div className="bg-yellow-400 text-xs text-gray-700 px-4 py-2 rounded-t-lg">
            알림톡 도착
          </div>
          <div className="bg-white p-4 space-y-3 border-l border-r border-gray-200 max-h-96 overflow-y-auto">
            <p className="font-bold text-lg">{version.title}</p>
            <p
              className="text-gray-800 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: formatContent(version.content),
              }}
            />
          </div>
          {version.buttons && version.buttons.length > 0 && (
            <div className="bg-white p-4 rounded-b-lg border-t border-gray-200 space-y-2">
              {version.buttons.map((button) => (
                <button
                  key={button.id}
                  className="w-full text-center py-2 border border-gray-300 rounded-md text-blue-500 font-semibold bg-gray-50 hover:bg-gray-100"
                >
                  {button.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📱</span>
          </div>
          <p className="text-lg font-medium mb-2">템플릿 미리보기</p>
          <p className="text-sm">
            템플릿을 생성하면
            <br />
            이곳에서 미리볼 수 있어요.
          </p>
        </div>
      )}
    </div>
  );
};

// 메인 3패널 레이아웃
const ThreePanelLayout = ({
  messages,
  onGenerate,
  onSelectVersion,
  isLoading,
  selectedVersion,
  showVariables,
  onToggleVariables,
  onApproveTemplate
}) => {
  return (
    <div className="flex-1 flex layout-transition">
      {/* 채팅 패널 */}
      <ChatPanel
        messages={messages}
        onGenerate={onGenerate}
        onSelectVersion={onSelectVersion}
        isLoading={isLoading}
      />

      {/* 미리보기 패널 */}
      <main className="flex-1 flex flex-col">
        {/* 상단 헤더 */}
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <div>
            <h2 className="font-semibold text-gray-900">템플릿 미리보기</h2>
            <p className="text-sm text-gray-500">실제 카카오톡에서 보이는 모습</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">변수값 표시</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showVariables}
                onChange={onToggleVariables}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
            <button
              onClick={onApproveTemplate}
              disabled={!selectedVersion}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium transition-colors"
            >
              이 템플릿 승인하기
            </button>
          </div>
        </header>

        {/* 미리보기 영역 */}
        <PreviewPanel version={selectedVersion} showVariables={showVariables} />
      </main>
    </div>
  );
};

export default ThreePanelLayout;