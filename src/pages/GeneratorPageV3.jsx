import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { templateApi, logout as apiLogout } from "../utils/api";
import { useAuth } from "../hooks/useAuth";

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
