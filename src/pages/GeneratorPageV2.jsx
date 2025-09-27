import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { templateApi, logout as apiLogout } from "../utils/api";
import { useAuth } from "../hooks/useAuth";

// 새로운 컴포넌트들 import
import MainChatLayout from "@/components/generator/MainChatLayout";
import ThreePanelLayout from "@/components/generator/ThreePanelLayout";

// 기존 사이드바 컴포넌트들 (재사용)
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

// 추가 아이콘들 (드롭다운 메뉴용)
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

// 사이드바 컴포넌트 (기존 GeneratorPage와 동일)
const Sidebar = ({ onLogout, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="w-16 bg-gray-800 text-white flex flex-col items-center z-20">
      {/* 상단 메뉴 */}
      <nav className="flex flex-col space-y-2 py-4">
        <div className="relative group flex justify-center">
          <button className="p-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors">
            <PlusCircleIcon className="w-6 h-6" />
          </button>
          <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            새 템플릿 생성
          </div>
        </div>
        <div className="relative group flex justify-center">
          <button className="p-3 rounded-lg hover:bg-gray-700 transition-colors">
            <LayoutGridIcon className="w-6 h-6 text-gray-400" />
          </button>
          <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            템플릿 보관함
          </div>
        </div>
      </nav>

      {/* 중간 메뉴 */}
      <nav className="flex flex-col space-y-2 py-4 border-t border-gray-700">
        <div className="relative group flex justify-center">
          <a
            href="/dashboard"
            className="p-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <HomeIcon className="w-6 h-6 text-gray-400" />
          </a>
          <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            대시보드
          </div>
        </div>
        <div className="relative group flex justify-center">
          <a
            href="/templates"
            className="p-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <MessageSquareIcon className="w-6 h-6 text-gray-400" />
          </a>
          <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            템플릿 목록
          </div>
        </div>
        <div className="relative group flex justify-center">
          <button className="p-3 rounded-lg hover:bg-gray-700 transition-colors">
            <ArchiveIcon className="w-6 h-6 text-gray-400" />
          </button>
          <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            저장된 항목
          </div>
        </div>
      </nav>

      {/* 하단 사용자 메뉴 - mt-auto로 하단에 배치 */}
      <div ref={menuRef} className="relative mt-auto mb-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          <UserCircleIcon className="w-8 h-8 text-gray-400" />
        </button>
        {/* 메뉴 팝업 UI 및 위치 */}
        {isMenuOpen && (
          <div className="absolute bottom-full left-0 mb-2 w-56 bg-gray-900 text-gray-200 rounded-lg shadow-lg">
            <div className="p-2">
              <div className="flex items-center w-full px-3 py-2 text-sm">
                <UserCircleIcon className="w-5 h-5 mr-3" />
                <span>{user?.email || "user@example.com"}</span>
              </div>
            </div>
            <div className="border-t border-gray-700 my-1"></div>
            <div className="p-2">
              <a
                href="#"
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700"
              >
                <SparklesIcon className="mr-3" /> <span>플랜 업그레이드</span>
              </a>
              <a
                href="#"
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700"
              >
                <SlidersHorizontalIcon className="mr-3" />{" "}
                <span>템플릿 맞춤 설정</span>
              </a>
              <a
                href="#"
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700"
              >
                <SettingsIcon className="mr-3" /> <span>설정</span>
              </a>
            </div>
            <div className="border-t border-gray-700 my-1"></div>
            <div className="p-2">
              <a
                href="#"
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700"
              >
                <LifeBuoyIcon className="mr-3" /> <span>도움말</span>
              </a>
              <a
                href="#"
                onClick={onLogout}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700"
              >
                <LogOutIcon className="mr-3 text-red-500" />{" "}
                <span className="text-red-500">로그아웃</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 메인 GeneratorPageV2 컴포넌트
export default function GeneratorPageV2() {
  const [messages, setMessages] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVariables, setShowVariables] = useState(false);
  const [layoutMode, setLayoutMode] = useState("chat"); // 'chat' | 'template'
  const [hasGeneratedTemplate, setHasGeneratedTemplate] = useState(false);

  // 승인 상태 관리
  const [approvedTemplates, setApprovedTemplates] = useState(new Set());
  const [approvingTemplates, setApprovingTemplates] = useState(new Set());

  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // 템플릿이 생성되면 3패널 모드로 전환
  useEffect(() => {
    if (selectedVersion && !hasGeneratedTemplate) {
      setLayoutMode("template");
      setHasGeneratedTemplate(true);
    }
  }, [selectedVersion, hasGeneratedTemplate]);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error("백엔드 로그아웃 실패:", error);
    }

    logout();
    navigate("/login");
  };

  // 승인 상태 확인 함수들
  const isApproving = selectedVersion?.templateId
    ? approvingTemplates.has(selectedVersion.templateId)
    : false;
  const isApproved = selectedVersion?.templateId
    ? approvedTemplates.has(selectedVersion.templateId)
    : false;

  // 템플릿 승인 요청 핸들러
  const handleApproveTemplate = async () => {
    const templateId = selectedVersion?.templateId;

    if (!templateId) {
      alert("승인할 템플릿을 선택해주세요.");
      return;
    }

    // 이미 승인 중이거나 완료된 경우 중복 실행 방지
    if (isApproving || isApproved) {
      return;
    }

    // 승인 시작 - 승인 중 상태로 변경
    setApprovingTemplates(prev => new Set(prev).add(templateId));

    try {
      const response = await templateApi.approveTemplate(templateId);

      if (response?.data?.status === "APPROVE_REQUESTED") {
        // 승인 완료 상태로 변경
        setApprovedTemplates(prev => new Set(prev).add(templateId));
        // alert 대신 버튼 상태로 피드백 제공 (UI에서 처리)
      } else {
        console.error("템플릿 승인 요청 실패:", response);
        const errorMessage =
          response?.error?.message || "알 수 없는 오류가 발생했습니다.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("템플릿 승인 요청 실패:", error);
      alert("템플릿 승인 요청 중 오류가 발생했습니다.");
    } finally {
      // 승인 중 상태 해제 (성공하면 승인 완료 상태가 유지됨)
      setApprovingTemplates(prev => {
        const newSet = new Set(prev);
        newSet.delete(templateId);
        return newSet;
      });
    }
  };

  // AI 생성 요청 핸들러
  const handleGenerate = async (prompt) => {
    setIsLoading(true);
    const userMessage = { id: Date.now(), type: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await templateApi.generateTemplate(prompt);

      // HTTP 상태 코드가 200이 아닌 경우 에러 처리
      if (response && response.status && response.status !== 200) {
        const errorMessage = response.error?.message || `서버 오류가 발생했습니다. (상태코드: ${response.status})`;

        const botErrorMessage = {
          id: Date.now() + 1,
          type: "error",
          text: errorMessage,
        };
        setMessages((prev) => [...prev, botErrorMessage]);
        return;
      }

      // 응답에 error 필드가 있는 경우 (상태코드와 별도로 에러 정보가 포함된 경우)
      if (response && response.error) {
        const errorMessage = response.error.message || "알 수 없는 오류가 발생했습니다.";

        const botErrorMessage = {
          id: Date.now() + 1,
          type: "error",
          text: errorMessage,
        };
        setMessages((prev) => [...prev, botErrorMessage]);
        return;
      }

      if (response && response.data) {
        const templateData = response.data;

        const newVersionData = {
          templateId: templateData.id || `TPL_${Date.now()}`,
          title: templateData.title || "생성된 템플릿",
          content: templateData.content || "",
          buttons: templateData.buttons || [],
          variables: templateData.variables || [],
        };

        const botMessage = {
          id: Date.now() + 1,
          type: "version",
          text: `'${prompt}' 요청에 대한 템플릿이 생성되었습니다. 총 ${newVersionData.variables.length}개의 변수가 적용되었습니다.`,
          versionData: newVersionData,
        };
        setMessages((prev) => [...prev, botMessage]);
        setSelectedVersion(newVersionData);
      }
    } catch (error) {
      console.error("템플릿 생성 실패:", error);
      const errorMessage = {
        id: Date.now() + 1,
        type: "error",
        text: "템플릿 생성 중 오류가 발생했습니다. 네트워크 연결을 확인하고 다시 시도해주세요.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 메시지 설정
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: "bot",
        text: "템플릿 생성을 위해 추가 정보가 필요합니다. 구체적인 목적, 대상 고객, 포함할 정보를 작성하시고, 마지막에 '템플릿 생성' 문구를 함께 입력해 주세요.",
      },
    ]);
  }, []);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <Sidebar onLogout={handleLogout} user={user} />

      {layoutMode === "chat" ? (
        // 2패널 레이아웃: 사이드 + 메인 채팅
        <MainChatLayout
          messages={messages}
          onGenerate={handleGenerate}
          onSelectVersion={setSelectedVersion}
          isLoading={isLoading}
        />
      ) : (
        // 3패널 레이아웃: 사이드 + 채팅 + 미리보기
        <ThreePanelLayout
          messages={messages}
          onGenerate={handleGenerate}
          onSelectVersion={setSelectedVersion}
          isLoading={isLoading}
          selectedVersion={selectedVersion}
          showVariables={showVariables}
          onToggleVariables={() => setShowVariables(!showVariables)}
          onApproveTemplate={handleApproveTemplate}
          isApproving={isApproving}
          isApproved={isApproved}
        />
      )}
    </div>
  );
}
