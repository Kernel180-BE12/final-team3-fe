# 템플릿 생성 페이지 디자인 개선 계획서

## 📋 개요

**목적**: GeneratorPage.jsx의 사용자 경험을 Claude.ai/new와 유사한 적응형 레이아웃으로 개선
**작성일**: 2025-09-27
**대상 파일**: `src/pages/GeneratorPage.jsx`

## 🎯 현재 상황 분석

### 기존 구조
```
┌─────────┬─────────────────┬─────────────────┐
│ 사이드  │   채팅 패널     │  미리보기 패널  │
│ 패널    │   (600px)       │   (flex-1)      │
│ (64px)  │                 │                 │
└─────────┴─────────────────┴─────────────────┘
```

### 문제점
1. **빈 화면 문제**: 처음 진입 시 미리보기 패널이 비어있어 허전함
2. **공간 낭비**: 템플릿 생성 전까지 미리보기 패널이 불필요한 공간 차지
3. **집중도 저하**: 여러 패널이 동시에 보여 사용자 주의 분산
4. **모바일 대응**: 작은 화면에서 3패널 배치의 가독성 문제

## 🚀 개선 방안

### 목표 구조 - 2단계 레이아웃

#### 1단계: 초기 상태 (Claude.ai/new 스타일)
```
┌─────────┬─────────────────────────────────────┐
│ 사이드  │          메인 채팅 영역              │
│ 패널    │         (전체 공간 활용)             │
│ (64px)  │                                     │
│         │  ┌─────────────────────────────┐    │
│         │  │      환영 메시지 영역       │    │
│         │  │                             │    │
│         │  └─────────────────────────────┘    │
│         │                                     │
│         │  ┌─────────────────────────────┐    │
│         │  │      채팅 입력 영역         │    │
│         │  └─────────────────────────────┘    │
└─────────┴─────────────────────────────────────┘
```

#### 2단계: 템플릿 생성 후 (3패널 분할)
```
┌─────────┬─────────────────┬─────────────────┐
│ 사이드  │   채팅 패널     │  미리보기 패널  │
│ 패널    │   (600px)       │   (flex-1)      │
│ (64px)  │                 │                 │
└─────────┴─────────────────┴─────────────────┘
```

## 🔧 구현 계획

### 1단계: 상태 관리 로직 설계

#### A. 새로운 상태 변수 추가
```javascript
const [layoutMode, setLayoutMode] = useState('chat'); // 'chat' | 'template'
const [hasGeneratedTemplate, setHasGeneratedTemplate] = useState(false);
```

#### B. 레이아웃 모드 전환 조건
```javascript
// 템플릿이 생성되면 3패널 모드로 전환
useEffect(() => {
  if (selectedVersion && !hasGeneratedTemplate) {
    setLayoutMode('template');
    setHasGeneratedTemplate(true);
  }
}, [selectedVersion, hasGeneratedTemplate]);
```

### 2단계: 컴포넌트 구조 개선

#### A. 조건부 레이아웃 렌더링
```jsx
return (
  <div className="flex h-screen w-full bg-white overflow-hidden">
    <Sidebar onLogout={handleLogout} user={user} />

    {layoutMode === 'chat' ? (
      // 2패널 레이아웃: 사이드 + 메인 채팅
      <MainChatLayout
        messages={messages}
        onGenerate={handleGenerate}
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
      />
    )}
  </div>
);
```

#### B. MainChatLayout 컴포넌트 (새로 생성)
```jsx
const MainChatLayout = ({ messages, onGenerate, isLoading }) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* 상단 헤더 (선택사항) */}
      <header className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-900">
          AI 알림톡 템플릿 생성
        </h1>
      </header>

      {/* 메인 채팅 영역 */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {/* 환영 메시지 (첫 진입 시) */}
          {messages.length <= 1 && (
            <WelcomeSection />
          )}

          {/* 채팅 메시지들 */}
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {isLoading && <LoadingMessage />}
        </div>

        {/* 하단 입력 영역 */}
        <ChatInput onGenerate={onGenerate} isLoading={isLoading} />
      </div>
    </div>
  );
};
```

#### C. ThreePanelLayout 컴포넌트 (기존 구조 분리)
```jsx
const ThreePanelLayout = ({
  messages, onGenerate, onSelectVersion, isLoading,
  selectedVersion, showVariables, onToggleVariables, onApproveTemplate
}) => {
  return (
    <>
      <ChatPanel
        messages={messages}
        onGenerate={onGenerate}
        onSelectVersion={onSelectVersion}
        isLoading={isLoading}
      />
      <main className="flex-1 flex flex-col bg-gradient-to-br from-blue-100 via-teal-100 to-green-100">
        <header className="flex justify-end items-center p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">변수값 표시</span>
            <ToggleSwitch checked={showVariables} onChange={onToggleVariables} />
            <ApproveButton
              onClick={onApproveTemplate}
              disabled={!selectedVersion}
            />
          </div>
        </header>
        <Preview version={selectedVersion} showVariables={showVariables} />
      </main>
    </>
  );
};
```

### 3단계: 환영 섹션 컴포넌트

#### WelcomeSection 컴포넌트
```jsx
const WelcomeSection = () => {
  return (
    <div className="text-center py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SparklesIcon className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI 알림톡 템플릿 생성
          </h2>
          <p className="text-lg text-gray-600">
            원하는 내용을 설명해주시면 카카오톡 알림톡 템플릿을 자동으로 생성해드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ExampleCard
            icon="🛍️"
            title="쇼핑몰 주문 확인"
            description="고객님의 주문이 접수되었습니다"
          />
          <ExampleCard
            icon="📦"
            title="배송 알림"
            description="상품이 배송 중입니다"
          />
          <ExampleCard
            icon="🎉"
            title="이벤트 안내"
            description="특별 할인 혜택을 놓치지 마세요"
          />
        </div>

        <div className="text-sm text-gray-500">
          <p>💡 <strong>팁:</strong> 구체적인 목적, 대상 고객, 포함할 정보를 함께 작성하고</p>
          <p>마지막에 '템플릿 생성' 문구를 입력해주세요.</p>
        </div>
      </div>
    </div>
  );
};

const ExampleCard = ({ icon, title, description }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};
```

### 4단계: 전환 애니메이션

#### A. CSS 트랜지션 추가
```css
/* src/index.css에 추가 */
.layout-transition {
  transition: all 0.3s ease-in-out;
}

.panel-slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.chat-expand {
  animation: expandWidth 0.3s ease-out;
}

@keyframes expandWidth {
  from {
    width: 100%;
  }
  to {
    width: 600px;
  }
}
```

#### B. 애니메이션 적용
```jsx
const ThreePanelLayout = (props) => {
  return (
    <div className="flex-1 flex layout-transition">
      <div className="chat-expand">
        <ChatPanel {...props} />
      </div>
      <div className="panel-slide-in flex-1">
        <PreviewPanel {...props} />
      </div>
    </div>
  );
};
```

## 📱 반응형 디자인 고려사항

### 모바일 대응 (768px 이하)
```jsx
const isMobile = window.innerWidth < 768;

// 모바일에서는 탭 기반 인터페이스로 전환
{layoutMode === 'template' && isMobile ? (
  <MobileTabLayout />
) : (
  <DesktopLayout />
)}
```

### MobileTabLayout 컴포넌트
```jsx
const MobileTabLayout = ({ activeTab, setActiveTab, ...props }) => {
  return (
    <div className="flex-1 flex flex-col">
      <TabNavigation activeTab={activeTab} onChange={setActiveTab} />
      <div className="flex-1">
        {activeTab === 'chat' && <ChatPanel {...props} />}
        {activeTab === 'preview' && <PreviewPanel {...props} />}
      </div>
    </div>
  );
};
```

## 🎨 사용자 경험 개선사항

### 1. 진입 경험 개선
- **명확한 목적**: 처음 화면에서 무엇을 할 수 있는지 즉시 이해
- **예시 제공**: 생성 가능한 템플릿 유형을 시각적으로 안내
- **가이드 메시지**: 효과적인 프롬프트 작성법 안내

### 2. 전환 경험 개선
- **부드러운 애니메이션**: 2패널에서 3패널로의 자연스러운 전환
- **상태 유지**: 채팅 내용과 입력 중이던 텍스트 보존
- **시각적 피드백**: 템플릿 생성 성공 시 명확한 피드백

### 3. 일관성 유지
- **네비게이션**: 언제든 2패널 모드로 돌아갈 수 있는 옵션
- **브랜딩**: 기존 디자인 시스템과 일관된 색상/폰트 사용
- **접근성**: 키보드 네비게이션과 스크린 리더 지원

## 🔧 구현 우선순위

### 필수 (Must Have)
1. ✅ 기본 2패널 레이아웃 구현
2. ✅ 템플릿 생성 시 3패널 전환 로직
3. ✅ 환영 섹션과 예시 카드
4. ✅ 기본 반응형 디자인

### 권장 (Should Have)
5. 📱 전환 애니메이션 효과
6. 🎨 모바일 탭 인터페이스
7. 🔄 2패널 모드 복귀 기능

### 선택 (Could Have)
8. 💡 고급 가이드 툴팁
9. 📊 사용 통계 및 개선 제안
10. 🎯 개인화된 템플릿 추천

## 📝 구현 체크리스트

### 컴포넌트 분리
- [ ] `components/MainChatLayout.jsx` - 2패널 메인 레이아웃
- [ ] `components/ThreePanelLayout.jsx` - 3패널 레이아웃
- [ ] `components/WelcomeSection.jsx` - 환영 섹션
- [ ] `components/ExampleCard.jsx` - 예시 카드
- [ ] `components/ChatInput.jsx` - 채팅 입력 (기존에서 분리)
- [ ] `components/MobileTabLayout.jsx` - 모바일 탭 레이아웃

### 상태 관리
- [ ] `layoutMode` 상태 추가 및 전환 로직
- [ ] `hasGeneratedTemplate` 플래그 관리
- [ ] 반응형 브레이크포인트 감지

### 스타일링
- [ ] 전환 애니메이션 CSS 추가
- [ ] 환영 섹션 스타일링
- [ ] 모바일 최적화 스타일
- [ ] 접근성 개선 (ARIA, 포커스 관리)

### 테스트
- [ ] 데스크톱 환경 테스트
- [ ] 모바일 환경 테스트
- [ ] 브라우저 호환성 확인
- [ ] 접근성 검증

## 🎯 기대 효과

### 사용성 개선
1. **직관적 진입**: Claude.ai와 유사한 친숙한 인터페이스
2. **집중도 향상**: 초기에는 채팅에만 집중, 필요시 미리보기 표시
3. **공간 활용**: 화면 공간의 효율적 사용

### 사용자 만족도
1. **첫인상 개선**: 전문적이고 모던한 첫 화면
2. **학습 곡선 감소**: 즉시 사용법을 이해할 수 있는 UI
3. **성취감**: 템플릿 생성 시 자연스러운 화면 확장

### 비즈니스 가치
1. **사용률 증가**: 더 나은 UX로 인한 사용자 재방문
2. **완료율 향상**: 명확한 가이드로 템플릿 생성 성공률 상승
3. **브랜드 이미지**: 모던하고 사용자 친화적인 서비스 이미지

## 📋 향후 확장 가능성

### 단계별 기능 추가
1. **템플릿 히스토리**: 이전에 생성한 템플릿 빠른 접근
2. **실시간 협업**: 팀원과 템플릿 공동 편집
3. **AI 학습**: 사용자 패턴 학습으로 개인화 추천
4. **통합 워크플로우**: 승인부터 발송까지 전체 프로세스 통합

---

**작성자**: Claude Code
**검토 필요**: UI/UX 디자이너, 프론트엔드 개발자
**예상 구현 시간**: 2-3일 (기본 기능), 4-5일 (모든 기능)
**시현 준비**: 우선순위 1-4번 항목만으로도 충분한 개선 효과