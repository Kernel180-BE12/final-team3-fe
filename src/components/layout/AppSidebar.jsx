import React, { useState, useEffect, useRef } from "react";
import HelpModal from "@/components/help/HelpModal";
import ChatHistoryPanel from "@/components/chat/ChatHistoryPanel";

// =========================================
// 모든 아이콘 컴포넌트들 (파일 상단에 통합)
// =========================================

const PlusCircleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
);

const LayoutGridIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="7" height="7" x="3" y="3" rx="1"></rect>
    <rect width="7" height="7" x="14" y="3" rx="1"></rect>
    <rect width="7" height="7" x="14" y="14" rx="1"></rect>
    <rect width="7" height="7" x="3" y="14" rx="1"></rect>
  </svg>
);

const UserCircleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="10" r="3"></circle>
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
  </svg>
);

const HomeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const MessageSquareIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const ArchiveIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="5" x="2" y="3" rx="1"></rect>
    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"></path>
    <path d="M10 12h4"></path>
  </svg>
);

const SparklesIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3z" />
    <path d="M3 12L4.5 9.5L7 8L4.5 6.5L3 4" />
    <path d="M17 20L19.5 18.5L21 16L19.5 13.5L17 12" />
  </svg>
);

const SlidersHorizontalIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="21" x2="14" y1="4" y2="4"></line>
    <line x1="10" x2="3" y1="4" y2="4"></line>
    <line x1="21" x2="12" y1="12" y2="12"></line>
    <line x1="8" x2="3" y1="12" y2="12"></line>
    <line x1="21" x2="16" y1="20" y2="20"></line>
    <line x1="12" x2="3" y1="20" y2="20"></line>
    <line x1="14" x2="14" y1="2" y2="6"></line>
    <line x1="8" x2="8" y1="10" y2="14"></line>
    <line x1="16" x2="16" y1="18" y2="22"></line>
  </svg>
);

const SettingsIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
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

const LifeBuoyIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="4"></circle>
    <line x1="4.93" x2="9.17" y1="4.93" y2="9.17"></line>
    <line x1="14.83" x2="19.07" y1="14.83" y2="19.07"></line>
    <line x1="14.83" x2="19.07" y1="9.17" y2="4.93"></line>
    <line x1="4.93" x2="9.17" y1="19.07" y2="14.83"></line>
  </svg>
);

const LogOutIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" x2="9" y1="12" y2="12"></line>
  </svg>
);

const ListIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="8" x2="21" y1="6" y2="6"></line>
    <line x1="8" x2="21" y1="12" y2="12"></line>
    <line x1="8" x2="21" y1="18" y2="18"></line>
    <line x1="3" x2="3.01" y1="6" y2="6"></line>
    <line x1="3" x2="3.01" y1="12" y2="12"></line>
    <line x1="3" x2="3.01" y1="18" y2="18"></line>
  </svg>
);

// =========================================
// 기본 메뉴 설정값들
// =========================================

const DEFAULT_TOP_MENU = [
  {
    id: "create",
    icon: PlusCircleIcon,
    tooltip: "새 템플릿 생성",
    href: "/create",
    className:
      "p-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors",
  },
  {
    id: "chat-history",
    icon: MessageSquareIcon,
    tooltip: "채팅 기록",
    type: "chat-history", // 특별한 타입 지정
    className: "p-3 rounded-lg hover:bg-gray-700 transition-colors",
    iconClassName: "w-6 h-6 text-gray-400",
  },
];

const DEFAULT_MIDDLE_MENU = [
  {
    id: "dashboard",
    icon: HomeIcon,
    tooltip: "대시보드",
    href: "/dashboard",
    className: "p-3 rounded-lg hover:bg-gray-700 transition-colors",
    iconClassName: "w-6 h-6 text-gray-400",
  },
  {
    id: "templates-list",
    icon: ListIcon,
    tooltip: "템플릿 목록",
    href: "/templates",
    className: "p-3 rounded-lg hover:bg-gray-700 transition-colors",
    iconClassName: "w-6 h-6 text-gray-400",
  },
  {
    id: "archive",
    icon: ArchiveIcon,
    tooltip: "저장된 항목",
    onClick: null, // 비활성 상태
    className: "p-3 rounded-lg hover:bg-gray-700 transition-colors",
    iconClassName: "w-6 h-6 text-gray-400",
  },
];

const DEFAULT_USER_MENU = [
  {
    id: "upgrade",
    icon: SparklesIcon,
    label: "플랜 업그레이드",
    href: "/pricing",
  },
  {
    id: "customization",
    icon: SlidersHorizontalIcon,
    label: "템플릿 맞춤 설정",
    href: "/customization",
  },
  {
    id: "settings",
    icon: SettingsIcon,
    label: "설정",
    href: "/settings",
  },
];

// =========================================
// AppSidebar 메인 컴포넌트
// =========================================

export default function AppSidebar({
  user,
  onLogout,
  onNavigate,
  onSelectChat,
  topMenuItems = DEFAULT_TOP_MENU,
  middleMenuItems = DEFAULT_MIDDLE_MENU,
  userMenuItems = DEFAULT_USER_MENU,
  showHelpModal = true,
  className = "",
}) {
  // 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isChatHistoryVisible, setIsChatHistoryVisible] = useState(false);
  const menuRef = useRef(null);
  const chatHistoryRef = useRef(null);
  const chatHistoryTimeoutRef = useRef(null);

  // 드롭다운 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (
        chatHistoryRef.current &&
        !chatHistoryRef.current.contains(event.target)
      ) {
        setIsChatHistoryVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, chatHistoryRef]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (chatHistoryTimeoutRef.current) {
        clearTimeout(chatHistoryTimeoutRef.current);
      }
    };
  }, []);

  // 네비게이션 핸들러
  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  // 도움말 모달 핸들러
  const handleHelpClick = () => {
    setIsHelpModalOpen(true);
    setIsMenuOpen(false);
  };

  // 채팅 기록 패널 핸들러 (딜레이 메커니즘 포함)
  const handleChatHistoryHover = (isHovering) => {
    // 기존 타이머가 있다면 취소
    if (chatHistoryTimeoutRef.current) {
      clearTimeout(chatHistoryTimeoutRef.current);
      chatHistoryTimeoutRef.current = null;
    }

    if (isHovering) {
      // 즉시 표시 (딜레이 없음)
      setIsChatHistoryVisible(true);
    } else {
      // 300ms 딜레이 후 숨김
      chatHistoryTimeoutRef.current = setTimeout(() => {
        setIsChatHistoryVisible(false);
        chatHistoryTimeoutRef.current = null;
      }, 300);
    }
  };

  // 채팅 선택 핸들러
  const handleSelectChat = (chatSession) => {
    setIsChatHistoryVisible(false);
    if (onSelectChat) {
      onSelectChat(chatSession);
    }
  };

  // 채팅 삭제 핸들러
  const handleDeleteChat = (sessionId) => {
    // 패널에서 삭제 후 추가 작업이 필요하면 여기에 구현
    console.log(`채팅 세션 삭제됨: ${sessionId}`);
  };

  // 메뉴 아이템 렌더링 함수
  const renderMenuItems = (items) => {
    return items.map((item) => (
      <div key={item.id} className="relative group flex justify-center">
        {item.type === "chat-history-no-open" ? (
          // 채팅 기록 버튼 (호버 기능 포함)
          <div
            ref={chatHistoryRef}
            onMouseEnter={() => handleChatHistoryHover(true)}
            onMouseLeave={() => handleChatHistoryHover(false)}
            className="relative"
          >
            <button className={item.className}>
              <item.icon className={item.iconClassName || "w-6 h-6"} />
            </button>

            {/* 채팅 기록 패널 */}
            <ChatHistoryPanel
              isVisible={isChatHistoryVisible}
              onSelectChat={handleSelectChat}
              onDeleteChat={handleDeleteChat}
            />
          </div>
        ) : item.href ? (
          <a href={item.href} className={item.className}>
            <item.icon className={item.iconClassName || "w-6 h-6"} />
          </a>
        ) : (
          <button onClick={item.onClick} className={item.className}>
            <item.icon className={item.iconClassName || "w-6 h-6"} />
          </button>
        )}

        {/* 툴팁 */}
        <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-40">
          {item.tooltip}
        </div>
      </div>
    ));
  };

  return (
    <div
      className={`w-16 bg-gray-800 text-white flex flex-col items-center z-20 ${className}`}
    >
      {/* 상단 메뉴 */}
      <nav className="flex flex-col space-y-2 py-4">
        {renderMenuItems(topMenuItems)}
      </nav>

      {/* 중간 메뉴 */}
      <nav className="flex flex-col space-y-2 py-4 border-t border-gray-700">
        {renderMenuItems(middleMenuItems)}
      </nav>

      {/* 하단 사용자 메뉴 - mt-auto로 하단에 배치 */}
      <div ref={menuRef} className="relative mt-auto mb-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          <UserCircleIcon className="w-8 h-8 text-gray-400" />
        </button>

        {/* 메뉴 팝업 UI */}
        {isMenuOpen && (
          <div className="absolute bottom-full left-0 mb-2 w-56 bg-gray-900 text-gray-200 rounded-lg shadow-lg">
            {/* 사용자 정보 */}
            <div className="p-2">
              <div className="flex items-center w-full px-3 py-2 text-sm">
                <UserCircleIcon className="w-5 h-5 mr-3" />
                <span>{user?.email || "user@example.com"}</span>
              </div>
            </div>

            <div className="border-t border-gray-700 my-1"></div>

            {/* 사용자 메뉴 항목들 */}
            <div className="p-2">
              {userMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.href) {
                      handleNavigation(item.href);
                    } else if (item.onClick) {
                      item.onClick();
                    }
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700 text-left"
                >
                  <item.icon className="mr-3" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-700 my-1"></div>

            {/* 도움말 및 로그아웃 */}
            <div className="p-2">
              {showHelpModal && (
                <button
                  onClick={handleHelpClick}
                  className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700"
                >
                  <LifeBuoyIcon className="mr-3" />
                  <span>도움말</span>
                </button>
              )}
              <button
                onClick={() => {
                  onLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700"
              >
                <LogOutIcon className="mr-3 text-red-500" />
                <span className="text-red-500">로그아웃</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 도움말 모달 */}
      {showHelpModal && (
        <HelpModal
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
        />
      )}
    </div>
  );
}
