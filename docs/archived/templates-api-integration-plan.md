# 템플릿 목록 API 연동 작업 문서

## 🎯 작업 목표

TemplatesPageV3에서 Mock 데이터 대신 실제 백엔드 API를 사용하여 템플릿 목록을 조회하고 표시

## 📋 현재 상황 분석

### 현재 Mock 데이터 구조
```javascript
// 현재 사용 중인 Mock 데이터
const mockApiResponse = {
  "data": {
    "items": [
      {
        "id": 32041,
        "userId": 103,
        "title": "카페 주문 완료 알림 (긴급)",
        "content": "안녕하세요, #{고객명}님.\\n\\n주문이 완료되었습니다.",
        "status": "APPROVE_REQUESTED",
        "createdAt": "2025-09-16T23:44:59",
        "buttons": [{"id": 20116, "name": "주문 상세 보기"}],
        "variables": []
      },
      // ... 9개 더
    ],
    "page": 1,
    "size": 10,
    "total": 10
  }
}
```

### 백엔드 API 스펙 (docs/backend_api.md)
```
GET /api/templates
Request Parameters:
- page: 1 (페이지 번호)
- size: 10 (페이지 크기)
- status: "APPROVE_REQUESTED" | "APPROVED" | "REJECTED" (필터)

Response:
{
  "data": {
    "items": [...],
    "page": 1,
    "size": 10,
    "total": 2
  }
}
```

## 🔍 차이점 및 호환성 분석

### ✅ 호환되는 부분
- Response 구조가 Mock과 동일
- 필수 필드들 일치: id, title, content, status, createdAt
- 페이지네이션 구조 동일

### ⚠️ 주의사항
1. **'ALL' 상태 미구현**: 백엔드에서 status 파라미터 없이 호출 시 400 에러 발생
2. **필터 파라미터**: Query Parameters로 전송 (현재는 Request Body 사용)
3. **인증 헤더**: JWT 토큰 필요
4. **필수 status 파라미터**: status 값이 없으면 API 호출 실패

## 📝 상세 작업 계획

### Phase 1: API 유틸리티 함수 개선
- [ ] `src/utils/api.js`에 템플릿 목록 조회 함수 추가
- [ ] JWT 토큰 자동 포함 설정
- [ ] Query Parameters 방식으로 필터 전송

### Phase 2: TemplatesPageV3 수정
- [ ] Mock 데이터 제거
- [ ] 실제 API 호출로 교체
- [ ] 'ALL' 상태 처리 로직 수정 (임시 제거)
- [ ] 에러 처리 강화

### Phase 3: 상태 관리 개선
- [ ] 'ALL' 필터 버튼 임시 숨김 처리
- [ ] 기본 상태를 'APPROVE_REQUESTED'로 설정
- [ ] 로딩 상태 개선
- [ ] 에러 상태 UI 추가

## 🛠️ 구현 상세

### 1. API 함수 추가 (src/utils/api.js)
```javascript
// 템플릿 목록 조회 API
export const getTemplates = async (params = {}) => {
  const { page = 1, size = 10, status = 'APPROVE_REQUESTED' } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    status: status  // status는 항상 필수로 전송
  });

  const response = await fetch(`${BASE_URL}/api/templates?${queryParams}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getStoredToken()}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
```

### 2. TemplatesPageV3 수정 포인트

#### 현재 코드 (284-313줄)
```javascript
// 목업 데이터를 사용한 시뮬레이션 로직
setTimeout(() => {
  let filteredItems = mockApiResponse.data.items;

  if (statusFilter !== 'ALL') {
    filteredItems = filteredItems.filter(item => item.status === statusFilter);
  }
  // ... 필터링 로직
}, 500);
```

#### 새로운 코드
```javascript
// 실제 API 호출
try {
  const params = {
    page: currentPage,
    size: itemsPerPage,
    status: statusFilter  // status는 항상 필수로 전송
  };

  const result = await getTemplates(params);

  if (result.data) {
    setTemplates(result.data.items);
    setTotalPages(Math.ceil(result.data.total / result.data.size));
  }
} catch (error) {
  console.error('템플릿 목록 조회 실패:', error);
  setError('템플릿 목록을 불러오는데 실패했습니다.');
  setTemplates([]);
}
```

### 3. 'ALL' 상태 처리 전략

#### ✅ 채택된 방안: 'ALL' 상태 임시 제거
- **현재 상황**: 백엔드에서 status 파라미터 없이 호출 시 400 에러 발생
- **해결책**: 'ALL' 필터 버튼을 임시로 숨김 처리
- **기본 상태**: 페이지 로드 시 'APPROVE_REQUESTED' 상태로 시작
- **향후 계획**: 백엔드에서 'ALL' 상태 구현 완료 후 UI에 다시 추가

#### ❌ 대안들 (현재 불가능)
- **옵션 A**: status 파라미터 생략 → 400 에러 발생으로 불가능
- **옵션 B**: 다중 API 호출 → 성능상 비효율적
- **옵션 C**: Mock 데이터 유지 → 실제 API 연동 목적에 부합하지 않음

### 4. 에러 처리 개선

#### 네트워크 에러
```javascript
catch (error) {
  if (error.message.includes('400')) {
    setError('잘못된 요청입니다. 페이지를 새로고침해주세요.');
  } else if (error.message.includes('401')) {
    setError('로그인이 필요합니다. 다시 로그인해주세요.');
    // 로그인 페이지로 리다이렉트
  } else if (error.message.includes('500')) {
    setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  } else {
    setError('템플릿 목록을 불러오는데 실패했습니다.');
  }
}
```

#### UI 에러 표시
```javascript
{error && (
  <div className="col-span-full text-center py-16 bg-red-50 rounded-lg border border-red-200">
    <p className="text-red-600">{error}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
    >
      다시 시도
    </button>
  </div>
)}
```

## 🧪 테스트 계획

### 단계별 테스트
1. **API 연결 테스트**
   - [ ] 정상적인 목록 조회
   - [ ] 페이지네이션 동작
   - [ ] 상태별 필터링

2. **에러 시나리오 테스트**
   - [ ] 네트워크 오류
   - [ ] 인증 실패 (401)
   - [ ] 서버 오류 (500)
   - [ ] 빈 결과

3. **UI/UX 테스트**
   - [ ] 로딩 상태 표시
   - [ ] 에러 메시지 표시
   - [ ] 빈 상태 메시지

### 검증 포인트
- Mock 데이터와 동일한 UI 렌더링
- 검색 및 필터링 기능 정상 동작
- 페이지네이션 정확성
- 복사/삭제 기능 유지

## ⚠️ 위험 요소 및 대응 방안

### 1. 백엔드 API 불안정성
- **위험**: API 응답 지연, 서버 오류
- **대응**: Timeout 설정, 재시도 로직, Fallback UI

### 2. 'ALL' 상태 미구현 및 400 에러
- **위험**: status 파라미터 없이 호출 시 400 에러 발생
- **대응**: 'ALL' 필터 버튼 임시 숨김, 기본값 'APPROVE_REQUESTED' 사용

### 3. 인증 토큰 만료
- **위험**: 403/401 에러 발생
- **대응**: 자동 토큰 갱신, 로그인 페이지 리다이렉트

## 📅 작업 일정

### 즉시 실행 (1-2시간)
- [ ] API 함수 추가
- [ ] Mock 데이터 교체
- [ ] 기본 에러 처리

### 단기 (1일)
- [ ] 'ALL' 상태 UI 임시 숨김 처리
- [ ] 기본 필터 상태 설정 ('APPROVE_REQUESTED')
- [ ] UI 에러 표시 개선
- [ ] 전체 테스트 수행

### 중기 (백엔드 'ALL' 상태 구현 후)
- [ ] 백엔드에서 'ALL' 상태 지원 시 UI에 다시 추가
- [ ] 'ALL' 상태 API 연동 테스트
- [ ] 성능 최적화
- [ ] 고급 에러 처리

## 🎯 완료 조건

1. **기능적 완성**
   - [ ] 실제 API로 템플릿 목록 조회
   - [ ] 모든 필터 상태 정상 동작
   - [ ] 페이지네이션 정확한 동작

2. **사용자 경험**
   - [ ] Mock 데이터와 동일한 UI
   - [ ] 적절한 로딩 및 에러 상태
   - [ ] 부드러운 상태 전환

3. **코드 품질**
   - [ ] Mock 데이터 완전 제거
   - [ ] 적절한 에러 처리
   - [ ] 재사용 가능한 API 함수

## 💡 추가 개선 아이디어

### 성능 최적화
- API 응답 캐싱
- 무한 스크롤링 도입
- 이미지 레이지 로딩

### 사용자 경험
- 실시간 검색 (디바운싱)
- 즐겨찾기 기능
- 템플릿 미리보기 확대

---

## 📝 결론

백엔드에서 status 파라미터 없이 호출 시 400 에러가 발생하는 제약사항을 반영하여, 'ALL' 상태를 임시로 제거하고 기본 상태를 'APPROVE_REQUESTED'로 설정하는 방향으로 계획을 수정했습니다.

**핵심 변경사항**:
- 'ALL' 필터 버튼 임시 숨김 처리
- status 파라미터 항상 필수로 전송
- 기본 상태를 'APPROVE_REQUESTED'로 설정
- 400 에러 처리 로직 추가

**백엔드 'ALL' 상태 구현 완료 후**에는 UI에 'ALL' 필터를 다시 추가하여 전체 목록 조회 기능을 제공할 예정입니다.

**다음 단계**: 이 수정된 계획에 대한 검토 후 Phase 1부터 단계적 구현 시작