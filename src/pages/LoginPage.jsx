import React, { useState } from 'react';
import Footer from "@/components/Footer";

// 카카오 로고 SVG 아이콘 컴포넌트
const KakaoIcon = () => (
  <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2">
    <path fill="#3A1D1D" d="M19 38c10.493 0 19-8.507 19-19S29.493 0 19 0 0 8.507 0 19s8.507 19 19 19z"></path>
    <path fill="#FFEB00" d="M19.428 13.517c-4.237 0-7.67 2.75-7.67 6.143 0 2.34 1.638 4.413 4.028 5.48- .22.22-.463.418-.727.593-1.203.793-2.68 1.2-4.28 1.2-4.173 0-7.553-2.68-7.553-5.986C3.226 18.26 6.606 15.58 10.78 15.58c1.615 0 3.092.42 4.337 1.155.242-.336.507-.65.788-.942-1.66-1.55-3.8-2.276-6.05-2.276-5.52 0-9.988 3.52-9.988 7.86 0 4.34 4.468 7.86 9.988 7.86 2.19 0 4.225-.65 5.92-1.85.118.16.24.316.368.47.28.335.57.65.87.942-1.267.985-2.87 1.57-4.62 1.57-4.237 0-7.67-2.75-7.67-6.143 0-2.34 1.638-4.413 4.028-5.48.22-.22.463-.418.727-.593 1.203-.793 2.68-1.2 4.28-1.2 4.173 0 7.553 2.68 7.553 5.986 0 3.305-3.38 5.985-7.553 5.985-1.615 0-3.092-.42-4.337-1.155-.242.336-.507-.65-.788-.942 1.66 1.55 3.8 2.276 6.05 2.276 5.52 0 9.988-3.52 9.988-7.86 0-4.34-4.468-7.86-9.988-7.86-2.19 0-4.225-.65-5.92-1.85-.118-.16-.24.316-.368-.47-.28-.335-.57-.65-.87-.942 1.267-.985 2.87-1.57-4.62-1.57z"></path>
  </svg>
);

export default function LoginPage() {
  // 컴포넌트의 상태(State)를 관리합니다.
  // 이메일과 비밀번호 입력 값을 저장하기 위해 useState 훅을 사용합니다.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 버튼 클릭 시 실행될 함수입니다.
  // 현재는 콘솔에 입력 값을 출력하는 기능만 구현되어 있습니다.
  const handleLogin = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지합니다.
    console.log('로그인 시도:', { email, password });
    // TODO: 실제 로그인 API 호출 로직을 여기에 구현해야 합니다.
  };

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
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              로그인
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
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            회원가입
          </a>
        </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
