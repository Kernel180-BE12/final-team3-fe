import React from 'react';

// HOME-001-FTR-001: 푸터 컴포넌트
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} AI 알림톡 생성기. All rights reserved.</p>
        <div className="mt-4 space-x-6">
          <a href="#" className="hover:text-gray-800">회사 정보</a>
          <a href="#" className="hover:text-gray-800">이용약관</a>
          <a href="#" className="hover:text-gray-800">개인정보처리방침</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
