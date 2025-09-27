# 템플릿 생성 에러 처리 개선 계획

## 문제 분석

### 현재 상황
- GeneratorPageV2.jsx의 `handleGenerate` 함수에서 템플릿 생성 실패 시 처리 로직이 불완전
- HTTP 상태 코드 200 이외의 응답에서 `response.error.message`를 채팅 패널에 표시하지 않음
- 사용자가 에러 발생 시 아무런 피드백을 받지 못하는 상황

### 문제점
1. **에러 가시성 부족**: API 응답에서 상태 코드가 200이 아닐 때 에러 메시지 미표시
2. **사용자 경험 저하**: 실패 원인을 알 수 없어 재시도 또는 수정이 어려움
3. **디버깅 어려움**: 개발자도 실제 에러 내용을 UI에서 확인하기 어려움
4. **일관성 부족**: 성공/실패 응답 처리가 일관되지 않음

## 현재 에러 처리 분석

### 기존 코드 구조 (src/pages/GeneratorPageV2.jsx:451-513)
```javascript
const handleGenerate = async (prompt) => {
  setIsLoading(true);
  // ... 사용자 메시지 추가

  try {
    const response = await templateApi.generateTemplate(prompt);

    // 성공 케이스 처리
    if (response && response.data) {
      // 정상 템플릿 생성 처리
    }

    // 에러 케이스 처리 (파싱 가능한 에러)
    if (response && response.error) {
      // parseNestedJsonError로 파싱 시도
      // contextualQuestion만 표시
    }
  } catch (error) {
    // 네트워크 에러 등 예외 처리
    // 일반적인 에러 메시지만 표시
  } finally {
    setIsLoading(false);
  }
};
```

### 누락된 처리
1. **HTTP 상태 코드 확인**: 200 외 상태코드에 대한 명시적 처리 없음
2. **직접적인 에러 메시지**: `response.error.message` 값 미활용
3. **상태 코드별 분기**: 400, 401, 500 등 다양한 에러 상황 미구분

## 해결 방안

### 1. 상태 코드 기반 에러 처리 (권장)

#### 1.1 HTTP 상태 코드 확인 로직 추가
```javascript
const handleGenerate = async (prompt) => {
  // ... 기존 코드

  try {
    const response = await templateApi.generateTemplate(prompt);

    // HTTP 상태 코드 확인
    if (response.status && response.status !== 200) {
      const errorMessage = response.error?.message || `서버 오류가 발생했습니다. (상태코드: ${response.status})`;

      const botErrorMessage = {
        id: Date.now() + 1,
        type: "error", // 새로운 메시지 타입
        text: errorMessage,
      };
      setMessages((prev) => [...prev, botErrorMessage]);
      return;
    }

    // 기존 성공/에러 처리 로직
    // ...
  }
};
```

#### 1.2 에러 메시지 타입 추가
- 새로운 메시지 타입 `"error"` 추가로 에러 메시지를 구분
- 시각적으로 다른 스타일링 적용 가능

#### 1.3 상태 코드별 세분화된 처리
```javascript
const getErrorMessage = (status, errorMessage) => {
  switch (status) {
    case 400:
      return errorMessage || "요청에 문제가 있습니다. 입력 내용을 확인해주세요.";
    case 401:
      return "인증이 만료되었습니다. 다시 로그인해주세요.";
    case 403:
      return "권한이 없습니다. 관리자에게 문의하세요.";
    case 429:
      return "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
    case 500:
    case 502:
    case 503:
      return "서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
    default:
      return errorMessage || `알 수 없는 오류가 발생했습니다. (상태코드: ${status})`;
  }
};
```

### 2. 메시지 컴포넌트 개선

#### 2.1 에러 메시지 전용 스타일링
```javascript
// ChatMessage.jsx에 에러 타입 추가
const ChatMessage = ({ message }) => {
  if (message.type === "error") {
    return (
      <div className="flex justify-start mb-4">
        <div className="max-w-[80%] bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircleIcon className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-800 text-sm">{message.text}</p>
              <span className="text-red-600 text-xs mt-1 block">
                다시 시도하거나 다른 방식으로 요청해보세요.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // ... 기존 메시지 타입 처리
};
```

#### 2.2 아이콘 추가
- 에러 메시지에 경고 아이콘 표시
- 시각적으로 구분되는 빨간색 계열 색상 사용

### 3. 대안 방법들

#### 3.1 토스트 알림 방식
- react-hot-toast 라이브러리 활용
- 채팅 영역 외부에 에러 토스트 표시
- 일정 시간 후 자동 사라짐

#### 3.2 인라인 에러 표시
- 입력창 하단에 에러 메시지 표시
- 새로운 입력 시 에러 메시지 자동 제거

#### 3.3 모달 에러 표시
- 심각한 에러 시 모달로 표시
- 상세한 에러 정보와 해결 방안 제공

## 구현 계획

### Phase 1: 기본 에러 메시지 표시
1. **상태 코드 확인 로직 추가**
   - HTTP 상태 200 외 응답에 대한 처리
   - `response.error.message` 활용

2. **에러 메시지 타입 추가**
   - 새로운 메시지 타입 `"error"` 정의
   - 기존 메시지 처리 로직과 분리

3. **기본 에러 스타일링**
   - 빨간색 계열 색상으로 구분
   - 에러 아이콘 추가

### Phase 2: 고급 에러 처리
1. **상태 코드별 세분화**
   - 400, 401, 500 등 상태별 맞춤 메시지
   - 사용자 친화적인 에러 설명

2. **재시도 기능**
   - 일시적 에러 시 재시도 버튼 제공
   - 자동 재시도 로직 (선택사항)

3. **에러 로깅**
   - 에러 발생 시 로그 수집
   - 사용자 행동 분석을 위한 데이터 수집

### Phase 3: 사용자 경험 향상
1. **맥락적 도움말**
   - 에러 유형별 해결 방안 제안
   - FAQ 링크 또는 도움말 제공

2. **Progressive Enhancement**
   - 네트워크 상태 감지
   - 오프라인 모드 대응

## 기술적 고려사항

### 1. API 응답 구조 확인
```javascript
// 예상되는 응답 구조
{
  status: 400,
  data: null,
  error: {
    message: "템플릿 생성에 필요한 정보가 부족합니다.",
    code: "INSUFFICIENT_DATA",
    details: {...}
  }
}
```

### 2. 타입 안전성
- TypeScript 환경에서 응답 타입 정의
- 에러 객체 구조에 대한 타입 가드

### 3. 성능 고려사항
- 에러 메시지 렌더링 최적화
- 불필요한 리렌더링 방지

### 4. 접근성
- 스크린 리더를 위한 ARIA 라벨
- 키보드 네비게이션 지원

## 예상 효과

### 사용자 경험
- 🎯 **명확한 피드백**: 에러 발생 시 구체적인 원인 파악 가능
- 🔄 **빠른 문제 해결**: 에러 메시지 기반으로 신속한 수정 가능
- 📱 **일관된 인터페이스**: 성공/실패 메시지의 일관된 표시

### 개발자 경험
- 🐛 **쉬운 디버깅**: UI에서 직접 에러 내용 확인 가능
- 📊 **에러 추적**: 실제 운영 환경에서의 에러 패턴 파악
- 🔧 **빠른 수정**: 에러 원인 명확화로 신속한 문제 해결

## 구현 우선순위

1. **High Priority**: HTTP 상태 코드 확인 및 기본 에러 메시지 표시
2. **Medium Priority**: 에러 메시지 스타일링 및 시각적 구분
3. **Low Priority**: 상태 코드별 세분화된 처리 및 고급 기능

## 다음 단계
1. Phase 1 구현 및 테스트
2. 다양한 에러 시나리오 테스트
3. 사용자 피드백 수집 후 개선사항 적용