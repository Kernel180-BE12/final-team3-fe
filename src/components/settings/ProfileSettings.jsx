import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

// 아이콘 컴포넌트들
const CameraIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
    <circle cx="12" cy="13" r="3"></circle>
  </svg>
);

const LoaderIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin"
    {...props}
  >
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);

// 임시 API 호출 함수들 (나중에 실제 API로 교체)
const useProfileAPI = () => {
  const updateProfile = async (profileData) => {
    // TODO: 백엔드 API 구현 대기 중
    console.log('프로필 업데이트 요청:', profileData);

    // 임시로 localStorage에 저장 (데모용)
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = { ...currentUser, ...profileData };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // 2초 대기 (실제 API 호출 시뮬레이션)
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      success: true,
      data: updatedUser,
      message: '프로필이 성공적으로 업데이트되었습니다.'
    };
  };

  const uploadAvatar = async (file) => {
    console.log('프로필 사진 업로드 요청:', file.name);

    // 이미지 파일을 base64로 변환 (임시)
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const avatarUrl = e.target.result;
        setTimeout(() => {
          resolve({
            success: true,
            data: { avatarUrl },
            message: '프로필 사진이 업로드되었습니다.'
          });
        }, 1500);
      };
      reader.readAsDataURL(file);
    });
  };

  return { updateProfile, uploadAvatar };
};

export default function ProfileSettings() {
  const { user, login } = useAuth();
  const { updateProfile, uploadAvatar } = useProfileAPI();
  const fileInputRef = useRef(null);

  // 이메일에서 이름 추출 함수
  const getNameFromEmail = (email) => {
    if (!email) return '';
    return email.split('@')[0];
  };

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    avatar: ''
  });

  // user 정보가 로드되면 폼 데이터 업데이트
  useEffect(() => {
    console.log('ProfileSettings - user 객체:', user);
    if (user?.email) {
      console.log('이메일 찾음:', user.email);
      console.log('추출된 이름:', getNameFromEmail(user.email));
      setFormData({
        name: user?.name || getNameFromEmail(user.email),
        email: user.email,
        phone: user?.phone || '',
        company: user?.company || '',
        avatar: user?.avatar || ''
      });
    } else {
      console.log('user 또는 user.email이 없음');
    }
  }, [user]);

  // UI 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // 유효성 검사
  const validateForm = () => {
    const newErrors = {};

    // 이름 검사
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '이름은 2글자 이상 입력해주세요.';
    }

    // 이메일은 수정 불가이므로 검사하지 않음 (항상 현재 로그인 이메일 사용)

    // 전화번호 검사 (선택사항이지만 입력했다면 형식 체크)
    if (formData.phone) {
      const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/;
      if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ''))) {
        newErrors.phone = '올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 프로필 저장 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({ type: 'error', text: '입력 정보를 확인해주세요.' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await updateProfile(formData);

      if (result.success) {
        // useAuth의 user 상태 업데이트
        const currentToken = localStorage.getItem('token');
        const currentRefreshToken = localStorage.getItem('refreshToken');
        login(currentToken, currentRefreshToken, result.data);

        setMessage({ type: 'success', text: result.message });
      } else {
        setMessage({ type: 'error', text: result.message || '프로필 업데이트에 실패했습니다.' });
      }
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
      setMessage({ type: 'error', text: '프로필 업데이트 중 오류가 발생했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  // 프로필 사진 변경 핸들러
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 크기 검사 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: '파일 크기는 5MB 이하여야 합니다.' });
      return;
    }

    // 파일 형식 검사
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: '이미지 파일만 업로드 가능합니다.' });
      return;
    }

    setIsUploadingAvatar(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await uploadAvatar(file);

      if (result.success) {
        setFormData(prev => ({
          ...prev,
          avatar: result.data.avatarUrl
        }));
        setMessage({ type: 'success', text: result.message });
      } else {
        setMessage({ type: 'error', text: result.message || '프로필 사진 업로드에 실패했습니다.' });
      }
    } catch (error) {
      console.error('프로필 사진 업로드 오류:', error);
      setMessage({ type: 'error', text: '프로필 사진 업로드 중 오류가 발생했습니다.' });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // 파일 선택 트리거
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">프로필 설정</h2>
        <p className="text-sm text-gray-600 mt-1">
          개인 정보를 관리하고 프로필을 설정할 수 있습니다.
        </p>
      </div>

      {/* 메시지 표시 */}
      {message.text && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 프로필 사진 섹션 */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="프로필 사진"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400">
                  <CameraIcon className="w-8 h-8" />
                </div>
              )}
            </div>
            {isUploadingAvatar && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <LoaderIcon className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">프로필 사진</h3>
            <p className="text-sm text-gray-600">JPG, PNG 파일 (최대 5MB)</p>
            <button
              type="button"
              onClick={triggerFileInput}
              disabled={isUploadingAvatar}
              className="mt-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploadingAvatar ? '업로드 중...' : '사진 변경'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
        </div>

        {/* 개인 정보 폼 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 이름 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="이름을 입력하세요"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          {/* 이메일 (수정 불가) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              placeholder="email@example.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              이메일 주소는 변경할 수 없습니다. 변경이 필요한 경우 고객지원에 문의해주세요.
            </p>
          </div>

          {/* 전화번호 */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              전화번호
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="010-1234-5678"
            />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
            )}
          </div>

          {/* 회사/소속 */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              회사/소속
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="회사명 또는 소속을 입력하세요"
            />
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              if (user?.email) {
                setFormData({
                  name: user?.name || getNameFromEmail(user.email),
                  email: user.email,
                  phone: user?.phone || '',
                  company: user?.company || '',
                  avatar: user?.avatar || ''
                });
              }
              setErrors({});
              setMessage({ type: '', text: '' });
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading && <LoaderIcon className="w-4 h-4" />}
            <span>{isLoading ? '저장 중...' : '저장'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}