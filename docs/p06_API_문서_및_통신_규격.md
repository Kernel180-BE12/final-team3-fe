# p06_API_문서_및_통신_규격

## 🌐 API 통신 규격 및 엔드포인트 문서

**AI 알림톡 생성기**의 프론트엔드-백엔드 간 API 통신 규격을 정의한 종합 문서입니다. 모든 API 엔드포인트, 요청/응답 스키마, 인증 방식, 에러 처리 등을 체계적으로 정리하여 개발팀 간 원활한 협업을 지원합니다.

---

## 📋 API 기본 정보

### 기본 설정

| 항목 | 값 | 설명 |
|------|-----|------|
| **Base URL** | `http://54.116.0.21:8080/api` | 프로덕션 API 서버 |
| **Dev URL** | `http://localhost:8080/api` | 로컬 개발 서버 |
| **API 버전** | `v1` | 현재 API 버전 |
| **인증 방식** | `Bearer Token (JWT)` | JWT 기반 인증 |
| **Content-Type** | `application/json` | 기본 요청/응답 형식 |
| **문자 인코딩** | `UTF-8` | 문자 인코딩 |

### 환경변수 설정

```javascript
// .env.development
VITE_API_URL=http://localhost:8080/api

// .env.production
VITE_API_URL=http://54.116.0.21:8080/api

// .env.staging
VITE_API_URL=http://staging-api.telosform.shop/api
```

---

## 🔐 인증 및 보안

### JWT 토큰 인증

#### 토큰 구조
```javascript
// Authorization Header
Authorization: Bearer <JWT_TOKEN>

// JWT 토큰 예시
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

#### 토큰 관리
```javascript
// 토큰 저장
localStorage.setItem('token', response.data.accessToken);
localStorage.setItem('refreshToken', response.data.refreshToken);

// 토큰 자동 헤더 추가
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};
```

#### 토큰 갱신 플로우
```mermaid
sequenceDiagram
    participant FE as Frontend
    participant BE as Backend

    FE->>BE: API 요청 (만료된 토큰)
    BE->>FE: 401 Unauthorized
    FE->>BE: /auth/refresh (refreshToken)
    BE->>FE: 새로운 accessToken
    FE->>BE: 원본 API 재요청 (새 토큰)
    BE->>FE: 200 성공 응답
```

---

## 🔑 인증 관련 API

### 1. 회원가입

#### `POST /auth/signup`

**요청 예시:**
```javascript
const signupData = {
  email: "user@example.com",
  password: "SecurePassword123!",
  nickname: "사용자닉네임",
  agreeToTerms: true,
  agreeToPrivacy: true
};

const response = await fetch('/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(signupData)
});
```

**요청 스키마:**
```typescript
interface SignupRequest {
  email: string;           // 이메일 주소 (필수, 유효한 이메일 형식)
  password: string;        // 비밀번호 (필수, 8자 이상)
  nickname: string;        // 닉네임 (필수, 2-20자)
  agreeToTerms: boolean;   // 이용약관 동의 (필수, true)
  agreeToPrivacy: boolean; // 개인정보처리방침 동의 (필수, true)
}
```

**응답 예시:**
```json
{
  "success": true,
  "message": "회원가입이 완료되었습니다. 이메일 인증을 진행해주세요.",
  "data": {
    "userId": "user-uuid-12345",
    "email": "user@example.com",
    "nickname": "사용자닉네임",
    "status": "EMAIL_VERIFICATION_PENDING"
  }
}
```

**에러 응답:**
```json
{
  "success": false,
  "error": "DUPLICATE_EMAIL",
  "message": "이미 사용 중인 이메일입니다.",
  "details": {
    "field": "email",
    "code": "E001"
  }
}
```

### 2. 이메일 인증

#### `POST /auth/email/otp/request`

**요청 예시:**
```javascript
const otpRequest = {
  email: "user@example.com"
};
```

**응답 예시:**
```json
{
  "success": true,
  "message": "인증 코드가 이메일로 발송되었습니다.",
  "data": {
    "expiresIn": 300,  // 5분
    "attemptsLeft": 3
  }
}
```

#### `POST /auth/email/otp/verify`

**요청 예시:**
```javascript
const otpVerification = {
  email: "user@example.com",
  otpCode: "123456"
};
```

**응답 예시:**
```json
{
  "success": true,
  "message": "이메일 인증이 완료되었습니다.",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "refresh_token_here",
    "user": {
      "id": "user-uuid-12345",
      "email": "user@example.com",
      "nickname": "사용자닉네임",
      "status": "ACTIVE",
      "plan": "FREE"
    }
  }
}
```

### 3. 로그인

#### `POST /auth/login`

**요청 예시:**
```javascript
const loginData = {
  email: "user@example.com",
  password: "SecurePassword123!"
};
```

**응답 예시:**
```json
{
  "success": true,
  "message": "로그인에 성공했습니다.",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "refresh_token_here",
    "expiresIn": 3600,
    "user": {
      "id": "user-uuid-12345",
      "email": "user@example.com",
      "nickname": "사용자닉네임",
      "status": "ACTIVE",
      "plan": "FREE",
      "lastLoginAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### 4. 로그아웃

#### `POST /auth/logout`

**요청 예시:**
```javascript
const logoutData = {
  refreshToken: localStorage.getItem('refreshToken')
};
```

**응답 예시:**
```json
{
  "success": true,
  "message": "로그아웃되었습니다."
}
```

### 5. 토큰 갱신

#### `POST /auth/refresh`

**요청 예시:**
```javascript
const refreshData = {
  refreshToken: localStorage.getItem('refreshToken')
};
```

**응답 예시:**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_access_token_here",
    "refreshToken": "new_refresh_token_here",
    "expiresIn": 3600
  }
}
```

---

## 📝 템플릿 관련 API

### 1. 템플릿 생성

#### `POST /templates`

**요청 예시:**
```javascript
const templateData = {
  requestContent: "카페 오픈 기념 할인 이벤트 알림톡을 만들어주세요",
  targetCustomer: "20-30대 직장인",
  purpose: "프로모션"
};
```

**요청 스키마:**
```typescript
interface TemplateCreateRequest {
  requestContent: string;   // 사용자 요청 내용 (필수, 10-1000자)
  targetCustomer?: string;  // 타겟 고객 (선택, 100자 이하)
  purpose?: string;         // 목적 (선택, 50자 이하)
}
```

**응답 예시:**
```json
{
  "success": true,
  "message": "템플릿이 생성되었습니다.",
  "data": {
    "templateId": "template-uuid-12345",
    "title": "카페 오픈 기념 할인 이벤트",
    "content": "🎉 [카페명] 오픈 기념 특별 할인!\n\n📅 기간: 2024.01.15 ~ 01.31\n💰 할인: 전 메뉴 20% 할인\n📍 위치: [주소]\n\n✨ 첫 방문 고객 무료 음료 1잔!\n지금 바로 방문하세요~",
    "category": "PROMOTION",
    "status": "DRAFT",
    "variables": [
      {
        "name": "카페명",
        "placeholder": "[카페명]",
        "required": true
      },
      {
        "name": "주소",
        "placeholder": "[주소]",
        "required": true
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "aiMetadata": {
      "model": "gpt-4",
      "confidence": 0.92,
      "generationTime": 2.3
    }
  }
}
```

### 2. 내 템플릿 목록 조회

#### `GET /templates/my`

**요청 파라미터:**
```javascript
const params = {
  page: 1,           // 페이지 번호 (기본값: 1)
  size: 10,          // 페이지 크기 (기본값: 10, 최대: 100)
  status: 'ALL',     // 상태 필터 (ALL, DRAFT, APPROVED, REJECTED)
  category: '',      // 카테고리 필터 (PROMOTION, NOTICE, EVENT 등)
  sortBy: 'createdAt', // 정렬 기준 (createdAt, updatedAt, title)
  sortOrder: 'DESC'  // 정렬 순서 (ASC, DESC)
};

const queryString = new URLSearchParams(params).toString();
const response = await api.get(`/templates/my?${queryString}`);
```

**응답 예시:**
```json
{
  "success": true,
  "data": {
    "templates": [
      {
        "id": "template-uuid-12345",
        "title": "카페 오픈 기념 할인 이벤트",
        "content": "🎉 [카페명] 오픈 기념 특별 할인!...",
        "category": "PROMOTION",
        "status": "APPROVED",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T11:30:00Z",
        "approvedAt": "2024-01-15T14:20:00Z",
        "variables": ["카페명", "주소"],
        "usageCount": 15,
        "likeCount": 8
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 47,
      "hasNext": true,
      "hasPrevious": false
    }
  }
}
```

### 3. 템플릿 승인 요청

#### `POST /templates/{templateId}/approve-request`

**요청 예시:**
```javascript
const templateId = "template-uuid-12345";
const response = await api.post(`/templates/${templateId}/approve-request`);
```

**응답 예시:**
```json
{
  "success": true,
  "message": "승인 요청이 제출되었습니다.",
  "data": {
    "templateId": "template-uuid-12345",
    "status": "APPROVE_REQUESTED",
    "requestedAt": "2024-01-15T15:30:00Z",
    "estimatedReviewTime": "24-48시간"
  }
}
```

### 4. 템플릿 상세 조회

#### `GET /templates/{templateId}`

**응답 예시:**
```json
{
  "success": true,
  "data": {
    "id": "template-uuid-12345",
    "title": "카페 오픈 기념 할인 이벤트",
    "content": "🎉 [카페명] 오픈 기념 특별 할인!...",
    "description": "카페 오픈 이벤트를 위한 프로모션 템플릿",
    "category": "PROMOTION",
    "status": "APPROVED",
    "variables": [
      {
        "name": "카페명",
        "placeholder": "[카페명]",
        "required": true,
        "defaultValue": ""
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:30:00Z",
    "author": {
      "id": "user-uuid-67890",
      "nickname": "카페사장님"
    },
    "statistics": {
      "viewCount": 156,
      "usageCount": 23,
      "likeCount": 12,
      "shareCount": 5
    },
    "aiMetadata": {
      "model": "gpt-4",
      "confidence": 0.92,
      "tags": ["카페", "오픈", "할인", "이벤트"]
    }
  }
}
```

### 5. 전체 템플릿 목록 조회 (승인된 템플릿)

#### `GET /templates`

**요청 파라미터:**
```javascript
const params = {
  page: 1,
  size: 10,
  status: 'APPROVED',        // 필수: APPROVED, APPROVE_REQUESTED
  category: 'PROMOTION',     // 선택: 카테고리 필터
  search: '카페 할인',      // 선택: 검색어
  sortBy: 'popularity',      // 선택: createdAt, popularity, usageCount
  sortOrder: 'DESC'
};
```

**응답 예시:**
```json
{
  "success": true,
  "data": {
    "templates": [
      {
        "id": "template-uuid-12345",
        "title": "카페 오픈 기념 할인 이벤트",
        "preview": "🎉 [카페명] 오픈 기념 특별 할인!...",
        "category": "PROMOTION",
        "author": {
          "nickname": "카페사장님"
        },
        "statistics": {
          "usageCount": 23,
          "likeCount": 12
        },
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 95,
      "hasNext": true,
      "hasPrevious": false
    },
    "aggregations": {
      "categories": [
        {
          "category": "PROMOTION",
          "count": 45
        },
        {
          "category": "NOTICE",
          "count": 30
        }
      ]
    }
  }
}
```

---

## 👤 사용자 관련 API

### 1. 사용자 프로필 조회

#### `GET /users/profile`

**응답 예시:**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid-12345",
    "email": "user@example.com",
    "nickname": "사용자닉네임",
    "plan": "PRO",
    "status": "ACTIVE",
    "createdAt": "2024-01-01T00:00:00Z",
    "lastLoginAt": "2024-01-15T10:30:00Z",
    "statistics": {
      "templatesCreated": 25,
      "templatesApproved": 18,
      "totalUsage": 150
    },
    "subscription": {
      "plan": "PRO",
      "startDate": "2024-01-01T00:00:00Z",
      "endDate": "2024-12-31T23:59:59Z",
      "autoRenewal": true
    }
  }
}
```

### 2. 사용자 프로필 수정

#### `PUT /users/profile`

**요청 예시:**
```javascript
const profileData = {
  nickname: "새로운닉네임",
  bio: "AI 템플릿 전문가",
  preferences: {
    language: "ko",
    notifications: {
      email: true,
      push: false
    }
  }
};
```

**응답 예시:**
```json
{
  "success": true,
  "message": "프로필이 업데이트되었습니다.",
  "data": {
    "id": "user-uuid-12345",
    "nickname": "새로운닉네임",
    "bio": "AI 템플릿 전문가",
    "updatedAt": "2024-01-15T15:30:00Z"
  }
}
```

---

## 📊 통계 및 분석 API

### 1. 대시보드 통계

#### `GET /analytics/dashboard`

**응답 예시:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalTemplates": 25,
      "approvedTemplates": 18,
      "pendingApproval": 3,
      "totalUsage": 150,
      "thisMonthUsage": 45
    },
    "recentActivity": [
      {
        "type": "TEMPLATE_CREATED",
        "templateId": "template-uuid-12345",
        "templateTitle": "카페 오픈 이벤트",
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ],
    "popularTemplates": [
      {
        "id": "template-uuid-12345",
        "title": "카페 오픈 기념 할인 이벤트",
        "usageCount": 23,
        "category": "PROMOTION"
      }
    ],
    "categoryDistribution": [
      {
        "category": "PROMOTION",
        "count": 12,
        "percentage": 48
      },
      {
        "category": "NOTICE",
        "count": 8,
        "percentage": 32
      }
    ]
  }
}
```

### 2. 템플릿 사용 통계

#### `GET /analytics/templates/{templateId}/usage`

**응답 예시:**
```json
{
  "success": true,
  "data": {
    "templateId": "template-uuid-12345",
    "totalUsage": 156,
    "dailyUsage": [
      {
        "date": "2024-01-15",
        "count": 12
      },
      {
        "date": "2024-01-14",
        "count": 8
      }
    ],
    "deviceBreakdown": {
      "mobile": 89,
      "desktop": 67
    },
    "timeDistribution": {
      "morning": 45,
      "afternoon": 67,
      "evening": 34,
      "night": 10
    }
  }
}
```

---

## ⚠️ 에러 처리 및 상태 코드

### HTTP 상태 코드

| 상태 코드 | 의미 | 설명 |
|-----------|------|------|
| **200** | OK | 요청 성공 |
| **201** | Created | 리소스 생성 성공 |
| **400** | Bad Request | 잘못된 요청 (유효성 검증 실패) |
| **401** | Unauthorized | 인증 실패 (토큰 없음/만료) |
| **403** | Forbidden | 권한 없음 |
| **404** | Not Found | 리소스 없음 |
| **409** | Conflict | 중복 리소스 (이메일 중복 등) |
| **422** | Unprocessable Entity | 비즈니스 로직 오류 |
| **429** | Too Many Requests | 요청 제한 초과 |
| **500** | Internal Server Error | 서버 내부 오류 |

### 에러 응답 형식

#### 기본 에러 형식
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "사용자 친화적 에러 메시지",
  "details": {
    "field": "문제가 발생한 필드명",
    "code": "상세 에러 코드",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### 유효성 검증 에러
```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "입력 데이터가 올바르지 않습니다.",
  "details": {
    "errors": [
      {
        "field": "email",
        "message": "유효한 이메일 주소를 입력해주세요.",
        "code": "INVALID_EMAIL_FORMAT"
      },
      {
        "field": "password",
        "message": "비밀번호는 8자 이상이어야 합니다.",
        "code": "PASSWORD_TOO_SHORT"
      }
    ]
  }
}
```

### 주요 에러 코드

#### 인증 관련 에러
```javascript
const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "이메일 또는 비밀번호가 올바르지 않습니다.",
  TOKEN_EXPIRED: "인증 토큰이 만료되었습니다. 다시 로그인해주세요.",
  TOKEN_INVALID: "유효하지 않은 토큰입니다.",
  EMAIL_NOT_VERIFIED: "이메일 인증이 필요합니다.",
  ACCOUNT_LOCKED: "계정이 잠겨있습니다. 관리자에게 문의하세요.",
  DUPLICATE_EMAIL: "이미 사용 중인 이메일입니다.",
  WEAK_PASSWORD: "비밀번호가 너무 약합니다.",
  OTP_EXPIRED: "인증 코드가 만료되었습니다.",
  OTP_INVALID: "인증 코드가 올바르지 않습니다.",
  OTP_ATTEMPTS_EXCEEDED: "인증 시도 횟수를 초과했습니다."
};
```

#### 템플릿 관련 에러
```javascript
const TEMPLATE_ERRORS = {
  TEMPLATE_NOT_FOUND: "템플릿을 찾을 수 없습니다.",
  TEMPLATE_ACCESS_DENIED: "템플릿에 접근할 권한이 없습니다.",
  TEMPLATE_GENERATION_FAILED: "템플릿 생성에 실패했습니다.",
  CONTENT_TOO_LONG: "요청 내용이 너무 깁니다. (최대 1000자)",
  CONTENT_TOO_SHORT: "요청 내용이 너무 짧습니다. (최소 10자)",
  ALREADY_APPROVED: "이미 승인된 템플릿입니다.",
  APPROVAL_IN_PROGRESS: "승인 검토가 진행 중입니다.",
  DAILY_LIMIT_EXCEEDED: "일일 템플릿 생성 한도를 초과했습니다.",
  INAPPROPRIATE_CONTENT: "부적절한 내용이 포함되어 있습니다."
};
```

---

## 🔧 클라이언트 사이드 구현

### API 클라이언트 클래스

```javascript
// utils/apiClient.js
class APIClient {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // 토큰 포함 헤더 생성
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      ...this.defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // 기본 요청 메서드
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // 401 에러 시 자동 로그아웃
      if (response.status === 401) {
        this.handleUnauthorized();
        return null;
      }

      return await this.handleResponse(response);
    } catch (error) {
      throw new APIError('NETWORK_ERROR', '네트워크 오류가 발생했습니다.');
    }
  }

  // 응답 처리
  async handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
      throw new APIError(
        data.error || 'UNKNOWN_ERROR',
        data.message || '알 수 없는 오류가 발생했습니다.',
        data.details
      );
    }

    return data;
  }

  // 401 에러 처리
  handleUnauthorized() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  // HTTP 메서드들
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// 커스텀 에러 클래스
class APIError extends Error {
  constructor(code, message, details = null) {
    super(message);
    this.name = 'APIError';
    this.code = code;
    this.details = details;
  }
}

export const apiClient = new APIClient();
export { APIError };
```

### React Hook 활용

```javascript
// hooks/useAPI.js
import { useState, useEffect, useCallback } from 'react';
import { apiClient, APIError } from '@/utils/apiClient';

export const useAPI = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (customEndpoint = endpoint, customOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiClient.request(customEndpoint, {
        ...options,
        ...customOptions
      });
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  // 자동 실행 옵션
  useEffect(() => {
    if (options.immediate !== false) {
      execute();
    }
  }, [execute, options.immediate]);

  return {
    data,
    loading,
    error,
    execute,
    refetch: () => execute()
  };
};

// 템플릿 관련 Hook
export const useTemplates = (params = {}) => {
  return useAPI('/templates/my', {
    method: 'GET',
    immediate: true
  });
};

export const useTemplateGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateTemplate = useCallback(async (requestData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiClient.post('/templates', requestData);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    generateTemplate,
    loading,
    error
  };
};
```

---

## 🧪 API 테스팅

### 개발 도구

#### 1. Postman Collection

```json
{
  "info": {
    "name": "AI 알림톡 생성기 API",
    "description": "API 테스트를 위한 Postman 컬렉션"
  },
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{access_token}}",
        "type": "string"
      }
    ]
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://54.116.0.21:8080/api"
    },
    {
      "key": "access_token",
      "value": ""
    }
  ]
}
```

#### 2. cURL 명령어 예시

```bash
# 회원가입
curl -X POST "http://54.116.0.21:8080/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!",
    "nickname": "테스트사용자",
    "agreeToTerms": true,
    "agreeToPrivacy": true
  }'

# 로그인
curl -X POST "http://54.116.0.21:8080/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'

# 템플릿 생성 (인증 필요)
curl -X POST "http://54.116.0.21:8080/api/templates" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "requestContent": "카페 오픈 이벤트 알림톡을 만들어주세요",
    "targetCustomer": "20-30대",
    "purpose": "프로모션"
  }'
```

#### 3. Jest를 활용한 API 테스트

```javascript
// tests/api/auth.test.js
import { apiClient } from '@/utils/apiClient';

describe('Authentication API', () => {
  test('회원가입 성공', async () => {
    const signupData = {
      email: 'test@example.com',
      password: 'TestPassword123!',
      nickname: '테스트사용자',
      agreeToTerms: true,
      agreeToPrivacy: true
    };

    const response = await apiClient.post('/auth/signup', signupData);

    expect(response.success).toBe(true);
    expect(response.data.email).toBe(signupData.email);
    expect(response.data.nickname).toBe(signupData.nickname);
  });

  test('로그인 성공', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'TestPassword123!'
    };

    const response = await apiClient.post('/auth/login', loginData);

    expect(response.success).toBe(true);
    expect(response.data.accessToken).toBeDefined();
    expect(response.data.user.email).toBe(loginData.email);
  });

  test('잘못된 비밀번호로 로그인 실패', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'WrongPassword'
    };

    await expect(
      apiClient.post('/auth/login', loginData)
    ).rejects.toThrow('이메일 또는 비밀번호가 올바르지 않습니다.');
  });
});
```

---

## 📈 API 성능 및 모니터링

### 성능 지표

| 메트릭 | 목표값 | 현재값 | 모니터링 방법 |
|--------|--------|--------|---------------|
| **응답 시간** | < 200ms | 150ms | New Relic |
| **처리량** | > 1000 RPS | 800 RPS | Grafana |
| **가용성** | > 99.9% | 99.95% | Pingdom |
| **에러율** | < 0.1% | 0.03% | Sentry |

### 모니터링 대시보드

```javascript
// utils/apiMonitoring.js
class APIMonitoring {
  constructor() {
    this.metrics = new Map();
  }

  // API 호출 시간 측정
  startTimer(endpoint) {
    this.metrics.set(endpoint, {
      startTime: performance.now(),
      endpoint
    });
  }

  endTimer(endpoint, success) {
    const metric = this.metrics.get(endpoint);
    if (metric) {
      const duration = performance.now() - metric.startTime;

      // 메트릭 전송
      this.sendMetrics({
        endpoint,
        duration,
        success,
        timestamp: Date.now()
      });

      this.metrics.delete(endpoint);
    }
  }

  sendMetrics(data) {
    // Analytics 서비스로 메트릭 전송
    if (window.gtag) {
      window.gtag('event', 'api_call', {
        event_category: 'API',
        event_label: data.endpoint,
        value: Math.round(data.duration),
        custom_map: {
          success: data.success
        }
      });
    }
  }
}

export const apiMonitoring = new APIMonitoring();
```

---

## 🔮 향후 API 확장 계획

### 예정된 API 추가

#### 1. 고급 검색 API
```javascript
// GET /templates/search
{
  "query": "카페 할인",
  "filters": {
    "category": ["PROMOTION", "EVENT"],
    "dateRange": {
      "start": "2024-01-01",
      "end": "2024-01-31"
    },
    "tags": ["카페", "할인"],
    "minUsage": 10
  },
  "sort": {
    "field": "relevance",
    "order": "DESC"
  },
  "pagination": {
    "page": 1,
    "size": 20
  }
}
```

#### 2. 실시간 협업 API
```javascript
// WebSocket 연결
ws://api.telosform.shop/ws/template/{templateId}

// 메시지 형식
{
  "type": "EDIT_OPERATION",
  "data": {
    "operation": "INSERT",
    "position": 125,
    "content": "새로 추가된 텍스트",
    "userId": "user-uuid-12345"
  }
}
```

#### 3. AI 개인화 API
```javascript
// POST /ai/personalize
{
  "userId": "user-uuid-12345",
  "prompt": "카페 프로모션 템플릿을 만들어주세요",
  "context": {
    "previousTemplates": ["template-uuid-123", "template-uuid-456"],
    "preferences": {
      "tone": "친근함",
      "length": "간결함"
    }
  }
}
```

---

## 💡 API 사용 모범 사례

### 1. 인증 토큰 관리
- 토큰은 안전한 저장소에 보관 (httpOnly 쿠키 권장)
- 토큰 만료 전 자동 갱신 구현
- 로그아웃 시 토큰 완전 삭제

### 2. 에러 처리
- 모든 API 호출에 try-catch 구문 사용
- 사용자 친화적 에러 메시지 표시
- 네트워크 오류 시 재시도 로직 구현

### 3. 성능 최적화
- 불필요한 API 호출 방지 (디바운싱)
- 응답 데이터 캐싱 활용
- 페이지네이션을 통한 대용량 데이터 처리

### 4. 보안 고려사항
- HTTPS 통신 필수
- 민감한 데이터는 로그에 기록하지 않음
- API 키나 토큰을 클라이언트 코드에 하드코딩 금지

---

## 📞 지원 및 문의

### 개발팀 연락처
- **백엔드 API 관련**: backend-team@telosform.shop
- **프론트엔드 연동**: frontend-team@telosform.shop
- **긴급 장애 신고**: emergency@telosform.shop

### API 변경 공지
- **변경 사항 공지**: 최소 7일 전 사전 공지
- **Breaking Changes**: 최소 30일 전 공지
- **공지 채널**: Slack #api-updates, 이메일

이 API 문서는 지속적으로 업데이트되며, 모든 변경사항은 버전 관리를 통해 추적됩니다. 개발 과정에서 궁금한 점이나 개선 사항이 있으면 언제든 개발팀에 문의해 주세요.