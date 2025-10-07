# 관리자 페이지 설계 및 구현 방안 문서

## 📋 프로젝트 개요

### 현재 상황
- **서비스**: 카카오톡 알림톡 템플릿 생성기
- **사용자 기능**: 템플릿 생성, 채팅 기록, 사용자 인증
- **제약사항**: 관리자 API 미구현 (백엔드 작업 대기 중)
- **목표**: 관리자가 시스템을 효율적으로 관리할 수 있는 웹 인터페이스 구축

## 🎯 관리자 페이지 필요 기능 분석

### 1. 핵심 관리 영역

#### 👥 사용자 관리
- **사용자 목록 조회**: 가입 사용자 전체 현황
- **사용자 상세 정보**: 가입일, 마지막 접속, 사용량 통계
- **계정 상태 관리**: 활성화/비활성화, 이용 제한
- **권한 관리**: 일반 사용자 ↔ 관리자 권한 부여

#### 📄 템플릿 관리
- **템플릿 승인/거부**: 사용자가 생성한 템플릿 검토
- **템플릿 상태 관리**: 대기/승인/거부/수정요청
- **템플릿 카테고리 관리**: 분류 체계 설정
- **불량 콘텐츠 관리**: 부적절한 템플릿 필터링

#### 📊 통계 및 모니터링
- **사용량 통계**: 일/주/월별 템플릿 생성 현황
- **사용자 활동**: 활성 사용자, 신규 가입, 이탈률
- **시스템 성능**: 응답 시간, 오류율, 서버 상태
- **비즈니스 지표**: 수익, 전환율, 사용 패턴

#### ⚙️ 시스템 설정
- **서비스 공지사항**: 점검, 업데이트, 정책 변경
- **요금제 관리**: 플랜별 제한사항, 가격 정책
- **카카오 연동 설정**: API 키, 발송 한도 관리
- **보안 설정**: 접속 제한, 인증 정책

### 2. 우선순위별 기능 분류

#### 🔴 높은 우선순위 (Phase 1)
1. **관리자 인증 시스템** - 관리자 로그인/권한 체크
2. **템플릿 승인 관리** - 대기 중인 템플릿 검토/승인
3. **기본 통계 대시보드** - 핵심 지표 모니터링
4. **사용자 목록 조회** - 사용자 현황 파악

#### 🟡 중간 우선순위 (Phase 2)
1. **상세 사용자 관리** - 개별 사용자 정보/제재
2. **고급 통계 분석** - 차트, 필터링, 기간별 분석
3. **시스템 설정 관리** - 공지사항, 정책 설정
4. **템플릿 카테고리 관리** - 분류 체계 구축

#### 🟢 낮은 우선순위 (Phase 3)
1. **실시간 모니터링** - 라이브 대시보드
2. **자동화 도구** - 규칙 기반 자동 승인/거부
3. **리포트 생성** - PDF, Excel 내보내기
4. **고급 보안 기능** - 접속 로그, 이상 탐지

## 🎨 UI/UX 설계 방안

### 관리자 페이지 레이아웃 구조

#### 옵션 1: 별도 관리자 사이트 (권장) ⭐
```
📱 /admin/* 경로로 완전 독립된 관리자 인터페이스
```

**장점**:
- 일반 사용자와 완전 분리된 환경
- 관리자 전용 UI/UX 최적화 가능
- 보안성 높음 (별도 접근 경로)
- 확장성 우수

**단점**:
- 개발 리소스 더 필요
- 별도 라우팅 설정 필요

#### 옵션 2: 기존 사이트 내 관리자 섹션
```
📱 기존 사이드바에 관리자 메뉴 추가
```

**장점**:
- 빠른 구현 가능
- 기존 컴포넌트 재사용
- 일관된 디자인 시스템

**단점**:
- 일반 사용자 UI와 혼재
- 권한 관리 복잡
- 관리자 기능 제약

### 권장 레이아웃: 별도 관리자 사이트

```
┌─────────────────────────────────────────────────────┐
│ 🔧 JOBER 관리자                    👤 admin@jober.com │
├─────────────────────────────────────────────────────┤
│ 📊 대시보드   👥 사용자   📄 템플릿   ⚙️ 설정   📈 통계 │
├─────────────────────────────────────────────────────┤
│                                                     │
│                 메인 콘텐츠 영역                      │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   KPI 카드   │  │   KPI 카드   │  │   KPI 카드   │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────────┐ │
│  │              차트 및 통계                        │ │
│  └─────────────────────────────────────────────────┘ │
│                                                     │
│  ┌─────────────────────────────────────────────────┐ │
│  │              최근 활동 피드                      │ │
│  └─────────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 🛠 기술 구현 방안

### 1. 라우팅 구조

#### React Router 설정
```javascript
// App.jsx에 관리자 라우트 추가
<Routes>
  {/* 기존 일반 사용자 라우트 */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/dashboard" element={<DashboardPage />} />

  {/* 관리자 라우트 */}
  <Route path="/admin/*" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="users" element={<AdminUsers />} />
    <Route path="templates" element={<AdminTemplates />} />
    <Route path="settings" element={<AdminSettings />} />
    <Route path="analytics" element={<AdminAnalytics />} />
  </Route>
</Routes>
```

#### 관리자 권한 체크
```javascript
// AdminLayout.jsx - 관리자 권한 검증
const AdminLayout = () => {
  const { user } = useAuth();

  if (!user?.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <AdminLayoutContent />;
};
```

### 2. 데이터 관리 전략 (백엔드 API 없는 상황)

#### Phase 1: Mock 데이터 활용
```javascript
// src/data/mock/adminData.js
export const mockUsers = [
  {
    id: 1,
    email: "user1@example.com",
    name: "김사용자",
    joinDate: "2024-01-15",
    lastLogin: "2024-09-28",
    status: "active",
    planType: "pro",
    templatesCreated: 25
  },
  // ... 더 많은 mock 데이터
];

export const mockTemplates = [
  {
    id: 1,
    title: "이벤트 알림 템플릿",
    creator: "user1@example.com",
    status: "pending", // pending, approved, rejected
    createdAt: "2024-09-27",
    category: "marketing"
  },
  // ... 더 많은 mock 데이터
];
```

#### Phase 2: LocalStorage 활용
```javascript
// src/utils/adminStorage.js
export const adminStorage = {
  // 사용자 관리
  getUsers: () => JSON.parse(localStorage.getItem('admin_users') || '[]'),
  updateUserStatus: (userId, status) => {
    // localStorage에서 사용자 상태 업데이트
  },

  // 템플릿 관리
  getTemplates: () => JSON.parse(localStorage.getItem('admin_templates') || '[]'),
  approveTemplate: (templateId) => {
    // 템플릿 승인 처리
  },

  // 통계 데이터
  getStats: () => {
    // 계산된 통계 반환
  }
};
```

#### Phase 3: 실제 API 연동 대비
```javascript
// src/utils/adminApi.js
export const adminApi = {
  // 실제 API 연동을 위한 인터페이스 정의
  getUsers: async (page, limit) => {
    // 현재는 mock 데이터, 나중에 실제 API 호출로 교체
    return mockUsers;
  },

  updateUser: async (userId, updates) => {
    // mock → 실제 API 교체 예정
  }
};
```

### 3. 컴포넌트 구조

```
src/
├── components/
│   └── admin/
│       ├── layout/
│       │   ├── AdminLayout.jsx      # 관리자 레이아웃
│       │   ├── AdminSidebar.jsx     # 관리자 사이드바
│       │   └── AdminHeader.jsx      # 관리자 헤더
│       ├── dashboard/
│       │   ├── AdminDashboard.jsx   # 대시보드 메인
│       │   ├── KPICards.jsx         # 핵심 지표 카드
│       │   └── ActivityFeed.jsx     # 최근 활동 피드
│       ├── users/
│       │   ├── AdminUsers.jsx       # 사용자 관리 페이지
│       │   ├── UserTable.jsx        # 사용자 목록 테이블
│       │   └── UserDetail.jsx       # 사용자 상세 정보
│       ├── templates/
│       │   ├── AdminTemplates.jsx   # 템플릿 관리 페이지
│       │   ├── TemplateReview.jsx   # 템플릿 검토 컴포넌트
│       │   └── TemplateStats.jsx    # 템플릿 통계
│       └── analytics/
│           ├── AdminAnalytics.jsx   # 통계 분석 페이지
│           ├── UsageChart.jsx       # 사용량 차트
│           └── TrendAnalysis.jsx    # 트렌드 분석
├── pages/
│   └── admin/                       # 관리자 페이지들
└── hooks/
    └── admin/
        ├── useAdminAuth.js         # 관리자 인증 훅
        ├── useAdminData.js         # 관리자 데이터 훅
        └── useAdminStats.js        # 통계 데이터 훅
```

## 📊 대시보드 설계

### 메인 대시보드 구성요소

#### KPI 카드 영역
```javascript
const kpiCards = [
  {
    title: "총 사용자",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: "👥"
  },
  {
    title: "대기 중인 템플릿",
    value: "23",
    change: "+5",
    trend: "up",
    icon: "⏳",
    urgent: true
  },
  {
    title: "일일 활성 사용자",
    value: "456",
    change: "-2%",
    trend: "down",
    icon: "📈"
  },
  {
    title: "월 수익",
    value: "₩2,340,000",
    change: "+18%",
    trend: "up",
    icon: "💰"
  }
];
```

#### 차트 영역
- **사용자 증가 추이**: 일/주/월별 신규 가입자
- **템플릿 생성 현황**: 승인/거부/대기 현황
- **사용량 분석**: 시간대별, 요일별 활동 패턴
- **수익 분석**: 플랜별 수익 구성

#### 최근 활동 피드
- 새로운 사용자 가입
- 템플릿 승인 요청
- 시스템 알림
- 오류 발생 현황

## ⚙️ 권한 관리 시스템

### 관리자 등급 체계

#### Super Admin (최고 관리자)
- 모든 기능 접근 가능
- 다른 관리자 권한 부여/회수
- 시스템 설정 변경
- 민감한 데이터 접근

#### Admin (일반 관리자)
- 일상적인 관리 업무
- 템플릿 승인/거부
- 사용자 관리 (제한적)
- 통계 조회

#### Moderator (운영자)
- 콘텐츠 검토
- 신고 처리
- 기본 통계 조회

### 권한 체크 구현
```javascript
// src/hooks/admin/useAdminAuth.js
export const useAdminAuth = () => {
  const { user } = useAuth();

  const hasPermission = (permission) => {
    const adminLevel = user?.adminLevel; // 'super', 'admin', 'moderator'
    const permissions = {
      super: ['*'], // 모든 권한
      admin: ['users.read', 'users.update', 'templates.*', 'stats.read'],
      moderator: ['templates.review', 'stats.read']
    };

    return permissions[adminLevel]?.includes(permission) ||
           permissions[adminLevel]?.includes('*');
  };

  return { hasPermission, isAdmin: !!user?.adminLevel };
};
```

## 🚀 단계별 구현 계획

### Phase 1: 기본 관리자 인터페이스 (1-2주)

#### Week 1: 기반 구조
- [ ] 관리자 라우팅 설정
- [ ] AdminLayout, AdminSidebar 컴포넌트
- [ ] 관리자 인증 시스템
- [ ] Mock 데이터 구조 설계

#### Week 2: 핵심 기능
- [ ] 관리자 대시보드 (KPI 카드)
- [ ] 템플릿 승인 관리 페이지
- [ ] 기본 사용자 목록 조회
- [ ] 간단한 통계 화면

### Phase 2: 고급 관리 기능 (2-3주)

#### Week 3-4: 상세 관리 기능
- [ ] 사용자 상세 정보 및 상태 관리
- [ ] 템플릿 상세 검토 및 피드백 시스템
- [ ] 고급 통계 차트 (Chart.js 또는 Recharts)
- [ ] 검색 및 필터링 기능

#### Week 5: 시스템 관리
- [ ] 공지사항 관리 시스템
- [ ] 시스템 설정 페이지
- [ ] 활동 로그 조회
- [ ] 기본 리포트 기능

### Phase 3: 고도화 및 최적화 (2-3주)

#### Week 6-7: 고급 기능
- [ ] 실시간 대시보드 (WebSocket 고려)
- [ ] 자동화 규칙 설정
- [ ] 고급 분석 도구
- [ ] 모바일 반응형 최적화

#### Week 8: 연동 대비
- [ ] API 연동 인터페이스 준비
- [ ] 데이터 마이그레이션 도구
- [ ] 성능 최적화
- [ ] 보안 강화

## 🎨 디자인 시스템 활용

### 기존 컴포넌트 재사용
```javascript
// 기존 프로젝트의 디자인 시스템 활용
import { Button, Input, Card, Table } from '@/components/ui';

// 관리자 전용 컴포넌트에 기존 스타일 적용
const AdminCard = styled(Card)`
  /* 관리자 테마 커스터마이징 */
  border-left: 4px solid #dc2626; /* 관리자 컬러 */
`;
```

### 관리자 전용 테마
```css
/* 관리자 페이지 전용 CSS 변수 */
:root {
  --admin-primary: #dc2626;    /* 빨간색 계열 */
  --admin-secondary: #374151;  /* 어두운 회색 */
  --admin-success: #059669;    /* 승인 상태 */
  --admin-warning: #d97706;    /* 대기 상태 */
  --admin-danger: #dc2626;     /* 거부/위험 */
}
```

## 💡 추가 고려사항

### 보안 측면
- **접근 제한**: IP 화이트리스트, VPN 필수
- **세션 관리**: 짧은 세션 타임아웃, 강제 로그아웃
- **감사 로그**: 모든 관리자 행동 기록
- **2차 인증**: SMS, OTP 등 추가 인증

### 성능 최적화
- **가상화**: 대용량 데이터 테이블 가상 스크롤
- **페이지네이션**: 서버사이드 페이징
- **캐싱**: React Query로 데이터 캐싱
- **지연 로딩**: 탭별 lazy loading

### 접근성 (a11y)
- **키보드 네비게이션**: 모든 기능 키보드 접근 가능
- **스크린 리더**: ARIA 라벨 적용
- **색상 대비**: WCAG 2.1 AA 준수
- **포커스 관리**: 명확한 포커스 인디케이터

## 🎯 결론 및 권장사항

### 추천 구현 방식: 별도 관리자 사이트

**이유**:
1. **확장성**: 향후 복잡한 관리 기능 추가에 유리
2. **보안성**: 일반 사용자와 완전 분리
3. **전문성**: 관리자에 최적화된 UI/UX 제공
4. **유지보수**: 독립적인 개발 및 배포 가능

### 우선 구현 기능
1. **관리자 인증 시스템** (필수)
2. **템플릿 승인 관리** (비즈니스 핵심)
3. **기본 대시보드** (현황 파악)
4. **사용자 목록 조회** (고객 관리)

### 기술 스택 제안
- **상태 관리**: Zustand (기존 사용 중)
- **차트**: Recharts (React 최적화)
- **테이블**: TanStack Table (가상화 지원)
- **폼**: React Hook Form (성능 최적화)
- **날짜**: date-fns (가벼움)

**예상 개발 기간**: 6-8주 (Phase 1-2 기준)
**필요 개발자**: 1-2명 (프론트엔드)

이 문서를 기반으로 어떤 방향으로 진행할지 결정해주세요! 🚀