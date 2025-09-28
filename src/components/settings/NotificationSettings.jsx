import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

// 아이콘 컴포넌트들
const BellIcon = (props) => (
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
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
  </svg>
);

const MailIcon = (props) => (
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
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="M22 7l-10 5L2 7"></path>
  </svg>
);

const CheckCircleIcon = (props) => (
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22,4 12,14.01 9,11.01"></polyline>
  </svg>
);

const XCircleIcon = (props) => (
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
    <path d="m15 9-6 6"></path>
    <path d="m9 9 6 6"></path>
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

// 토글 스위치 컴포넌트
const ToggleSwitch = ({ id, enabled, onToggle, disabled = false }) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onToggle()}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : enabled
          ? 'bg-indigo-600'
          : 'bg-gray-200'
      }`}
      role="switch"
      aria-checked={enabled}
      aria-labelledby={id}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

// 임시 알림 API 함수들 (나중에 실제 API로 교체)
const useNotificationAPI = () => {
  const updateNotificationSettings = async (settings) => {
    console.log('알림 설정 업데이트 요청:', settings);

    // localStorage에 저장 (임시)
    localStorage.setItem('notificationSettings', JSON.stringify(settings));

    // 1초 대기 (실제 API 호출 시뮬레이션)
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      message: '알림 설정이 성공적으로 저장되었습니다.'
    };
  };

  const getNotificationSettings = async () => {
    console.log('알림 설정 조회 요청');

    // localStorage에서 불러오기 (임시)
    const stored = localStorage.getItem('notificationSettings');

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
        templateApproval: {
          email: true,
          browser: true
        },
        templateRejection: {
          email: true,
          browser: false
        },
        systemNotice: {
          email: false,
          browser: true
        },
        marketing: {
          email: false,
          browser: false
        },
        quietHours: {
          enabled: false,
          startTime: '22:00',
          endTime: '08:00'
        }
      }
    };
  };

  return { updateNotificationSettings, getNotificationSettings };
};

export default function NotificationSettings() {
  const { user } = useAuth();
  const { updateNotificationSettings, getNotificationSettings } = useNotificationAPI();

  // 알림 설정 상태
  const [settings, setSettings] = useState({
    templateApproval: {
      email: true,
      browser: true
    },
    templateRejection: {
      email: true,
      browser: false
    },
    systemNotice: {
      email: false,
      browser: true
    },
    marketing: {
      email: false,
      browser: false
    },
    quietHours: {
      enabled: false,
      startTime: '22:00',
      endTime: '08:00'
    }
  });

  // UI 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 컴포넌트 마운트 시 설정 로드
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const result = await getNotificationSettings();
      if (result.success) {
        setSettings(result.data);
      }
    } catch (error) {
      console.error('알림 설정 로드 오류:', error);
      setMessage({ type: 'error', text: '알림 설정을 불러오는 중 오류가 발생했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  // 알림 설정 토글
  const handleToggle = async (category, type) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [type]: !settings[category][type]
      }
    };

    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  // 조용한 시간 토글
  const handleQuietHoursToggle = async () => {
    const newSettings = {
      ...settings,
      quietHours: {
        ...settings.quietHours,
        enabled: !settings.quietHours.enabled
      }
    };

    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  // 조용한 시간 시간 변경
  const handleTimeChange = async (timeType, value) => {
    const newSettings = {
      ...settings,
      quietHours: {
        ...settings.quietHours,
        [timeType]: value
      }
    };

    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  // 설정 저장
  const saveSettings = async (newSettings) => {
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await updateNotificationSettings(newSettings);
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        // 3초 후 메시지 자동 제거
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: result.message || '설정 저장에 실패했습니다.' });
      }
    } catch (error) {
      console.error('알림 설정 저장 오류:', error);
      setMessage({ type: 'error', text: '설정 저장 중 오류가 발생했습니다.' });
    } finally {
      setIsSaving(false);
    }
  };

  // 알림 항목 정의
  const notificationTypes = [
    {
      id: 'templateApproval',
      title: '템플릿 승인 완료',
      description: '제출한 템플릿이 승인되었을 때 알림을 받습니다.',
      icon: CheckCircleIcon,
      iconColor: 'text-green-600'
    },
    {
      id: 'templateRejection',
      title: '템플릿 승인 거부',
      description: '제출한 템플릿이 거부되었을 때 알림을 받습니다.',
      icon: XCircleIcon,
      iconColor: 'text-red-600'
    },
    {
      id: 'systemNotice',
      title: '시스템 공지사항',
      description: '시스템 업데이트, 점검 등 중요한 공지사항 알림을 받습니다.',
      icon: BellIcon,
      iconColor: 'text-blue-600'
    },
    {
      id: 'marketing',
      title: '마케팅 정보',
      description: '새로운 기능, 이벤트, 프로모션 등의 마케팅 정보를 받습니다.',
      icon: MailIcon,
      iconColor: 'text-purple-600'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoaderIcon className="w-8 h-8 text-gray-400" />
        <span className="ml-3 text-gray-600">알림 설정을 불러오는 중...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">알림 설정</h2>
        <p className="text-sm text-gray-600 mt-1">
          이메일과 브라우저 알림을 관리하고 원하는 시간에만 알림을 받을 수 있습니다.
        </p>
      </div>

      {/* 메시지 표시 */}
      {message.text && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <div className="flex items-center">
            {isSaving && <LoaderIcon className="w-4 h-4 mr-2" />}
            {message.text}
          </div>
        </div>
      )}

      {/* 알림 유형별 설정 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">알림 유형</h3>

        <div className="space-y-6">
          {notificationTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.id} className="flex items-start justify-between py-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg bg-gray-50 ${type.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{type.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 ml-4">
                  {/* 이메일 알림 */}
                  <div className="flex items-center space-x-3">
                    <MailIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700 min-w-[40px]">이메일</span>
                    <ToggleSwitch
                      id={`${type.id}-email`}
                      enabled={settings[type.id]?.email || false}
                      onToggle={() => handleToggle(type.id, 'email')}
                      disabled={isSaving}
                    />
                  </div>

                  {/* 브라우저 알림 */}
                  <div className="flex items-center space-x-3">
                    <BellIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700 min-w-[50px]">브라우저</span>
                    <ToggleSwitch
                      id={`${type.id}-browser`}
                      enabled={settings[type.id]?.browser || false}
                      onToggle={() => handleToggle(type.id, 'browser')}
                      disabled={isSaving}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 조용한 시간 설정 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">조용한 시간</h3>
            <p className="text-sm text-gray-600 mt-1">
              지정한 시간 동안은 알림을 받지 않습니다. (이메일 알림은 계속 전송됩니다)
            </p>
          </div>
          <ToggleSwitch
            id="quiet-hours"
            enabled={settings.quietHours?.enabled || false}
            onToggle={handleQuietHoursToggle}
            disabled={isSaving}
          />
        </div>

        {settings.quietHours?.enabled && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-2">
                  시작 시간
                </label>
                <input
                  type="time"
                  id="start-time"
                  value={settings.quietHours?.startTime || '22:00'}
                  onChange={(e) => handleTimeChange('startTime', e.target.value)}
                  disabled={isSaving}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-2">
                  종료 시간
                </label>
                <input
                  type="time"
                  id="end-time"
                  value={settings.quietHours?.endTime || '08:00'}
                  onChange={(e) => handleTimeChange('endTime', e.target.value)}
                  disabled={isSaving}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              예: 오후 10시부터 오전 8시까지 브라우저 알림을 받지 않습니다.
            </p>
          </div>
        )}
      </div>

      {/* 브라우저 알림 권한 안내 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <BellIcon className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">브라우저 알림 권한</h4>
            <p className="text-sm text-blue-700 mt-1">
              브라우저 알림을 받으려면 브라우저에서 알림 권한을 허용해야 합니다.
              브라우저 설정에서 이 사이트의 알림을 허용으로 설정해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}