import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-8"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="text-sm font-medium">뒤로가기</span>
    </button>
  );
};

export default BackButton;