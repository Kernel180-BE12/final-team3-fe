import React from 'react';

// HOME-001-HDR: 헤더 컴포넌트
const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* HOME-001-HDR-001: 헤더 로고 */}
        <a href="#" className="text-xl font-bold text-gray-800">
          AI 알림톡 생성기
        </a>
        <nav className="space-x-4">
          {/* HOME-001-HDR-002: 로그인 버튼 */}
          <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
            로그인
          </a>
          {/* HOME-001-HDR-003: 회원가입 버튼 */}
          <a href="#" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
            회원가입
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
