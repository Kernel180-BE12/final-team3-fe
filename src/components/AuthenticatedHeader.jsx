import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store/userStore';

const AuthenticatedHeader = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              AI 알림톡 생성기
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              안녕하세요, <span className="font-semibold">{user?.nickname}</span>님!
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedHeader;