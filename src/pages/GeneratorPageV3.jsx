import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { templateApi, logout as apiLogout } from "../utils/api";
import { useAuth } from "../hooks/useAuth";
import { chatHistoryStorage } from "../utils/chatHistoryStorage";

// 새로운 컴포넌트들 import
import MainChatLayout from "@/components/generator/MainChatLayout";
import ThreePanelLayout from "@/components/generator/ThreePanelLayout";
import AppSidebar from "@/components/layout/AppSidebar";


// 메인 GeneratorPageV3 컴포넌트 (테스트용)
export default function GeneratorPageV3() {
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

  // 채팅 세션 관리
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const chatSaveTimeoutRef = useRef(null);

  // 채팅 세션 저장 (디바운스 적용) - 먼저 정의
  const saveChatSession = useCallback((messageList, sessionId = null) => {
    if (!messageList || messageList.length === 0) return;

    // 기존 타이머 제거
    if (chatSaveTimeoutRef.current) {
      clearTimeout(chatSaveTimeoutRef.current);
    }

    // 3초 후 저장 (사용자 입력이 완료된 후)
    chatSaveTimeoutRef.current = setTimeout(() => {
      try {
        const chatSession = {
          id: sessionId || currentSessionId || `chat_${Date.now()}`,
          messages: messageList.map(msg => ({
            id: msg.id || `msg_${Date.now()}_${Math.random()}`,
            type: msg.type,
            content: msg.content,
            timestamp: msg.timestamp || new Date().toISOString()
          })),
          createdAt: sessionId ? undefined : new Date().toISOString() // 새 세션만 생성일 설정
        };

        const savedSessionId = chatHistoryStorage.save(chatSession);
        if (savedSessionId && !currentSessionId) {
          setCurrentSessionId(savedSessionId);
        }
      } catch (error) {
        console.error('채팅 세션 저장 실패:', error);
      }
    }, 3000);
  }, [currentSessionId]);

  // 템플릿이 생성되면 3패널 모드로 전환
  useEffect(() => {
    if (selectedVersion && !hasGeneratedTemplate) {
      setLayoutMode("template");
      setHasGeneratedTemplate(true);
    }
  }, [selectedVersion, hasGeneratedTemplate]);

  // 메시지 변경 시 자동 저장
  useEffect(() => {
    if (messages.length > 0) {
      saveChatSession(messages, currentSessionId);
    }
  }, [messages, saveChatSession, currentSessionId]);

  // 페이지 언로드 시 채팅 저장
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (messages.length > 0) {
        // 즉시 저장 (비동기 작업 불가)
        if (chatSaveTimeoutRef.current) {
          clearTimeout(chatSaveTimeoutRef.current);
        }
        chatHistoryStorage.save({
          id: currentSessionId || `chat_${Date.now()}`,
          messages: messages.map(msg => ({
            id: msg.id || `msg_${Date.now()}_${Math.random()}`,
            type: msg.type,
            content: msg.content,
            timestamp: msg.timestamp || new Date().toISOString()
          }))
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // 컴포넌트 언마운트 시에도 저장
      if (messages.length > 0) {
        handleBeforeUnload();
      }
    };
  }, [messages, currentSessionId]);

  // 새 채팅 시작
  const startNewChat = useCallback(() => {
    // 현재 채팅이 있다면 저장
    if (messages.length > 0 && currentSessionId) {
      // 즉시 저장 (타이머 취소하고)
      if (chatSaveTimeoutRef.current) {
        clearTimeout(chatSaveTimeoutRef.current);
      }
      chatHistoryStorage.save({
        id: currentSessionId,
        messages: messages.map(msg => ({
          id: msg.id || `msg_${Date.now()}_${Math.random()}`,
          type: msg.type,
          content: msg.content,
          timestamp: msg.timestamp || new Date().toISOString()
        }))
      });
    }

    // 상태 초기화
    setMessages([]);
    setSelectedVersion(null);
    setLayoutMode("chat");
    setHasGeneratedTemplate(false);
    setCurrentSessionId(null);
    setShowVariables(false);
  }, [messages, currentSessionId]);

  // 기존 채팅 불러오기
  const loadChatSession = useCallback((chatSession) => {
    try {
      // 현재 채팅 저장
      if (messages.length > 0 && currentSessionId) {
        chatHistoryStorage.save({
          id: currentSessionId,
          messages: messages
        });
      }

      // 선택된 채팅 로드
      setMessages(chatSession.messages || []);
      setCurrentSessionId(chatSession.id);

      // 채팅에 템플릿이 있으면 템플릿 모드로
      const hasTemplate = chatSession.messages?.some(msg =>
        msg.type === 'assistant' && msg.content?.includes &&
        (msg.content.includes('템플릿') || msg.content.includes('알림톡'))
      );

      if (hasTemplate) {
        setLayoutMode("template");
        setHasGeneratedTemplate(true);
      } else {
        setLayoutMode("chat");
        setHasGeneratedTemplate(false);
      }

      // 템플릿 생성 페이지로 이동
      navigate('/create');
    } catch (error) {
      console.error('채팅 세션 로드 실패:', error);
      alert('채팅 기록을 불러오는데 실패했습니다.');
    }
  }, [messages, currentSessionId, navigate]);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    // 로그아웃 전 현재 채팅 저장
    if (messages.length > 0) {
      saveChatSession(messages, currentSessionId);
    }

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
    setApprovingTemplates((prev) => new Set(prev).add(templateId));

    try {
      const response = await templateApi.approveTemplate(templateId);

      if (response?.data?.status === "APPROVE_REQUESTED") {
        // 승인 완료 상태로 변경
        setApprovedTemplates((prev) => new Set(prev).add(templateId));
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
      setApprovingTemplates((prev) => {
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
        const errorMessage =
          response.error?.message ||
          `서버 오류가 발생했습니다. (상태코드: ${response.status})`;

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
        const errorMessage =
          response.error.message || "알 수 없는 오류가 발생했습니다.";

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
      <AppSidebar
        user={user}
        onLogout={handleLogout}
        onNavigate={navigate}
        onSelectChat={loadChatSession}
        showHelpModal={true}
      />

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
