import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// 아이콘 컴포넌트들
const GlobeIcon = (props) => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" x2="22" y1="12" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const ClockIcon = (props) => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12,6 12,12 16,14"></polyline>
  </svg>
);

const DownloadIcon = (props) => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7,10 12,15 17,10"></polyline>
    <line x1="12" x2="12" y1="15" y2="3"></line>
  </svg>
);

const TrashIcon = (props) => (
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
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c-1 0 2 1 2 2v2"></path>
    <line x1="10" x2="10" y1="11" y2="17"></line>
    <line x1="14" x2="14" y1="11" y2="17"></line>
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

const AlertTriangleIcon = (props) => (
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
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <line x1="12" x2="12" y1="9" y2="13"></line>
    <line x1="12" x2="12.01" y1="17" y2="17"></line>
  </svg>
);

// 임시 계정 관리 API 함수들 (나중에 실제 API로 교체)
const useAccountAPI = () => {
  const updateAccountSettings = async (settings) => {
    console.log('계정 설정 업데이트 요청:', settings);

    // localStorage에 저장 (임시)
    localStorage.setItem('accountSettings', JSON.stringify(settings));

    // 1초 대기 (실제 API 호출 시뮬레이션)
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      message: '계정 설정이 성공적으로 저장되었습니다.'
    };
  };

  const downloadUserData = async () => {
    console.log('사용자 데이터 다운로드 요청');

    // 임시 데이터 생성
    const userData = {
      profile: {
        name: '사용자',
        email: 'user@example.com',
        phone: '010-1234-5678',
        company: '테스트 회사'
      },
      templates: [
        { id: 1, title: '첫 번째 템플릿', createdAt: '2025-09-25' },
        { id: 2, title: '두 번째 템플릿', createdAt: '2025-09-26' }
      ],
      activities: [
        { action: '템플릿 생성', timestamp: '2025-09-28 14:30:00' },
        { action: '프로필 수정', timestamp: '2025-09-27 09:15:00' }
      ],
      settings: {
        notifications: true,
        language: 'ko',
        timezone: 'Asia/Seoul'
      }
    };

    // 2초 대기
    await new Promise(resolve => setTimeout(resolve, 2000));

    // JSON 파일로 다운로드
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `user-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return {
      success: true,
      message: '사용자 데이터가 다운로드되었습니다.'
    };
  };

  const deleteAccount = async () => {
    console.log('계정 삭제 요청');

    // 3초 대기 (실제 삭제 시뮬레이션)
    await new Promise(resolve => setTimeout(resolve, 3000));

    return {
      success: true,
      message: '계정이 성공적으로 삭제되었습니다.'
    };
  };

  const getAccountSettings = async () => {
    console.log('계정 설정 조회 요청');

    const stored = localStorage.getItem('accountSettings');

    await new Promise(resolve => setTimeout(resolve, 500));

    if (stored) {
      return {
        success: true,
        data: JSON.parse(stored)
      };
    }

    // 기본 설정 반환
    return {
      success: true,
      data: {
        language: 'ko',
        timezone: 'Asia/Seoul'
      }
    };
  };

  return { updateAccountSettings, downloadUserData, deleteAccount, getAccountSettings };
};

export default function AccountSettings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { updateAccountSettings, downloadUserData, deleteAccount, getAccountSettings } = useAccountAPI();

  // 계정 설정 상태
  const [settings, setSettings] = useState({
    language: 'ko',
    timezone: 'Asia/Seoul'
  });

  // UI 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  // 컴포넌트 마운트 시 설정 로드
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const result = await getAccountSettings();
      if (result.success) {
        setSettings(result.data);
      }
    } catch (error) {
      console.error('계정 설정 로드 오류:', error);
      setMessage({ type: 'error', text: '계정 설정을 불러오는 중 오류가 발생했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  // 설정 변경 핸들러
  const handleSettingChange = async (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value
    };

    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  // 설정 저장
  const saveSettings = async (newSettings) => {
    try {
      const result = await updateAccountSettings(newSettings);
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('계정 설정 저장 오류:', error);
      setMessage({ type: 'error', text: '설정 저장 중 오류가 발생했습니다.' });
    }
  };

  // 데이터 다운로드 핸들러
  const handleDownload = async () => {
    setIsDownloading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await downloadUserData();
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
      }
    } catch (error) {
      console.error('데이터 다운로드 오류:', error);
      setMessage({ type: 'error', text: '데이터 다운로드 중 오류가 발생했습니다.' });
    } finally {
      setIsDownloading(false);
    }
  };

  // 계정 삭제 핸들러
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== '계정삭제') {
      setMessage({ type: 'error', text: '"계정삭제"를 정확히 입력해주세요.' });
      return;
    }

    setIsDeletingAccount(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await deleteAccount();
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        // 2초 후 로그아웃 및 로그인 페이지로 이동
        setTimeout(() => {
          logout();
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('계정 삭제 오류:', error);
      setMessage({ type: 'error', text: '계정 삭제 중 오류가 발생했습니다.' });
    } finally {
      setIsDeletingAccount(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoaderIcon className="w-8 h-8 text-gray-400" />
        <span className="ml-3 text-gray-600">계정 설정을 불러오는 중...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">계정 관리</h2>
        <p className="text-sm text-gray-600 mt-1">
          언어, 시간대, 데이터 관리 및 계정 삭제 등의 설정을 관리할 수 있습니다.
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

      {/* 언어 및 지역 설정 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">언어 및 지역 설정</h3>

        <div className="space-y-6">
          {/* 언어 설정 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-gray-50">
                <GlobeIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">언어</h4>
                <p className="text-sm text-gray-600">인터페이스 언어를 선택하세요.</p>
              </div>
            </div>
            <div className="ml-4">
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          {/* 시간대 설정 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-gray-50">
                <ClockIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">시간대</h4>
                <p className="text-sm text-gray-600">알림 및 활동 시간 표시 기준을 설정하세요.</p>
              </div>
            </div>
            <div className="ml-4">
              <select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Asia/Seoul">서울 (UTC+9)</option>
                <option value="America/New_York">뉴욕 (UTC-5)</option>
                <option value="Europe/London">런던 (UTC+0)</option>
                <option value="Asia/Tokyo">도쿄 (UTC+9)</option>
                <option value="Australia/Sydney">시드니 (UTC+11)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 데이터 관리 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">데이터 관리</h3>

        <div className="space-y-4">
          {/* 데이터 다운로드 */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-gray-50">
                <DownloadIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">데이터 다운로드</h4>
                <p className="text-sm text-gray-600">
                  계정에 저장된 모든 데이터를 JSON 형식으로 다운로드할 수 있습니다.
                </p>
              </div>
            </div>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isDownloading && <LoaderIcon className="w-4 h-4" />}
              <span>{isDownloading ? '다운로드 중...' : '다운로드'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 위험한 작업 */}
      <div className="bg-white border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-red-900 mb-6 flex items-center">
          <AlertTriangleIcon className="w-5 h-5 mr-2" />
          위험한 작업
        </h3>

        <div className="space-y-4">
          {/* 계정 삭제 */}
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-red-100">
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-red-900">계정 삭제</h4>
                  <p className="text-sm text-red-700 mt-1">
                    계정을 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없으며,
                    모든 데이터가 삭제됩니다.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                계정 삭제
              </button>
            </div>

            {/* 삭제 확인 모달 */}
            {showDeleteConfirm && (
              <div className="mt-6 p-4 border border-red-300 rounded-lg bg-white">
                <h5 className="text-sm font-medium text-red-900 mb-3">
                  정말로 계정을 삭제하시겠습니까?
                </h5>
                <p className="text-sm text-red-700 mb-4">
                  이 작업은 되돌릴 수 없습니다. 계속하려면 아래에 <strong>"계정삭제"</strong>를 입력해주세요.
                </p>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="계정삭제"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteConfirmText('');
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      disabled={isDeletingAccount || deleteConfirmText !== '계정삭제'}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isDeletingAccount && <LoaderIcon className="w-4 h-4" />}
                      <span>{isDeletingAccount ? '삭제 중...' : '계정 삭제'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}