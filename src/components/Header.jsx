import React, { useState, useEffect } from 'react';

// HOME-001-HDR: 헤더 컴포넌트
const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // localStorage에서 사용자 정보 확인
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('사용자 데이터 파싱 오류:', error);
        localStorage.removeItem('user'); // 잘못된 데이터 제거
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      // 백엔드 로그아웃 API 호출
      const response = await fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // 로그아웃 성공
        localStorage.removeItem('user');
        setUser(null);
        alert('로그아웃이 완료되었습니다.');
        window.location.reload(); // 페이지 새로고침으로 상태 초기화
      } else {
        console.error('로그아웃 실패:', data.message);
        // 실패해도 클라이언트 측 로그아웃은 수행
        localStorage.removeItem('user');
        setUser(null);
        window.location.reload();
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
      // 네트워크 오류가 발생해도 클라이언트 측 로그아웃은 수행
      localStorage.removeItem('user');
      setUser(null);
      alert('서버와의 연결에 문제가 있지만 로그아웃을 진행합니다.');
      window.location.reload();
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* HOME-001-HDR-001: 헤더 로고 */}
        <a href="/" className="text-xl font-bold text-gray-800">
          AI 알림톡 생성기
        </a>
        <nav className="space-x-4">
          {user ? (
            // 로그인된 상태
            <>
              <span className="text-gray-600">
                안녕하세요, {user.nickname}님!
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
              <a href="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">
                로그인
              </a>
              {/* HOME-001-HDR-003: 회원가입 버튼 */}
              <a href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
                회원가입
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
