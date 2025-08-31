import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '@/utils/api';
import useAuth from '@/hooks/useAuth';

// HOME-001-HDR: 헤더 컴포넌트
const Header = () => {
  const { isAuthenticated, user, logout: authLogout } = useAuth();

  const handleLogout = async () => {
    try {
      // 백엔드 로그아웃 API 호출 (JWT 토큰 포함)
      const data = await logout();
      
      if (data.success) {
        // 로그아웃 성공
        authLogout();
        alert('로그아웃이 완료되었습니다.');
        window.location.href = '/'; // 홈페이지로 이동
      } else {
        console.error('로그아웃 실패:', data.message);
        // 실패해도 클라이언트 측 로그아웃은 수행
        authLogout();
        window.location.href = '/';
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
      // 네트워크 오류가 발생해도 클라이언트 측 로그아웃은 수행
      authLogout();
      alert('서버와의 연결에 문제가 있지만 로그아웃을 진행합니다.');
      window.location.href = '/';
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* HOME-001-HDR-001: 헤더 로고 */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          AI 알림톡 생성기
        </Link>
        
        <div className="flex items-center space-x-6">
          {/* 네비게이션 메뉴 - 로그인한 사용자만 표시 */}
          {isAuthenticated && (
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/dashboard" 
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                대시보드
              </Link>
              <Link 
                to="/templates" 
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                템플릿 관리
              </Link>
              <Link 
                to="/create" 
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                템플릿 생성
              </Link>
            </nav>
          )}
          
          {/* 사용자 메뉴 */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              // 로그인된 상태
              <>
                <span className="text-gray-600">
                  안녕하세요, {user?.nickname}님!
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  로그아웃
                </button>
              </>
            ) : (
              // 로그인되지 않은 상태
              <>
                {/* HOME-001-HDR-002: 로그인 버튼 */}
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  로그인
                </Link>
                {/* HOME-001-HDR-003: 회원가입 버튼 */}
                <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
