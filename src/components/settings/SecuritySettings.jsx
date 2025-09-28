import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

// 아이콘 컴포넌트들
const EyeIcon = (props) => (
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
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = (props) => (
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
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 8 11 8a13.16 13.16 0 0 1-1.67 2.68"></path>
    <path d="M6.61 6.61A13.526 13.526 0 0 0 1 12s4 8 11 8a9.74 9.74 0 0 0 5.39-1.61"></path>
    <line x1="2" x2="22" y1="2" y2="22"></line>
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

const MonitorIcon = (props) => (
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
    <rect width="20" height="14" x="2" y="3" rx="2"></rect>
    <line x1="8" x2="16" y1="21" y2="21"></line>
    <line x1="12" x2="12" y1="17" y2="21"></line>
  </svg>
);

const SmartphoneIcon = (props) => (
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
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
    <line x1="12" x2="12.01" y1="18" y2="18"></line>
  </svg>
);

// 임시 보안 API 함수들 (나중에 실제 API로 교체)
const useSecurityAPI = () => {
  const changePassword = async (passwordData) => {
    console.log('비밀번호 변경 요청:', passwordData);

    // 임시 검증 (실제로는 서버에서 확인)
    if (passwordData.currentPassword !== 'test1234') {
      return {
        success: false,
        message: '현재 비밀번호가 올바르지 않습니다.'
      };
    }

    // 2초 대기 (실제 API 호출 시뮬레이션)
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      success: true,
      message: '비밀번호가 성공적으로 변경되었습니다.'
    };
  };

  const getLoginHistory = async () => {
    console.log('로그인 기록 조회 요청');

    // 1초 대기
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 임시 목 데이터
    return {
      success: true,
      data: [
        {
          id: 1,
          loginTime: '2025-09-28 14:30:15',
          device: 'Chrome 브라우저',
          location: '서울, 대한민국',
          ip: '192.168.1.100',
          status: 'success',
          isCurrent: true
        },
        {
          id: 2,
          loginTime: '2025-09-27 09:15:42',
          device: 'Samsung Galaxy',
          location: '서울, 대한민국',
          ip: '192.168.1.101',
          status: 'success',
          isCurrent: false
        },
        {
          id: 3,
          loginTime: '2025-09-26 18:45:23',
          device: 'Chrome 브라우저',
          location: '부산, 대한민국',
          ip: '192.168.2.50',
          status: 'success',
          isCurrent: false
        },
        {
          id: 4,
          loginTime: '2025-09-25 12:20:11',
          device: '알 수 없는 기기',
          location: '알 수 없는 위치',
          ip: '203.123.45.67',
          status: 'failed',
          isCurrent: false
        }
      ]
    };
  };

  return { changePassword, getLoginHistory };
};

export default function SecuritySettings() {
  const { user } = useAuth();
  const { changePassword, getLoginHistory } = useSecurityAPI();

  // 비밀번호 변경 폼 상태
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 비밀번호 표시/숨김 상태
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // 로그인 기록 상태
  const [loginHistory, setLoginHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // UI 상태 관리
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});

  // 컴포넌트 마운트 시 로그인 기록 로드
  useEffect(() => {
    loadLoginHistory();
  }, []);

  const loadLoginHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const result = await getLoginHistory();
      if (result.success) {
        setLoginHistory(result.data);
      }
    } catch (error) {
      console.error('로그인 기록 로드 오류:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
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

  // 비밀번호 표시/숨김 토글
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // 비밀번호 유효성 검사
  const validatePasswordForm = () => {
    const newErrors = {};

    // 현재 비밀번호 검사
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = '현재 비밀번호를 입력해주세요.';
    }

    // 새 비밀번호 검사
    if (!passwordForm.newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요.';
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = '비밀번호는 8자 이상이어야 합니다.';
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(passwordForm.newPassword)) {
      newErrors.newPassword = '비밀번호는 영문과 숫자를 포함해야 합니다.';
    }

    // 비밀번호 확인 검사
    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = '새 비밀번호와 일치하지 않습니다.';
    }

    // 현재 비밀번호와 새 비밀번호 동일성 검사
    if (passwordForm.currentPassword && passwordForm.newPassword &&
        passwordForm.currentPassword === passwordForm.newPassword) {
      newErrors.newPassword = '새 비밀번호는 현재 비밀번호와 달라야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 비밀번호 변경 제출
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      setMessage({ type: 'error', text: '입력 정보를 확인해주세요.' });
      return;
    }

    setIsChangingPassword(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await changePassword(passwordForm);

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        // 폼 초기화
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setShowPasswords({
          current: false,
          new: false,
          confirm: false
        });
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      setMessage({ type: 'error', text: '비밀번호 변경 중 오류가 발생했습니다.' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  // 기기 아이콘 선택
  const getDeviceIcon = (device) => {
    if (device.toLowerCase().includes('mobile') || device.toLowerCase().includes('galaxy')) {
      return <SmartphoneIcon className="w-5 h-5" />;
    }
    return <MonitorIcon className="w-5 h-5" />;
  };

  // 상태별 색상
  const getStatusColor = (status, isCurrent) => {
    if (isCurrent) return 'text-green-600 bg-green-50 border-green-200';
    if (status === 'success') return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getStatusText = (status, isCurrent) => {
    if (isCurrent) return '현재 세션';
    if (status === 'success') return '성공';
    return '실패';
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">보안 설정</h2>
        <p className="text-sm text-gray-600 mt-1">
          계정의 보안을 강화하고 로그인 활동을 관리할 수 있습니다.
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

      {/* 비밀번호 변경 섹션 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">비밀번호 변경</h3>
        <p className="text-sm text-gray-600 mb-6">
          정기적으로 비밀번호를 변경하여 계정 보안을 강화하세요.
        </p>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {/* 현재 비밀번호 */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
              현재 비밀번호 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="현재 비밀번호를 입력하세요"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.current ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-sm text-red-600 mt-1">{errors.currentPassword}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              데모용 임시 비밀번호: temp123
            </p>
          </div>

          {/* 새 비밀번호 */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              새 비밀번호 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.newPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="새 비밀번호를 입력하세요"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-sm text-red-600 mt-1">{errors.newPassword}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              8자 이상, 영문과 숫자를 포함해야 합니다.
            </p>
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              새 비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="새 비밀번호를 다시 입력하세요"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* 변경 버튼 */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isChangingPassword}
              className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isChangingPassword && <LoaderIcon className="w-4 h-4" />}
              <span>{isChangingPassword ? '변경 중...' : '비밀번호 변경'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 로그인 기록 섹션 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">로그인 기록</h3>
          <button
            onClick={loadLoginHistory}
            disabled={isLoadingHistory}
            className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
          >
            {isLoadingHistory ? '새로고침 중...' : '새로고침'}
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          최근 로그인 활동을 확인하고 의심스러운 활동이 있는지 모니터링하세요.
        </p>

        {isLoadingHistory ? (
          <div className="flex items-center justify-center py-8">
            <LoaderIcon className="w-6 h-6 text-gray-400" />
            <span className="ml-2 text-gray-600">로그인 기록을 불러오는 중...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {loginHistory.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-gray-600">
                    {getDeviceIcon(log.device)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900">{log.device}</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(log.status, log.isCurrent)}`}>
                        {getStatusText(log.status, log.isCurrent)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{log.location}</p>
                    <p className="text-xs text-gray-500">IP: {log.ip}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{log.loginTime}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}