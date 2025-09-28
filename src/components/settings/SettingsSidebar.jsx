import React from "react";

// 설정 섹션 아이콘들
const UserIcon = (props) => (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ShieldIcon = (props) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

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

const SettingsIcon = (props) => (
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
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

// 설정 섹션 정의
const settingsSections = [
  {
    id: "profile",
    title: "프로필",
    description: "개인 정보 및 프로필 관리",
    icon: UserIcon,
  },
  {
    id: "security",
    title: "보안",
    description: "비밀번호 및 보안 설정",
    icon: ShieldIcon,
  },
  {
    id: "notifications",
    title: "알림",
    description: "알림 및 이메일 설정",
    icon: BellIcon,
  },
  {
    id: "account",
    title: "계정 관리",
    description: "계정 설정 및 데이터 관리",
    icon: SettingsIcon,
  },
];

export default function SettingsSidebar({ currentSection, onSectionChange }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-4">설정 메뉴</h3>
        <nav className="space-y-1">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            const isActive = currentSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-start p-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`flex-shrink-0 mt-0.5 ${
                    isActive ? "text-indigo-600" : "text-gray-400"
                  }`}
                />
                <div className="ml-3 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      isActive ? "text-indigo-700" : "text-gray-900"
                    }`}
                  >
                    {section.title}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      isActive ? "text-indigo-600" : "text-gray-500"
                    }`}
                  >
                    {section.description}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}