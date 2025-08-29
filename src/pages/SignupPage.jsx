import React, { useState } from 'react';
import Footer from "@/components/Footer";

export default function SignupPage() {
  // 회원가입 폼의 각 입력 값을 관리하기 위한 state 설정
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    termsAgreed: false,
    privacyAgreed: false,
  });

  // 입력 값 변경 시 formData state를 업데이트하는 핸들러 함수
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 이메일 회원가입 버튼 클릭 시 실행될 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    // 비밀번호와 비밀번호 확인 값이 일치하는지 검사
    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          nickname: formData.nickname,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('회원가입이 완료되었습니다!');
        // 회원가입 성공 시 로그인 페이지로 이동하거나 다른 처리
        console.log('회원가입 성공:', data.user);
      } else {
        console.error('회원가입 실패:', data);
        if (data.fieldErrors) {
          // 필드별 오류 메시지 표시
          const errorMessages = Object.entries(data.fieldErrors).map(
            ([field, message]) => `${field}: ${message}`
          ).join('\n');
          alert(`입력값 오류:\n${errorMessages}`);
        } else {
          alert(data.message || '회원가입에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('회원가입 에러:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  // 카카오로 시작하기 버튼 클릭 시 실행될 함수
  const handleKakaoSignup = () => {
    console.log('카카오로 회원가입 시도');
    // TODO: 실제 카카오 소셜 로그인/가입 API 연동 로직 구현
  };

  // 모든 필수 항목이 채워졌는지 확인하여 가입하기 버튼 활성화 여부 결정
  const isFormValid = formData.email && formData.password && formData.passwordConfirm && formData.nickname && formData.termsAgreed && formData.privacyAgreed;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex justify-center items-center py-12">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-md">
        {/* 페이지 상단 로고 및 제목 */}
        <div className="text-center mb-8">
          <a href="/" className="text-2xl font-bold text-gray-800">
            AI 알림톡 생성기
          </a>
          <h2 className="mt-2 text-xl text-gray-600">회원가입</h2>
        </div>

        {/* 이메일 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... (이메일, 비밀번호, 닉네임, 약관 동의 입력 필드는 이전과 동일) ... */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">이메일 주소</label>
            <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">비밀번호</label>
            <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            <p className="mt-1 text-xs text-gray-500">8자 이상, 영문/숫자/특수문자 조합</p>
          </div>
          <div>
            <label htmlFor="passwordConfirm" className="text-sm font-medium text-gray-700">비밀번호 확인</label>
            <input id="passwordConfirm" name="passwordConfirm" type="password" required value={formData.passwordConfirm} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="nickname" className="text-sm font-medium text-gray-700">이름 (닉네임)</label>
            <input id="nickname" name="nickname" type="text" required value={formData.nickname} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="space-y-2">
            <div className="flex items-start">
              <input id="termsAgreed" name="termsAgreed" type="checkbox" checked={formData.termsAgreed} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1" />
              <div className="ml-3 text-sm">
                <label htmlFor="termsAgreed" className="font-medium text-gray-700">
                  <a href="#" className="text-indigo-600 hover:underline">이용약관</a>에 동의합니다. (필수)
                </label>
              </div>
            </div>
            <div className="flex items-start">
              <input id="privacyAgreed" name="privacyAgreed" type="checkbox" checked={formData.privacyAgreed} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1" />
              <div className="ml-3 text-sm">
                <label htmlFor="privacyAgreed" className="font-medium text-gray-700">
                  <a href="#" className="text-indigo-600 hover:underline">개인정보처리방침</a>에 동의합니다. (필수)
                </label>
              </div>
            </div>
          </div>

          {/* AUTH-002-BTN-001: 가입하기 버튼 */}
          <div>
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              가입하기
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

        {/* 카카오로 시작하기 버튼 */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleKakaoSignup}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-[#FEE500] text-[#3A1D1D] hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <img 
              className="w-5 h-5 mr-2" 
              src="https://jober.io/static/media/kakao.534505c42de25bd089e61b9192bfe0f8.svg" 
              alt="카카오 버튼" 
            />
            <span>카카오로 3초만에 시작하기</span>
          </button>
        </div>

        {/* 로그인 페이지로 이동 링크 */}
        <p className="mt-8 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?{' '}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            로그인
          </a>
        </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
