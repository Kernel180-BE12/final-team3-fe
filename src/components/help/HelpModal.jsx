import React, { useState } from "react";
import HelpTabs from "./HelpTabs";
import HelpContent from "./HelpContent";

const CloseIcon = (props) => (
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
    <path d="M18 6L6 18"></path>
    <path d="M6 6l12 12"></path>
  </svg>
);

export default function HelpModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("infotalk");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-[#f3f2ec] bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* 모달 컨테이너 */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              카카오톡 비즈니스 도움말
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="모달 닫기"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          {/* 콘텐츠 영역 */}
          <div className="flex h-[calc(90vh-120px)]">
            {/* 탭 네비게이션 */}
            <div className="w-64 border-r border-gray-200 bg-gray-50">
              <HelpTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* 메인 콘텐츠 */}
            <div className="flex-1 overflow-y-auto">
              <HelpContent activeTab={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
