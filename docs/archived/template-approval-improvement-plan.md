# 템플릿 승인 중복 클릭 방지 개선 계획

## 문제 분석

### 현재 상황
- GeneratorPageV2.jsx의 '이 템플릿 승인하기' 버튼이 클릭 후에도 계속 활성화되어 있음
- 같은 템플릿에 대해 중복 승인 요청이 가능한 상태
- 사용자가 실수로 여러 번 클릭할 수 있어 서버에 불필요한 요청 발생

### 문제점
1. **사용자 경험**: 승인 완료 후에도 버튼이 그대로 남아있어 혼란 야기
2. **서버 부하**: 동일 템플릿에 대한 중복 API 호출
3. **데이터 무결성**: 중복 승인 요청으로 인한 잠재적 오류
4. **시각적 피드백 부족**: 승인 상태에 대한 명확한 표시 없음

## 해결 방안

### 1. 상태 기반 버튼 관리 (권장)

#### 1.1 승인 상태 추적
```javascript
// 상태 추가
const [approvedTemplates, setApprovedTemplates] = useState(new Set());
const [approvingTemplates, setApprovingTemplates] = useState(new Set());

// 승인 중인 템플릿 확인
const isApproving = approvingTemplates.has(selectedVersion?.templateId);
const isApproved = approvedTemplates.has(selectedVersion?.templateId);
```

#### 1.2 버튼 상태별 UI 변경
- **기본 상태**: "이 템플릿 승인하기" (파란색 버튼)
- **승인 중**: "승인 요청 중..." (비활성화, 로딩 스피너)
- **승인 완료**: "승인 요청 완료" (녹색, 체크 아이콘, 비활성화)

#### 1.3 handleApproveTemplate 개선
```javascript
const handleApproveTemplate = async () => {
  const templateId = selectedVersion?.templateId;

  if (!templateId || isApproving || isApproved) {
    return; // 이미 승인 중이거나 완료된 경우 리턴
  }

  // 승인 시작
  setApprovingTemplates(prev => new Set(prev).add(templateId));

  try {
    const response = await templateApi.approveTemplate(templateId);

    if (response?.data?.status === "APPROVE_REQUESTED") {
      setApprovedTemplates(prev => new Set(prev).add(templateId));
      // 성공 메시지는 버튼 UI로 대체
    }
  } catch (error) {
    // 에러 시 승인 중 상태 해제
    setApprovingTemplates(prev => {
      const newSet = new Set(prev);
      newSet.delete(templateId);
      return newSet;
    });
    alert("템플릿 승인 요청 중 오류가 발생했습니다.");
  }
};
```

### 2. 대안 방법들

#### 2.1 모달 확인 방식
- 승인 버튼 클릭 시 확인 모달 표시
- "정말 승인하시겠습니까?" 메시지와 함께 최종 확인
- 승인 후 모달에서 완료 메시지 표시

#### 2.2 페이지 리디렉션
- 승인 완료 후 templates 페이지로 이동
- 새로운 템플릿 생성을 유도

#### 2.3 승인 상태 서버 동기화
- 템플릿 데이터에 승인 상태 포함
- 페이지 로드 시 서버에서 승인 상태 확인
- 이미 승인된 템플릿은 버튼 비활성화

## 구현 계획

### Phase 1: 기본 상태 관리 (권장)
1. **상태 변수 추가**
   - `approvedTemplates`: Set 타입으로 승인된 템플릿 ID 관리
   - `approvingTemplates`: Set 타입으로 승인 중인 템플릿 ID 관리

2. **UI 컴포넌트 개선**
   - 버튼 상태별 스타일 및 텍스트 변경
   - 로딩 스피너 및 체크 아이콘 추가
   - 호버 효과 및 트랜지션 적용

3. **로직 개선**
   - 중복 클릭 방지 로직 추가
   - 에러 처리 개선
   - alert 대신 버튼 상태로 피드백 제공

### Phase 2: 사용자 경험 향상
1. **토스트 알림 시스템**
   - react-hot-toast 라이브러리 도입
   - 승인 성공/실패 토스트 메시지

2. **애니메이션 효과**
   - 버튼 상태 전환 애니메이션
   - 체크 아이콘 등장 애니메이션

3. **키보드 접근성**
   - 승인 완료 후 포커스 관리
   - ARIA 레이블 추가

### Phase 3: 고급 기능 (선택사항)
1. **서버 상태 동기화**
   - 템플릿 상세 API에 승인 상태 추가
   - 페이지 새로고침 시에도 상태 유지

2. **승인 이력 관리**
   - 승인 일시 표시
   - 승인 취소 기능 (관리자용)

## 기술적 고려사항

### 1. 상태 관리
- Set 자료구조 사용으로 O(1) 시간 복잡도 보장
- React 18의 concurrent features 고려한 상태 업데이트

### 2. 성능 최적화
- useMemo/useCallback을 통한 불필요한 렌더링 방지
- 템플릿 변경 시에만 버튼 상태 재계산

### 3. 접근성
- WCAG 2.1 AA 준수
- 스크린 리더 지원
- 키보드 네비게이션 지원

## 예상 효과

### 사용자 경험
- 🎯 **명확한 피드백**: 승인 상태를 시각적으로 확인 가능
- 🛡️ **실수 방지**: 중복 클릭으로 인한 혼란 제거
- ⚡ **빠른 이해**: 직관적인 버튼 상태 변화

### 시스템 안정성
- 📉 **서버 부하 감소**: 중복 API 호출 방지
- 🔒 **데이터 무결성**: 일관된 승인 상태 관리
- 🚀 **성능 향상**: 불필요한 네트워크 요청 제거

## 구현 우선순위

1. **High Priority**: 기본 상태 관리 및 중복 클릭 방지
2. **Medium Priority**: UI/UX 개선 및 애니메이션
3. **Low Priority**: 서버 상태 동기화 및 고급 기능

## 다음 단계
1. Phase 1 구현 및 테스트
2. 사용자 피드백 수집
3. 필요에 따라 Phase 2, 3 진행