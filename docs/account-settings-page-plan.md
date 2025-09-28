# 계정 설정 페이지 개발 계획서

## 📋 개요

사용자가 개인 계정 정보와 시스템 설정을 관리할 수 있는 전용 페이지를 개발합니다.

## 🎯 목표

- 사용자 계정 정보 관리 기능 제공
- 보안 설정 및 개인정보 보호 옵션
- 직관적이고 접근성 있는 UI/UX
- 기존 시스템과의 원활한 통합

## 📍 라우팅 및 접근

### URL 구조
- **경로**: `/settings`
- **보호 여부**: 인증된 사용자만 접근 가능 (ProtectedRoute 사용)
- **네비게이션**:
  - GeneratorPageV2 사이드바 설정 버튼에서 접근
  - 직접 URL 접근 가능

### 접근 경로 수정
```javascript
// GeneratorPageV2.jsx:336 현재
<a href="#" className="flex items-center...">

// 변경 후
<button onClick={() => navigate('/settings')} className="flex items-center...">
```

## 🏗️ 페이지 구조

### 레이아웃
```
┌─────────────────────────────────────────┐
│ Header (뒷가기 버튼, 제목)                │
├─────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────────────┐ │
│ │ 사이드 메뉴  │ │  메인 설정 영역     │ │
│ │             │ │                     │ │
│ │ - 프로필    │ │  선택된 설정 섹션   │ │
│ │ - 보안      │ │  내용 표시          │ │
│ │ - 알림      │ │                     │ │
│ │ - 계정      │ │                     │ │
│ └─────────────┘ └─────────────────────┘ │
└─────────────────────────────────────────┘
```

### 컴포넌트 구조
```
SettingsPage.jsx (메인 페이지)
├── SettingsSidebar.jsx (왼쪽 메뉴)
├── ProfileSettings.jsx (프로필 설정)
├── SecuritySettings.jsx (보안 설정)
├── NotificationSettings.jsx (알림 설정)
└── AccountSettings.jsx (계정 관리)
```

## ⚙️ 설정 섹션별 기능

### 1. 프로필 설정 (Profile Settings)
**기능 목록:**
- ✅ 프로필 사진 업로드/변경
- ✅ 이름 변경
- ✅ 이메일 주소 변경 (인증 필요)
- ✅ 전화번호 설정 (선택사항)
- ✅ 소속/회사명 설정 (선택사항)

**API 연동:**
```javascript
// 예상 API 엔드포인트
PUT /api/user/profile
POST /api/user/profile/avatar
POST /api/user/email/verify
```

### 2. 보안 설정 (Security Settings)
**기능 목록:**
- ✅ 비밀번호 변경
- ✅ 로그인 기록 조회
- ✅ 활성 세션 관리
- ⚠️ 2단계 인증 설정 (향후 확장)
- ⚠️ 로그인 알림 설정

**보안 고려사항:**
- 비밀번호 변경 시 현재 비밀번호 확인 필수
- 민감한 작업 시 재인증 요구
- 세션 만료 시 자동 로그아웃

### 3. 알림 설정 (Notification Settings)
**기능 목록:**
- ✅ 템플릿 승인 알림 (이메일/브라우저)
- ✅ 시스템 공지사항 알림
- ✅ 마케팅 메일 수신 동의
- ✅ 알림 시간대 설정

**알림 유형:**
```javascript
const notificationTypes = {
  template_approved: "템플릿 승인 완료",
  template_rejected: "템플릿 승인 거부",
  system_notice: "시스템 공지사항",
  marketing: "마케팅 정보"
};
```

### 4. 계정 관리 (Account Settings)
**기능 목록:**
- ✅ 언어 설정 (한국어/English)
- ✅ 시간대 설정
- ✅ 데이터 다운로드 (GDPR 준수)
- ⚠️ 계정 비활성화
- 🚨 계정 삭제 (신중한 프로세스 필요)

**데이터 관리:**
- 템플릿 데이터 내보내기 (JSON/CSV)
- 활동 기록 다운로드
- 개인정보 처리방침 동의 현황

## 🎨 UI/UX 디자인 가이드

### 디자인 시스템
- **색상**: 기존 Tailwind 색상 팔레트 활용
- **폰트**: 기존 시스템과 동일한 폰트 스택
- **아이콘**: 기존 프로젝트에서 사용 중인 SVG 아이콘 스타일

### 반응형 디자인
```css
/* 데스크톱 (1024px+) */
- 사이드바 + 메인 영역 (2단 레이아웃)

/* 태블릿 (768px ~ 1023px) */
- 사이드바 축소 또는 상단 탭 전환

/* 모바일 (767px 이하) */
- 풀스크린 단일 섹션
- 하단 탭 네비게이션
```

### 접근성 (a11y)
- ✅ 키보드 네비게이션 지원
- ✅ 스크린 리더 호환
- ✅ 색상 대비 WCAG 준수
- ✅ Focus 표시 명확화

## 🔧 기술적 구현 세부사항

### 상태 관리
```javascript
// Zustand 스토어 확장
const useSettingsStore = create((set) => ({
  currentSection: 'profile',
  setCurrentSection: (section) => set({ currentSection: section }),

  // 사용자 프로필 상태
  profile: {
    name: '',
    email: '',
    phone: '',
    company: ''
  },
  updateProfile: (profile) => set({ profile }),

  // 알림 설정 상태
  notifications: {
    templateApproval: true,
    systemNotice: true,
    marketing: false
  },
  updateNotifications: (notifications) => set({ notifications })
}));
```

### 폼 유효성 검사
```javascript
// 유효성 검사 규칙
const validationRules = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
  phone: /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/
};
```

### API 에러 핸들링
```javascript
// 통일된 에러 처리
const handleApiError = (error) => {
  const errorMessage = error.response?.data?.message || '오류가 발생했습니다.';
  toast.error(errorMessage);

  // 인증 에러 시 로그인 페이지로 리다이렉트
  if (error.response?.status === 401) {
    logout();
    navigate('/login');
  }
};
```

## 📁 파일 구조

```
src/
├── pages/
│   └── SettingsPage.jsx              # 메인 설정 페이지
├── components/
│   └── settings/                     # 설정 관련 컴포넌트
│       ├── SettingsSidebar.jsx       # 사이드바 메뉴
│       ├── ProfileSettings.jsx       # 프로필 설정
│       ├── SecuritySettings.jsx      # 보안 설정
│       ├── NotificationSettings.jsx  # 알림 설정
│       ├── AccountSettings.jsx       # 계정 관리
│       └── SettingsLayout.jsx        # 공통 레이아웃
├── hooks/
│   ├── useSettings.js                # 설정 관련 훅
│   └── useProfileUpdate.js           # 프로필 업데이트 훅
└── utils/
    └── settingsApi.js                # 설정 관련 API 함수
```

## 🚀 개발 단계별 계획

### Phase 1: 기본 구조 (우선순위: 높음)
- [ ] SettingsPage.jsx 기본 레이아웃 생성
- [ ] SettingsSidebar.jsx 네비게이션 구현
- [ ] 라우팅 설정 (/settings)
- [ ] GeneratorPageV2에서 설정 버튼 연결

### Phase 2: 프로필 설정 (우선순위: 높음)
- [ ] ProfileSettings.jsx 구현
- [ ] 프로필 정보 조회/수정 API 연동
- [ ] 프로필 사진 업로드 기능
- [ ] 폼 유효성 검사

### Phase 3: 보안 설정 (우선순위: 중간)
- [ ] SecuritySettings.jsx 구현
- [ ] 비밀번호 변경 기능
- [ ] 로그인 기록 조회
- [ ] 활성 세션 관리

### Phase 4: 알림 및 계정 관리 (우선순위: 낮음)
- [ ] NotificationSettings.jsx 구현
- [ ] AccountSettings.jsx 구현
- [ ] 데이터 내보내기 기능
- [ ] 계정 삭제 프로세스

### Phase 5: 최적화 및 테스트 (우선순위: 중간)
- [ ] 반응형 디자인 최적화
- [ ] 접근성 테스트 및 개선
- [ ] 성능 최적화
- [ ] 에러 핸들링 강화

## ⚠️ 고려사항 및 제약

### 보안 고려사항
1. **비밀번호 변경**: 현재 비밀번호 확인 필수
2. **민감한 정보**: HTTPS 통신, 데이터 암호화
3. **세션 관리**: 토큰 만료 시 자동 갱신 또는 로그아웃
4. **권한 검증**: 모든 설정 변경 시 서버 사이드 검증

### 성능 고려사항
1. **이미지 업로드**: 파일 크기 제한, 이미지 압축
2. **API 호출**: 불필요한 요청 방지, 캐싱 활용
3. **상태 관리**: 필요한 데이터만 전역 상태에 저장

### 호환성 고려사항
1. **브라우저 지원**: IE11+ (필요시)
2. **모바일 지원**: iOS Safari, Android Chrome
3. **접근성**: WCAG 2.1 AA 수준 준수

## 📊 예상 개발 일정

| 단계 | 소요 시간 | 누적 시간 |
|------|-----------|-----------|
| Phase 1: 기본 구조 | 4-6시간 | 4-6시간 |
| Phase 2: 프로필 설정 | 6-8시간 | 10-14시간 |
| Phase 3: 보안 설정 | 4-6시간 | 14-20시간 |
| Phase 4: 알림/계정 | 6-8시간 | 20-28시간 |
| Phase 5: 최적화 | 4-6시간 | 24-34시간 |

## 🔍 검토 포인트

구현 전 검토해야 할 사항들:

1. **API 설계**: 백엔드 API 명세서 확인 필요
2. **디자인 시스템**: UI 컴포넌트 일관성 유지
3. **사용자 경험**: 설정 변경 흐름의 직관성
4. **데이터 정책**: 개인정보 처리방침 준수
5. **확장성**: 향후 새로운 설정 항목 추가 용이성

이 문서를 바탕으로 개발 방향을 결정해주세요. 추가로 고려해야 할 사항이나 수정이 필요한 부분이 있다면 말씀해주세요.