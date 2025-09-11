import React, { useState } from 'react';
import Footer from "@/components/Footer";
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

// 카카오 로고 SVG 아이콘 컴포넌트
const KakaoIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2">
    <ellipse cx="18" cy="18" rx="18" ry="18" fill="#FEE500"/>
    <path d="M18 7C11.373 7 6 11.029 6 16c0 3.097 2.077 5.605 5.346 6.895L10.5 29l7.273-5.061c.14.009.281.014.427.014 6.627 0 12-4.029 12-9s-5.373-9-12-9z" fill="#391B1B"/>
  </svg>
);


export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuth();
  
  // 컴포넌트의 상태(State)를 관리합니다.
  // 이메일과 비밀번호 입력 값을 저장하기 위해 useState 훅을 사용합니다.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 로그인 버튼 클릭 시 실행될 함수입니다.
  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지합니다.
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8580/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // 로그인 성공 - JWT 토큰과 사용자 정보를 useAuth 훅을 통해 저장
        const userData = {
          email: email
        };
        login(data.data.accessToken, userData);
        alert('로그인이 성공했습니다!');
        navigate('/dashboard'); // 대시보드로 이동
      } else {
        setError(data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setError('서버와의 연결에 문제가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 인증 상태 확인 중이면 로딩 표시
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-md">
        {/* 페이지 상단 로고 및 제목 */}
        <div className="text-center mb-8">
          <a href="/" className="text-2xl font-bold text-gray-800">
            AI 알림톡 생성기
          </a>
          <h2 className="mt-2 text-xl text-gray-600">로그인</h2>
        </div>

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin}>
          <div className="space-y-6">
            {/* AUTH-001-INP-001: 이메일 입력 */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                이메일 주소
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
              />
            </div>

            {/* AUTH-001-INP-002: 비밀번호 입력 */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* AUTH-001-LNK-002: 비밀번호 찾기 링크 */}
          <div className="flex items-center justify-end mt-4">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                비밀번호를 잊으셨나요?
              </a>
            </div>
          </div>

          {/* AUTH-001-BTN-001: 로그인 버튼 */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </div>
        </form>

        {/* 구분선 */}
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>

        {/* AUTH-001-BTN-002: 소셜 로그인 (카카오) */}
        <div className="mt-6">
          <a
            href="#"
            className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <KakaoIcon />
            카카오로 로그인
          </a>
        </div>

        {/* AUTH-001-LNK-001: 회원가입 링크 */}
        <p className="mt-8 text-center text-sm text-gray-600">
          계정이 없으신가요?{' '}
          <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            회원가입
          </a>
        </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
