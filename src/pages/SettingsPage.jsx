import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SettingsSidebar from "../components/settings/SettingsSidebar";

// 기본 아이콘들
const ArrowLeftIcon = (props) => (
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
    <path d="m12 19-7-7 7-7"></path>
    <path d="M19 12H5"></path>
  </svg>
);

export default function SettingsPage() {
  const [currentSection, setCurrentSection] = useState("profile");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBack = () => {
    navigate(-1);
  };

  const renderContent = () => {
    switch (currentSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">프로필 설정</h2>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-gray-600">프로필 설정 내용이 여기에 표시됩니다.</p>
              <p className="text-sm text-gray-500 mt-2">곧 구현될 예정입니다.</p>
            </div>
          </div>
        );
      case "security":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">보안 설정</h2>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-gray-600">보안 설정 내용이 여기에 표시됩니다.</p>
              <p className="text-sm text-gray-500 mt-2">곧 구현될 예정입니다.</p>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">알림 설정</h2>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-gray-600">알림 설정 내용이 여기에 표시됩니다.</p>
              <p className="text-sm text-gray-500 mt-2">곧 구현될 예정입니다.</p>
            </div>
          </div>
        );
      case "account":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">계정 관리</h2>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-gray-600">계정 관리 내용이 여기에 표시됩니다.</p>
              <p className="text-sm text-gray-500 mt-2">곧 구현될 예정입니다.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="뒤로 가기"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">설정</h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* 사이드바 */}
          <div className="w-64 flex-shrink-0">
            <SettingsSidebar
              currentSection={currentSection}
              onSectionChange={setCurrentSection}
            />
          </div>

          {/* 메인 설정 영역 */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}