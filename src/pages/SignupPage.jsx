import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Footer from "@/components/Footer";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuth();

  // 회원가입 폼의 각 입력 값을 관리하기 위한 state 설정
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    verificationCode: "", // 인증 코드 state 추가
    termsAgreed: false,
    privacyAgreed: false,
  });

  // 이메일 인증 과정을 관리하기 위한 state 추가
  const [isVerificationSent, setIsVerificationSent] = useState(false); // 인증 코드 발송 여부
  const [isVerified, setIsVerified] = useState(false); // 이메일 인증 완료 여부
  const [canResend, setCanResend] = useState(false); // 인증 재전송 가능 여부
  const [timer, setTimer] = useState(180); // 인증 코드 유효 시간 (3분)
  const [verificationToken, setVerificationToken] = useState(""); // 인증 토큰

  // 타이머 로직
  useEffect(() => {
    // 인증 코드가 발송되지 않았거나 이미 인증이 완료되었다면 타이머를 실행하지 않음
    if (!isVerificationSent || isVerified) return;

    setCanResend(false); // 새로 인증요청하면 재전송 불가능
    setTimer(180); // 다시 3분 세팅

    // 1초마다 타이머 감소
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          // 시간이 만료되었을 때의 로직 (예: 재전송 버튼 활성화)
          setCanResend(true); // 만료시 재전송 가능
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // 컴포넌트가 언마운트될 때 interval 정리
    return () => clearInterval(interval);
  }, [isVerificationSent, isVerified]);

  // 입력 값 변경 시 formData state를 업데이트하는 핸들러 함수
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 인증 요청 버튼 클릭 핸들러
  const handleRequestVerification = async () => {
    if (!formData.email) {
      alert("이메일 주소를 입력해주세요.");
      return;
    }
    console.log(`${formData.email}으로 인증 코드 요청`);
    // TODO: 실제 이메일 인증 코드 발송 API 호출
    try {
      // 실제 API 연동
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/email/otp/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      if (response.ok) {
        setIsVerificationSent(true); //인증 코드 발송 여부
        setIsVerified(false); // 재요청 시 인증 상태 초기화
        setCanResend(false);
        setTimer(180); // 타이머 초기화
        alert("입력하신 이메일로 인증 코드가 발송되었습니다.");
      } else {
        alert("인증코드 발송에 실패했습니다.");
      }
    } catch (e) {
      alert("인증코드 발송에 실패했습니다." + e);
    }
  };

  // 인증 코드 확인 버튼 클릭 핸들러
  const handleConfirmVerification = async () => {
    console.log(`입력된 코드: ${formData.verificationCode}`);
    // 입력된 인증 코드 검증 API 호출
    try {
      // 실제 API 연동
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/email/otp/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            code: formData.verificationCode,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setIsVerified(true);
        setVerificationToken(result.data.verificationToken);
        console.log(response.message);
        alert("이메일 인증이 완료되었습니다!");
      } else {
        // const data = await response.json();
        alert("인증 코드가 올바르지 않습니다.");
        // console.log(data.error.message);
      }
    } catch (e) {
      alert("인증 확인 중 오류가 발생했습니다." + e);
    }

    // 시뮬레이션을 위해 '123456'을 정답으로 가정
    //if (formData.verificationCode === '123456') {
    //  setIsVerified(true);
    //  alert('이메일 인증이 완료되었습니다.');
    //} else {
    //  alert('인증 코드가 올바르지 않습니다.');
    //}
  };

  // 이메일 회원가입 버튼 클릭 시 실행될 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    // 비밀번호와 비밀번호 확인 값이 일치하는지 검사
    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("이메일로 회원가입 시도:", formData);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.nickname,
          emailVerificationToken: verificationToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("회원가입이 완료되었습니다!");
        // 회원가입 성공 시 로그인 페이지로 이동
        console.log("회원가입 성공:", data.message);
        navigate("/login");
      } else {
        console.error("회원가입 실패:", data);
        alert(data.error.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  // 카카오로 시작하기 버튼 클릭 시 실행될 함수
  const handleKakaoSignup = async () => {
    console.log("카카오로 회원가입 시도");
    // TODO: 실제 카카오 소셜 로그인/가입 API 연동 로직 구현
  };

  // 모든 필수 항목이 채워졌는지 확인하여 가입하기 버튼 활성화 여부 결정
  const isFormValid =
    formData.email &&
    isVerified &&
    formData.password &&
    formData.passwordConfirm &&
    formData.nickname &&
    formData.termsAgreed &&
    formData.privacyAgreed;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12">
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
          {/* --- 이메일 입력 및 인증 섹션 --- */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              이메일 주소
            </label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isVerified}
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={handleRequestVerification}
                disabled={!formData.email || isVerified}
                className="flex-shrink-0 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isVerified
                  ? "인증 완료"
                  : isVerificationSent
                  ? "재전송"
                  : "인증 요청"}
              </button>
            </div>
          </div>

          {/* --- 인증 코드 입력 섹션 (조건부 렌더링) --- */}
          {isVerificationSent && !isVerified && (
            <div>
              <label
                htmlFor="verificationCode"
                className="text-sm font-medium text-gray-700"
              >
                인증 코드
              </label>
              <div className="flex items-center space-x-2 mt-1">
                <div className="relative w-full">
                  <input
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    maxLength="6"
                    placeholder="숫자 6자리 입력"
                    required
                    value={formData.verificationCode}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {timer > 0 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-red-500 font-medium">
                      {Math.floor(timer / 60)}:
                      {String(timer % 60).padStart(2, "0")}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleConfirmVerification}
                  className="flex-shrink-0 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  확인
                </button>
              </div>
              {/* 타이머 만료시 재전송 안내 */}
              {canResend && (
                <div className="mt-1 text-sm text-blue-500">
                  인증코드 유효시간이 만료되었습니다. "재전송"을 눌러주세요.
                </div>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              8자 이상, 영문/숫자/특수문자 조합
            </p>
          </div>
          <div>
            <label
              htmlFor="passwordConfirm"
              className="text-sm font-medium text-gray-700"
            >
              비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              required
              value={formData.passwordConfirm}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="nickname"
              className="text-sm font-medium text-gray-700"
            >
              이름 (닉네임)
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              required
              value={formData.nickname}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-start">
              <input
                id="termsAgreed"
                name="termsAgreed"
                type="checkbox"
                checked={formData.termsAgreed}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
              />
              <div className="ml-3 text-sm">
                <label
                  htmlFor="termsAgreed"
                  className="font-medium text-gray-700"
                >
                  <a href="#" className="text-indigo-600 hover:underline">
                    이용약관
                  </a>
                  에 동의합니다. (필수)
                </label>
              </div>
            </div>
            <div className="flex items-start">
              <input
                id="privacyAgreed"
                name="privacyAgreed"
                type="checkbox"
                checked={formData.privacyAgreed}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
              />
              <div className="ml-3 text-sm">
                <label
                  htmlFor="privacyAgreed"
                  className="font-medium text-gray-700"
                >
                  <a href="#" className="text-indigo-600 hover:underline">
                    개인정보처리방침
                  </a>
                  에 동의합니다. (필수)
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
          이미 계정이 있으신가요?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
