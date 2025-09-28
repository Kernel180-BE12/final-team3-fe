import React from 'react';

// 아이콘 컴포넌트들
const InfoIcon = (props) => (
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
    <path d="M12 16v-4"></path>
    <path d="M12 8h.01"></path>
  </svg>
);

const FileTextIcon = (props) => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14,2 14,8 20,8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10,9 9,9 8,9"></polyline>
  </svg>
);

const ImageIcon = (props) => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="9" cy="9" r="2"></circle>
    <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
  </svg>
);

const CheckIcon = (props) => (
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
    <polyline points="20,6 9,17 4,12"></polyline>
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

const XIcon = (props) => (
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
    <path d="M18 6L6 18"></path>
    <path d="M6 6l12 12"></path>
  </svg>
);

const LayoutIcon = (props) => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="9" y1="3" x2="9" y2="21"></line>
  </svg>
);

const tabs = [
  {
    id: 'infotalk',
    title: '인포톡 안내',
    description: '인포톡 서비스 기본 안내',
    icon: InfoIcon,
  },
  {
    id: 'content-guide',
    title: '콘텐츠 가이드',
    description: '메시지 작성 가이드',
    icon: FileTextIcon,
  },
  {
    id: 'image-guide',
    title: '이미지 가이드',
    description: '이미지 사용 가이드',
    icon: ImageIcon,
  },
  {
    id: 'audit',
    title: '심사 안내',
    description: '템플릿 심사 프로세스',
    icon: CheckIcon,
  },
  {
    id: 'whitelist',
    title: '화이트리스트',
    description: '승인 기준 안내',
    icon: ShieldIcon,
  },
  {
    id: 'blacklist',
    title: '블랙리스트',
    description: '거부 기준 안내',
    icon: XIcon,
  },
  {
    id: 'public-template',
    title: '공용 템플릿',
    description: '공용 템플릿 사용법',
    icon: LayoutIcon,
  },
];

export default function HelpTabs({ activeTab, onTabChange }) {
  return (
    <div className="p-4">
      <nav className="space-y-2">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-start space-x-3">
                <IconComponent
                  className={`mt-0.5 flex-shrink-0 ${
                    isActive ? 'text-indigo-600' : 'text-gray-400'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-medium ${
                      isActive ? 'text-indigo-900' : 'text-gray-900'
                    }`}
                  >
                    {tab.title}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      isActive ? 'text-indigo-600' : 'text-gray-500'
                    }`}
                  >
                    {tab.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}