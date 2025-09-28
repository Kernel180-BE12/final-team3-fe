# 채팅 기록 기능 설계 및 구현 방안 문서

## 🎯 현재 상황 및 요구사항

### 📋 현재 상황
- AppSidebar의 `DEFAULT_TOP_MENU` 두 번째 항목 (id: "templates")을 채팅 기록 용도로 전환 희망
- 백엔드 API 미완성 상태
- 기존 템플릿 보관함 기능과의 역할 분리 필요

### 🎯 목표
- 사용자가 이전 대화 내용을 쉽게 찾고 재접근할 수 있는 기능
- 직관적이고 접근성 좋은 UI/UX
- 향후 백엔드 연동을 고려한 확장 가능한 구조

## 🔍 UI/UX 방식 비교 분석

### 옵션 A: 사이드 슬라이드 패널 (권장) ⭐

#### 장점
- **빠른 접근성**: 마우스 오버만으로 즉시 확인 가능
- **컨텍스트 유지**: 현재 작업을 중단하지 않고 기록 확인
- **공간 효율성**: 별도 페이지 없이 오버레이로 처리
- **사용자 경험**: Discord, Slack 등 친숙한 패턴

#### 단점
- 복잡한 구현 (호버 상태 관리, 애니메이션)
- 모바일 대응 어려움
- 긴 목록 표시 시 스크롤 필요

#### 구현 복잡도: 🔶 중간

```javascript
// 구현 예시
const ChatHistoryPanel = ({ isVisible, chatHistory }) => (
  <div className={`absolute left-full ml-2 w-80 bg-white shadow-lg rounded-lg transition-all ${
    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
  }`}>
    {/* 채팅 기록 리스트 */}
  </div>
);
```

### 옵션 B: 별도 페이지 (안정적)

#### 장점
- **구현 단순성**: 기존 페이지 패턴 재사용
- **풍부한 기능**: 검색, 필터링, 상세 정보 표시 가능
- **모바일 친화적**: 반응형 디자인 용이
- **확장성**: 향후 기능 추가 용이

#### 단점
- 페이지 전환으로 인한 컨텍스트 손실
- 추가 라우팅 및 페이지 컴포넌트 필요

#### 구현 복잡도: 🟢 낮음

```javascript
// 라우팅 추가
<Route path="/chat-history" element={<ChatHistoryPage />} />
```

### 옵션 C: 모달 팝업 (절충안)

#### 장점
- 컨텍스트 유지
- 구현 복잡도 중간
- 모바일 대응 가능

#### 단점
- 화면 가림
- 모달 피로감

## 💾 데이터 저장 방식 분석

### 옵션 1: localStorage 활용 (즉시 구현 가능) ⭐

#### 장점
- **즉시 구현**: 백엔드 대기 없이 바로 시작
- **오프라인 지원**: 네트워크 없이도 기록 유지
- **빠른 응답**: 로컬 데이터로 즉시 표시

#### 단점
- 브라우저별/기기별 격리
- 용량 제한 (일반적으로 5-10MB)
- 데이터 손실 위험

#### 구현 방안
```javascript
// 채팅 기록 저장 구조
const chatHistoryStorage = {
  save: (chatSession) => {
    const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    history.unshift({
      id: Date.now(),
      title: chatSession.title || `대화 ${new Date().toLocaleDateString()}`,
      messages: chatSession.messages,
      createdAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString()
    });

    // 최대 50개 대화만 유지
    const limitedHistory = history.slice(0, 50);
    localStorage.setItem('chatHistory', JSON.stringify(limitedHistory));
  },

  load: () => {
    return JSON.parse(localStorage.getItem('chatHistory') || '[]');
  }
};
```

### 옵션 2: 백엔드 API 대기

#### 장점
- 완전한 데이터 지속성
- 다기기 동기화
- 무제한 저장

#### 단점
- 개발 지연
- 복잡한 인증/권한 관리

### 옵션 3: 하이브리드 방식 (권장)

#### 구현 전략
1. **Phase 1**: localStorage로 즉시 구현
2. **Phase 2**: 백엔드 준비 시 마이그레이션 기능 추가
3. **Phase 3**: 양방향 동기화

```javascript
// 하이브리드 저장소 패턴
class ChatHistoryManager {
  constructor() {
    this.useLocal = !this.hasBackendSupport();
  }

  async save(chatSession) {
    if (this.useLocal) {
      return this.saveToLocal(chatSession);
    } else {
      return this.saveToBackend(chatSession);
    }
  }

  async migrate() {
    // localStorage → Backend 마이그레이션
    const localData = this.loadFromLocal();
    await this.syncToBackend(localData);
  }
}
```

## 🎨 권장 구현 방안

### 📐 UI 설계: 사이드 슬라이드 패널

```javascript
// AppSidebar.jsx 수정
const ChatHistoryButton = ({ chatHistory, onSelectChat }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="p-3 rounded-lg hover:bg-gray-700 transition-colors">
        <MessageSquareIcon className="w-6 h-6 text-gray-400" />
      </button>

      <ChatHistoryPanel
        isVisible={isHovered}
        chatHistory={chatHistory}
        onSelectChat={onSelectChat}
      />
    </div>
  );
};
```

### 🗂️ 데이터 구조 설계

```javascript
// 채팅 세션 데이터 구조
interface ChatSession {
  id: string;
  title: string;           // "카페 주문 알림 템플릿 생성"
  preview: string;         // 첫 번째 메시지 미리보기
  messages: ChatMessage[];
  createdAt: string;
  lastUpdatedAt: string;
  tags?: string[];         // 향후 카테고리화
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
```

### 🎯 기능 우선순위

#### Phase 1: 기본 기능 (1-2일)
- [ ] localStorage 기반 저장/조회
- [ ] 사이드 패널 UI 구현
- [ ] 기본 채팅 기록 표시
- [ ] 대화 재시작 기능

#### Phase 2: 향상된 UX (3-5일)
- [ ] 제목 자동 생성 (첫 메시지 기반)
- [ ] 미리보기 텍스트
- [ ] 삭제 기능
- [ ] 검색 기능

#### Phase 3: 고급 기능 (1주일+)
- [ ] 백엔드 연동 준비
- [ ] 데이터 마이그레이션
- [ ] 태그/카테고리 시스템
- [ ] 즐겨찾기 기능

## 🔧 기술적 구현 가이드

### 1. AppSidebar 수정

```javascript
// DEFAULT_TOP_MENU 수정
const DEFAULT_TOP_MENU = [
  {
    id: "create",
    icon: PlusCircleIcon,
    tooltip: "새 템플릿 생성",
    href: "/create",
    className: "p-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors"
  },
  {
    id: "chat-history",  // 변경됨
    icon: MessageSquareIcon,
    tooltip: "채팅 기록",  // 변경됨
    component: ChatHistoryButton,  // 새로운 속성
    className: "p-3 rounded-lg hover:bg-gray-700 transition-colors",
    iconClassName: "w-6 h-6 text-gray-400"
  }
];
```

### 2. 채팅 기록 저장 로직

```javascript
// GeneratorPageV3.jsx에 추가
const saveChatSession = useCallback((messages) => {
  if (messages.length === 0) return;

  const chatSession = {
    id: `chat_${Date.now()}`,
    title: generateTitleFromFirstMessage(messages[0]),
    preview: messages[0].content.substring(0, 100) + '...',
    messages: messages,
    createdAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString()
  };

  chatHistoryStorage.save(chatSession);
}, []);

// 페이지 종료 시 자동 저장
useEffect(() => {
  const handleBeforeUnload = () => {
    if (chatMessages.length > 0) {
      saveChatSession(chatMessages);
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [chatMessages, saveChatSession]);
```

### 3. 채팅 기록 패널 컴포넌트

```javascript
// components/chat/ChatHistoryPanel.jsx
const ChatHistoryPanel = ({ isVisible, onSelectChat }) => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    setChatHistory(chatHistoryStorage.load());
  }, [isVisible]);

  return (
    <div className={`absolute left-full ml-2 w-80 bg-white shadow-xl rounded-lg border transition-all duration-200 ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
    }`}>
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-900">채팅 기록</h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className="p-3 border-b hover:bg-gray-50 cursor-pointer"
          >
            <h4 className="font-medium text-sm text-gray-900 truncate">
              {chat.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1 truncate">
              {chat.preview}
            </p>
            <span className="text-xs text-gray-400">
              {formatRelativeTime(chat.createdAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## ⚠️ 위험 요소 및 대응 방안

### 1. 기존 기능과의 충돌
- **위험**: 템플릿 보관함 접근성 저하
- **대응**: 명확한 아이콘과 툴팁으로 구분, 필요시 템플릿 보관함 별도 메뉴 추가

### 2. 성능 이슈
- **위험**: 많은 채팅 기록으로 인한 렌더링 지연
- **대응**: 가상 스크롤링, 지연 로딩, 최대 항목 수 제한

### 3. 데이터 손실
- **위험**: localStorage 데이터 손실
- **대응**: 정기적 백업 알림, 내보내기 기능

## 💡 추가 개선 아이디어

### 사용자 경험 향상
- 채팅 제목 편집 기능
- 중요 대화 북마크
- 대화 내용 전체 검색
- 대화 요약 자동 생성

### 기술적 향상
- 대화 내용 압축 저장
- 실시간 동기화
- 오프라인 모드 지원
- 데이터 암호화

## 📅 권장 구현 일정

### 즉시 시작 (1-2일)
- [ ] localStorage 기반 저장소 구현
- [ ] AppSidebar 메뉴 항목 수정
- [ ] 기본 사이드 패널 UI 구현

### 단기 (3-5일)
- [ ] 채팅 기록 자동 저장 로직
- [ ] 대화 재시작 기능
- [ ] 제목 자동 생성 로직
- [ ] 삭제 기능

### 중기 (1-2주)
- [ ] 검색 기능
- [ ] 고급 필터링
- [ ] 백엔드 연동 준비
- [ ] 데이터 마이그레이션 로직

## 🎯 결론 및 권장사항

### ✅ 권장 방향
1. **UI 방식**: 사이드 슬라이드 패널 (즉시 접근성 + 컨텍스트 유지)
2. **데이터 저장**: localStorage 우선, 하이브리드 방식으로 확장
3. **구현 순서**: Phase 1 기본 기능부터 점진적 개발

### 🚀 즉시 실행 가능
백엔드 대기 없이 localStorage 기반으로 바로 시작할 수 있으며, 사용자에게 즉시 가치를 제공할 수 있습니다.

### 📈 향후 확장성
하이브리드 아키텍처로 설계하여 백엔드 완성 시 자연스러운 마이그레이션이 가능합니다.

**다음 단계**: 이 문서 검토 후 Phase 1 기본 기능부터 구현 시작 권장