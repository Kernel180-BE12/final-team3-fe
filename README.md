# AI 알림톡 생성기

카카오톡 알림톡 템플릿을 AI로 쉽고 빠르게 생성할 수 있는 웹 애플리케이션입니다.

## 프로젝트 개요

이 프로젝트는 사용자가 간단한 입력을 통해 AI 기반으로 카카오톡 알림톡 템플릿을 자동 생성할 수 있는 서비스의 프론트엔드 애플리케이션입니다.

### 주요 기능

- **AI 템플릿 생성**: 채팅 인터페이스를 통한 AI 기반 알림톡 템플릿 자동 생성
- **사용자 인증**: 이메일 기반 회원가입 및 로그인 (이메일 인증 포함)
- **실시간 미리보기**: 생성된 템플릿의 실시간 프리뷰 및 변수 시스템
- **템플릿 관리**: 생성, 조회, 승인, 관리 및 상태 추적
- **플랜 업그레이드**: 3단계 요금제 (Free/Pro/Max) 및 기능 비교
- **통계 대시보드**: 템플릿 승인 분석 및 KPI 추적 차트
- **중복 방지**: 스마트 승인 시스템으로 중복 제출 방지
- **에러 핸들링**: 포괄적 에러 표시 및 사용자 친화적 메시지
- **반응형 디자인**: 모바일과 데스크톱 모든 환경에서 최적화된 현대적 UI

## 기술 스택

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.12
- **Routing**: React Router DOM 7.8.2
- **State Management**: Zustand 5.0.8
- **Language**: JavaScript + TypeScript

### Development Tools
- **Linting**: ESLint 9.33.0
- **Code Quality**: React Hooks & React Refresh plugins
- **Module System**: ES Modules

## 시작하기

### 사전 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/Kernel180-BE12/final-team3-fe.git
   cd final-team3-fe-v2
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경변수 설정**
   ```bash
   # .env.development 파일에서 개발 환경 설정
   VITE_API_URL=http://54.116.0.21:8080/api
   VITE_APP_ENV=development
   VITE_DEBUG_MODE=true
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   ```

   브라우저에서 `http://localhost:5173` 으로 접속

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 코드 품질 검사
npm run lint
```

## 프로젝트 구조

```
src/
├── main.jsx                    # 애플리케이션 진입점
├── App.jsx                     # 메인 라우터 및 라우트 설정
├── App.css                     # 앱 전용 스타일
├── index.css                   # 글로벌 스타일 및 Tailwind 설정
├── components/                 # 재사용 가능한 UI 컴포넌트
│   ├── Header.jsx              # 내비게이션 헤더
│   ├── Footer.jsx              # 페이지 푸터
│   ├── ProtectedRoute.jsx      # 라우트 보호 래퍼
│   ├── ActivityItem.jsx        # 활동 항목 컴포넌트
│   ├── RecentActivity.jsx      # 최근 활동 표시
│   ├── generator/              # 템플릿 생성기 컴포넌트
│   │   ├── ChatInput.jsx       # 채팅 입력 컴포넌트
│   │   ├── ChatMessage.jsx     # 채팅 메시지 표시
│   │   ├── MainChatLayout.jsx  # 메인 채팅 레이아웃
│   │   ├── ThreePanelLayout.jsx # 3패널 레이아웃
│   │   └── WelcomeSection.jsx  # 환영 섹션
│   ├── pricing/                # 가격 정책 컴포넌트
│   │   ├── BackButton.jsx      # 뒤로가기 버튼
│   │   ├── PricingCard.jsx     # 개별 가격 카드
│   │   └── PricingCards.jsx    # 가격 카드 컨테이너
│   └── statistics/             # 통계 컴포넌트
│       ├── ApprovalTrendChart.jsx     # 승인 트렌드 차트
│       ├── KPICards.jsx               # KPI 카드 표시
│       └── StatusDistributionChart.jsx # 상태 분포 차트
├── pages/                      # 페이지 컴포넌트
│   ├── LandingPage.jsx         # 공개 랜딩 페이지
│   ├── LoginPage.jsx           # 사용자 로그인
│   ├── SignupPage.jsx          # 사용자 회원가입
│   ├── DashboardPage.jsx       # 사용자 대시보드
│   ├── GeneratorPage.jsx       # AI 템플릿 생성기 (원본)
│   ├── GeneratorPageV2.jsx     # AI 템플릿 생성기 (메인 기능)
│   ├── PricingPage.jsx         # 플랜 업그레이드 페이지
│   ├── StatisticsPage.jsx      # 템플릿 승인 통계
│   └── TemplatesPage.jsx       # 템플릿 관리 페이지
├── data/                       # 데이터 및 설정
│   ├── plans.js                # 가격 정책 설정
│   ├── sampleActivities.js     # 샘플 활동 데이터
│   └── mock/                   # 목 데이터 파일
│       ├── rejectionReasons.json      # 목 거부 사유
│       ├── templateActivity.json      # 목 템플릿 활동
│       └── templateStatistics.json    # 목 통계 데이터
├── hooks/                      # 커스텀 React 훅
│   └── useAuth.js              # 인증 로직
└── utils/                      # 유틸리티 함수
    ├── api.js                  # API 통신 헬퍼
    └── jsonParser.js           # JSON 파싱 유틸리티 (에러 처리용)
```

## 인증 시스템

### 사용자 플로우

1. **회원가입**: 이메일 + 비밀번호 + 닉네임
2. **이메일 인증**: OTP 코드를 통한 이메일 검증
3. **로그인**: JWT 토큰 기반 인증
4. **보호된 라우트**: 인증된 사용자만 접근 가능

### 인증이 필요한 페이지

- `/dashboard` - 사용자 대시보드
- `/create` - AI 템플릿 생성기 (GeneratorPageV2)
- `/templates` - 템플릿 관리
- `/pricing` - 플랜 업그레이드
- `/statistics` - 템플릿 승인 통계

## API 연동

### 환경변수 설정

API 엔드포인트는 환경별로 다르게 설정할 수 있습니다:

```bash
# 개발 환경 (.env.development)
VITE_API_URL=http://54.116.0.21:8080/api

# 프로덕션 환경 (.env.production)
VITE_API_URL=http://54.116.0.21:8080/api
```

### 주요 API 엔드포인트

- `POST /auth/login` - 로그인
- `POST /auth/signup` - 회원가입
- `POST /auth/email/otp/request` - 이메일 인증 요청
- `POST /auth/email/otp/verify` - 이메일 인증 확인

## 디자인 시스템

### Tailwind CSS 설정

- **반응형 디자인**: 모바일 우선 접근 방식
- **커스텀 컬러**: 브랜드 컬러 시스템
- **컴포넌트 기반**: 재사용 가능한 UI 컴포넌트

### 주요 UI 컴포넌트

- 폼 입력 요소 (이메일, 비밀번호, 텍스트)
- 버튼 컴포넌트 (Primary, Secondary, Disabled 상태)
- 모달 및 알림 시스템
- 카드 레이아웃

## 개발 환경 설정

### Vite 설정

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve('src')  // src 디렉토리 별칭
    }
  },
  server: {
    host: 'localhost',
    port: 5173,
    open: false  // 브라우저 자동 열기 비활성화
  }
})
```

### ESLint 설정

- React Hooks 규칙 적용
- React Refresh 플러그인
- 미사용 변수 검사

## 기여하기

1. **Fork** 이 저장소
2. **Feature branch** 생성 (`git checkout -b feature/AmazingFeature`)
3. **Commit** 변경사항 (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Pull Request** 생성

## 커밋 컨벤션

```bash
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
refactor: 코드 리팩토링
test: 테스트 코드, 리팩토링 테스트 코드 추가
chore: 빌드 업무 수정, 패키지 매니저 수정
```

## 문제 해결

### 일반적인 문제들

1. **포트 충돌**: 다른 포트 사용 `npm run dev -- --port 3000`
2. **의존성 오류**: `npm install` 재실행
3. **환경변수 인식 안됨**: 서버 재시작 필요

### 디버깅

```bash
# 개발 모드에서 디버그 정보 활성화
VITE_DEBUG_MODE=true npm run dev
```

## 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 팀 정보

**Team 3 - Frontend Development**

- 프로젝트 관리: [Kernel180-BE12](https://github.com/Kernel180-BE12)
- 개발 기간: 2024년

---

## 관련 링크

- [백엔드 저장소](https://github.com/Kernel180-BE12/final-team3-be-lee)
- [프로젝트 문서](./CLAUDE.md)

---

**참고**: 이 프로젝트는 학습 목적으로 개발되었습니다.