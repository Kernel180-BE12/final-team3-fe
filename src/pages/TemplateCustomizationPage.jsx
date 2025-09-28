import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import KakaoPreview from "../components/customization/KakaoPreview";

// 아이콘 컴포넌트들
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

const SaveIcon = (props) => (
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
    {...props}
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const RefreshCwIcon = (props) => (
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
    {...props}
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
    <path d="M21 3v5h-5"></path>
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
    <path d="M3 21v-5h5"></path>
  </svg>
);

export default function TemplateCustomizationPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // 임시 상태 관리 (Phase 4에서 Zustand로 전환 예정)
  const [settings, setSettings] = useState({
    style: {
      theme: 'light',
      primaryColor: '#6366f1',
      fontSize: 'medium',
      buttonStyle: 'rounded',
      layout: 'compact'
    },
    defaults: {
      companyName: '',
      contactInfo: '',
      category: 'business',
      language: 'formal'
    }
  });

  // 뒤로가기 핸들러
  const handleGoBack = () => {
    navigate(-1);
  };

  // 설정 저장 핸들러 (임시)
  const handleSaveSettings = () => {
    console.log('저장할 설정:', settings);
    alert('설정이 저장되었습니다.');
  };

  // 초기화 핸들러
  const handleResetSettings = () => {
    if (confirm('모든 설정을 기본값으로 초기화하시겠습니까?')) {
      setSettings({
        style: {
          theme: 'light',
          primaryColor: '#6366f1',
          fontSize: 'medium',
          buttonStyle: 'rounded',
          layout: 'compact'
        },
        defaults: {
          companyName: '',
          contactInfo: '',
          category: 'business',
          language: 'formal'
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 뒤로가기 버튼 및 제목 */}
            <div className="flex items-center">
              <button
                onClick={handleGoBack}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors mr-4"
              >
                <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  템플릿 맞춤 설정
                </h1>
                <p className="text-sm text-gray-500">
                  템플릿 스타일과 기본값을 개인 취향에 맞게 설정하세요
                </p>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleResetSettings}
                className="flex items-center px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCwIcon className="mr-2" />
                초기화
              </button>
              <button
                onClick={handleSaveSettings}
                className="flex items-center px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <SaveIcon className="mr-2" />
                저장
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 설정 패널 (왼쪽 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* 스타일 설정 카드 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                스타일 설정
              </h2>
              <div className="space-y-4">
                {/* 색상 테마 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    색상 테마
                  </label>
                  <div className="flex space-x-3">
                    {['light', 'dark'].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => setSettings(prev => ({
                          ...prev,
                          style: { ...prev.style, theme }
                        }))}
                        className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                          settings.style.theme === theme
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {theme === 'light' ? '라이트' : '다크'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 주요 색상 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    주요 색상
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.style.primaryColor}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        style: { ...prev.style, primaryColor: e.target.value }
                      }))}
                      className="w-12 h-8 rounded border border-gray-300"
                    />
                    <span className="text-sm text-gray-600">
                      {settings.style.primaryColor}
                    </span>
                  </div>
                </div>

                {/* 폰트 크기 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    폰트 크기
                  </label>
                  <select
                    value={settings.style.fontSize}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      style: { ...prev.style, fontSize: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="small">작게</option>
                    <option value="medium">보통</option>
                    <option value="large">크게</option>
                  </select>
                </div>

                {/* 버튼 스타일 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    버튼 스타일
                  </label>
                  <div className="flex space-x-3">
                    {['rounded', 'square'].map((style) => (
                      <button
                        key={style}
                        onClick={() => setSettings(prev => ({
                          ...prev,
                          style: { ...prev.style, buttonStyle: style }
                        }))}
                        className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                          settings.style.buttonStyle === style
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {style === 'rounded' ? '둥근 모서리' : '사각 모서리'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 레이아웃 스타일 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    레이아웃
                  </label>
                  <div className="flex space-x-3">
                    {['compact', 'spacious'].map((layout) => (
                      <button
                        key={layout}
                        onClick={() => setSettings(prev => ({
                          ...prev,
                          style: { ...prev.style, layout }
                        }))}
                        className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                          settings.style.layout === layout
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {layout === 'compact' ? '컴팩트' : '여유롭게'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 기본값 설정 카드 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                기본값 설정
              </h2>
              <div className="space-y-4">
                {/* 회사명 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    기본 회사명
                  </label>
                  <input
                    type="text"
                    value={settings.defaults.companyName}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      defaults: { ...prev.defaults, companyName: e.target.value }
                    }))}
                    placeholder="회사명을 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* 연락처 정보 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    기본 연락처
                  </label>
                  <input
                    type="text"
                    value={settings.defaults.contactInfo}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      defaults: { ...prev.defaults, contactInfo: e.target.value }
                    }))}
                    placeholder="연락처를 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* 템플릿 카테고리 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    선호 카테고리
                  </label>
                  <select
                    value={settings.defaults.category}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      defaults: { ...prev.defaults, category: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="business">비즈니스</option>
                    <option value="marketing">마케팅</option>
                    <option value="notice">공지사항</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 미리보기 패널 (오른쪽 1/3) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                실시간 미리보기
              </h3>

              {/* 카카오톡 스타일 미리보기 */}
              <KakaoPreview settings={settings} />

              <div className="mt-4 text-xs text-gray-500 text-center">
                * 카테고리 변경 시 다른 템플릿이 표시됩니다
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}