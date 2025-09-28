# 채팅 세션 자동 저장 이슈 분석 문서

## 🚨 문제 상황

사용자가 GeneratorPageV3 페이지에 접속하면 **아직 대화를 시작하지도 않았는데** 채팅 세션이 자동으로 저장되는 문제가 발생하고 있습니다.

## 🔍 원인 분석

### 1. 초기 메시지 자동 설정

**문제 코드**: `GeneratorPageV3.jsx:316-324`
```javascript
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
```

### 2. 메시지 변경 감지 자동 저장

**문제 코드**: `GeneratorPageV3.jsx:74-79`
```javascript
// 메시지 변경 시 자동 저장
useEffect(() => {
  if (messages.length > 0) {
    saveChatSession(messages, currentSessionId);
  }
}, [messages, saveChatSession, currentSessionId]);
```

### 3. 문제 발생 플로우

```
1. 페이지 로드
   ↓
2. 초기 메시지 설정 (useEffect 실행)
   ↓ setMessages([봇 메시지])
3. messages 상태 변경 감지
   ↓
4. 자동 저장 로직 실행 (messages.length > 0 = true)
   ↓
5. 사용자 대화 없이도 채팅 세션 저장됨
```

## 📊 상세 분석

### chatHistoryStorage.save() 동작

현재 `chatHistoryStorage.save()` 함수는 다음 조건만 확인합니다:

**조건 체크**: `chatHistoryStorage.js:66-69`
```javascript
if (!chatSession || !chatSession.messages || chatSession.messages.length === 0) {
  console.warn('빈 채팅 세션은 저장하지 않습니다.');
  return null;
}
```

**문제점**:
- 메시지가 1개 이상이면 무조건 저장됨
- **봇의 초기 안내 메시지**도 "유효한 대화"로 인식됨
- **사용자 메시지 여부**를 확인하지 않음

### 현재 저장되는 데이터

페이지 접속 시 자동으로 저장되는 채팅 세션:
```json
{
  "id": "chat_1727522340123",
  "title": "템플릿 생성을 위해 추가 정보가 필요합니다. 구체...",
  "preview": "템플릿 생성을 위해 추가 정보가 필요합니다. 구체적인 목적, 대상 고객, 포함할 정보를 작성하시고, 마지막에 '템플릿 생성' 문구를 함께 입력해 주세요.",
  "messages": [
    {
      "id": 1,
      "type": "bot",
      "text": "템플릿 생성을 위해 추가 정보가 필요합니다..."
    }
  ],
  "messageCount": 1,
  "createdAt": "2024-09-28T05:32:20.123Z"
}
```

## 💡 해결 방안

### 방안 1: 사용자 메시지 존재 여부 체크 (권장) ⭐

초기 봇 메시지만 있는 세션은 저장하지 않도록 조건 변경

**장점**:
- 가장 직관적이고 정확한 해결책
- 사용자가 실제 대화를 시작한 후에만 저장
- 기존 로직 최소 변경

**구현 방법**:
```javascript
// chatHistoryStorage.js - save 함수 수정
const hasUserMessage = chatSession.messages.some(msg => msg.type === 'user');
if (!hasUserMessage) {
  console.warn('사용자 메시지가 없는 세션은 저장하지 않습니다.');
  return null;
}
```

### 방안 2: 저장 조건 지연

사용자 첫 메시지 이후에만 자동 저장 활성화

**장점**:
- 명시적인 저장 시점 제어
- 불필요한 저장 완전 방지

**구현 방법**:
```javascript
// GeneratorPageV3.jsx - 상태 추가
const [isUserChatStarted, setIsUserChatStarted] = useState(false);

// 메시지 변경 시 자동 저장 (조건 추가)
useEffect(() => {
  if (messages.length > 0 && isUserChatStarted) {
    saveChatSession(messages, currentSessionId);
  }
}, [messages, saveChatSession, currentSessionId, isUserChatStarted]);

// 사용자 메시지 감지 시 저장 활성화
useEffect(() => {
  const hasUserMessage = messages.some(msg => msg.type === 'user');
  if (hasUserMessage && !isUserChatStarted) {
    setIsUserChatStarted(true);
  }
}, [messages, isUserChatStarted]);
```

### 방안 3: 초기 메시지 제외

저장 시 초기 봇 메시지는 자동으로 제외

**장점**:
- 초기 메시지와 실제 대화 분리
- 깔끔한 채팅 기록 관리

**구현 방법**:
```javascript
// saveChatSession 함수 수정
const messagesToSave = messageList.filter(msg =>
  !(msg.type === 'bot' && msg.id === 1) // 초기 봇 메시지 제외
);

if (messagesToSave.length === 0) return; // 저장할 메시지가 없으면 종료
```

## 🎯 권장 구현: 방안 1 (사용자 메시지 체크)

### 수정할 파일
- `src/utils/chatHistoryStorage.js` - save 함수 조건 개선

### 구현 코드
```javascript
save: (chatSession) => {
  try {
    if (!chatSession || !chatSession.messages || chatSession.messages.length === 0) {
      console.warn('빈 채팅 세션은 저장하지 않습니다.');
      return null;
    }

    // 사용자 메시지가 있는지 확인
    const hasUserMessage = chatSession.messages.some(msg => msg.type === 'user');
    if (!hasUserMessage) {
      console.warn('사용자 메시지가 없는 세션은 저장하지 않습니다.');
      return null;
    }

    // 기존 저장 로직 계속...
  }
}
```

## 📈 예상 효과

✅ **불필요한 저장 제거**: 페이지 접속만으로 빈 세션 생성 방지
✅ **의미있는 채팅 기록**: 실제 사용자 대화만 저장
✅ **저장소 효율성**: localStorage 공간 절약
✅ **사용자 경험**: 채팅 기록 목록에 의미없는 항목 제거

## 🔧 구현 우선순위

1. **🔴 즉시 적용**: 방안 1 (사용자 메시지 체크) - 5분 작업
2. **🟡 추가 고려**: 방안 2 (저장 조건 지연) - 더 정교한 제어 원할 경우
3. **🟢 선택 사항**: 방안 3 (초기 메시지 제외) - UI 최적화 목적

**결론**: 간단하면서도 효과적인 해결책으로 사용자 경험을 크게 개선할 수 있습니다!