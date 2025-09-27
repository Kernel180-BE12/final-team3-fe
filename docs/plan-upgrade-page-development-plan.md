# 플랜 업그레이드 페이지 개발 계획

## 프로젝트 개요

### 목적
- 사용자가 현재 플랜을 확인하고 상위 플랜으로 업그레이드할 수 있는 가격 정책 페이지 구현
- Claude.ai/pricing 스타일의 세련된 가격 비교 인터페이스 제공
- Free, Pro, Max 3가지 플랜의 기능과 가격을 명확히 비교 표시

### 현재 상황
- GeneratorPageV2.jsx의 사이드바에 "플랜 업그레이드" 메뉴가 있지만 동작하지 않음 (href="#")
- 별도의 가격 정책 페이지가 존재하지 않음
- 사용자 플랜 관리 기능 부재

## UI/UX 설계

### 1. 페이지 레이아웃 구조

#### 1.1 헤더 섹션
```
┌─────────────────────────────────────────────────────────┐
│                     헤더 내비게이션                        │
│  [로고]                              [로그인] [가입하기]  │
└─────────────────────────────────────────────────────────┘
│                                                         │
│              🚀 알맞은 플랜을 선택하세요                │
│         더 많은 템플릿과 고급 기능을 이용해보세요         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### 1.2 플랜 비교 카드 섹션 (3단 구조)
```
┌─────────────┬─────────────┬─────────────┐
│    FREE     │     PRO     │     MAX     │
│             │  ⭐ 인기     │  💎 프리미엄  │
├─────────────┼─────────────┼─────────────┤
│    무료      │   ₩29,000   │   ₩59,000   │
│             │    /월       │    /월       │
├─────────────┼─────────────┼─────────────┤
│ • 기본 기능  │ • 모든 기능  │ • 모든 기능  │
│ • 월 10개   │ • 월 100개   │ • 무제한     │
│ • 이메일    │ • 우선 지원  │ • 전용 지원  │
│   지원      │ • API 액세스 │ • API 고급   │
├─────────────┼─────────────┼─────────────┤
│ [현재 플랜]  │ [업그레이드] │ [업그레이드] │
└─────────────┴─────────────┴─────────────┘
```

#### 1.3 기능 상세 비교표
```
┌──────────────────────────────────────────────────────────┐
│                    기능 상세 비교                          │
├──────────────────┬─────────┬─────────┬─────────────────┤
│ 기능              │  FREE   │   PRO   │      MAX        │
├──────────────────┼─────────┼─────────┼─────────────────┤
│ 월 템플릿 생성    │   10개   │  100개   │     무제한      │
│ AI 모델          │  기본    │  고급    │   최신 모델     │
│ 템플릿 저장      │   5개    │  50개    │     무제한      │
│ 버전 관리        │   ✗     │   ✓     │       ✓        │
│ 팀 협업          │   ✗     │   ✓     │       ✓        │
│ API 접근         │   ✗     │   ✓     │       ✓        │
│ 고객 지원        │ 이메일   │ 우선     │    전용 매니저   │
└──────────────────┴─────────┴─────────┴─────────────────┘
```

### 2. 디자인 시스템

#### 2.1 색상 체계 (Claude.ai 스타일 참고)
```css
/* 브랜드 색상 */
--primary: #FF6B35;      /* 메인 오렌지 */
--primary-light: #FF8A65;
--primary-dark: #E65100;

/* 배경 색상 */
--bg-primary: #FFFFFF;
--bg-secondary: #F8F9FA;
--bg-accent: #FFF3E0;

/* 텍스트 색상 */
--text-primary: #1A1A1A;
--text-secondary: #6B7280;
--text-muted: #9CA3AF;

/* 카드 색상 */
--card-free: #F3F4F6;
--card-pro: #FFF7ED;     /* 인기 플랜 - 오렌지 하이라이트 */
--card-max: #F3E8FF;     /* 프리미엄 - 보라색 하이라이트 */

/* 버튼 색상 */
--btn-primary: #FF6B35;
--btn-secondary: #374151;
--btn-disabled: #D1D5DB;
```

#### 2.2 타이포그래피
```css
/* 헤더 */
.hero-title: 'Noto Sans KR', 48px, 700
.hero-subtitle: 'Noto Sans KR', 20px, 400

/* 카드 */
.plan-title: 'Noto Sans KR', 24px, 700
.plan-price: 'Noto Sans KR', 36px, 800
.plan-feature: 'Noto Sans KR', 16px, 400

/* 버튼 */
.btn-text: 'Noto Sans KR', 16px, 600
```

#### 2.3 간격 및 크기
```css
/* 카드 크기 */
.pricing-card: 360px width, auto height
.card-padding: 32px
.card-border-radius: 16px

/* 간격 */
.section-spacing: 80px
.card-gap: 24px
.feature-spacing: 16px
```

## 기능 명세

### 1. 플랜 정보 구조

#### 1.1 플랜 데이터 모델
```javascript
const PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    displayName: '무료',
    price: 0,
    priceText: '무료',
    badge: null,
    color: 'gray',
    features: [
      { name: '월 템플릿 생성', value: '10개', included: true },
      { name: '기본 AI 모델', value: '기본', included: true },
      { name: '템플릿 저장', value: '5개', included: true },
      { name: '이메일 지원', value: '표준', included: true },
      { name: '버전 관리', value: null, included: false },
      { name: '팀 협업', value: null, included: false },
      { name: 'API 접근', value: null, included: false }
    ],
    limitations: [
      '월 10개 템플릿 생성 제한',
      '기본 AI 모델만 사용 가능',
      '최대 5개 템플릿 저장'
    ]
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    displayName: '프로',
    price: 29000,
    priceText: '₩29,000',
    billing: '/월',
    badge: '⭐ 인기',
    color: 'orange',
    features: [
      { name: '월 템플릿 생성', value: '100개', included: true },
      { name: '고급 AI 모델', value: '고급', included: true },
      { name: '템플릿 저장', value: '50개', included: true },
      { name: '우선 고객지원', value: '우선', included: true },
      { name: '버전 관리', value: '포함', included: true },
      { name: '팀 협업', value: '5명', included: true },
      { name: 'API 접근', value: '기본', included: true }
    ],
    highlights: [
      '개인 사용자에게 최적화',
      '비즈니스 기본 기능 포함',
      '월 100개 템플릿 생성 가능'
    ]
  },
  max: {
    id: 'max',
    name: 'Max',
    displayName: '맥스',
    price: 59000,
    priceText: '₩59,000',
    billing: '/월',
    badge: '💎 프리미엄',
    color: 'purple',
    features: [
      { name: '무제한 템플릿 생성', value: '무제한', included: true },
      { name: '최신 AI 모델', value: '최신', included: true },
      { name: '무제한 저장', value: '무제한', included: true },
      { name: '전용 고객지원', value: '전용 매니저', included: true },
      { name: '고급 버전 관리', value: '고급', included: true },
      { name: '팀 협업', value: '무제한', included: true },
      { name: 'API 고급 접근', value: '고급', included: true }
    ],
    highlights: [
      '대용량 비즈니스용',
      '모든 기능 무제한 사용',
      '전용 고객 지원 매니저'
    ]
  }
};
```

### 2. 컴포넌트 구조

#### 2.1 실제 구현된 컴포넌트 구조
```
src/
├── pages/
│   └── PricingPage.jsx              # 메인 페이지 (심플 레이아웃)
├── components/
│   └── pricing/                     # 가격 정책 관련 컴포넌트들
│       ├── BackButton.jsx          # ← 뒤로가기 버튼
│       ├── PricingCards.jsx        # 플랜 카드 그리드 + FAQ + 추가 정보
│       └── PricingCard.jsx         # 개별 플랜 카드
├── data/
│   └── plans.js                     # 플랜 정보 상수 및 색상 매핑
└── App.jsx                          # 라우트 설정 (/pricing 추가)
```

**변경사항 (심플화):**
- PricingHero, FeatureComparison, FAQ, PricingFooter 제거
- 모든 기능을 PricingCards 컴포넌트에 통합
- BackButton으로 네비게이션 간소화

#### 2.2 주요 컴포넌트 인터페이스

**PricingCard.jsx**
```javascript
const PricingCard = ({
  plan,
  currentPlan,
  onUpgrade,
  featured = false
}) => {
  // 플랜 카드 렌더링
  // 현재 플랜 표시, 업그레이드 버튼 처리
};
```

**PricingCards.jsx**
```javascript
const PricingCards = ({
  currentPlan,
  onUpgrade
}) => {
  // 3개 플랜 카드 그리드 렌더링
  // FAQ 및 추가 정보 포함
  // Pro 플랜을 featured로 강조 표시
};
```

**BackButton.jsx**
```javascript
const BackButton = () => {
  // useNavigate(-1)로 이전 페이지 이동
  // ← 뒤로가기 텍스트와 아이콘
};
```

### 3. 상태 관리 및 API

#### 3.1 사용자 플랜 상태
```javascript
// useAuth 훅에 추가
const useAuth = () => {
  // 기존 상태...
  const [userPlan, setUserPlan] = useState('free');
  const [planExpiry, setPlanExpiry] = useState(null);
  const [usage, setUsage] = useState({
    templatesUsed: 0,
    templatesLimit: 10,
    storageUsed: 0,
    storageLimit: 5
  });
};
```

#### 3.2 API 엔드포인트 (가상)
```javascript
// api.js에 추가
export const planApi = {
  // 현재 플랜 정보 조회
  getCurrentPlan: () => get('/api/user/plan'),

  // 플랜 업그레이드
  upgradePlan: (planId) => post('/api/user/plan/upgrade', { planId }),

  // 사용량 조회
  getUsage: () => get('/api/user/usage'),

  // 결제 정보
  createPayment: (planId) => post('/api/payment/create', { planId }),

  // 결제 확인
  confirmPayment: (paymentId) => post('/api/payment/confirm', { paymentId })
};
```

## 구현 현황

### ✅ Phase 1: 기본 UI 구현 (완료)
1. **페이지 라우팅 설정** ✅
   - App.jsx에 `/pricing` 라우트 추가
   - ProtectedRoute 적용 (로그인 필요)

2. **기본 컴포넌트 구현** ✅
   - PricingPage 메인 컴포넌트 (심플 레이아웃)
   - BackButton 컴포넌트 (← 뒤로가기)
   - PricingCards 플랜 카드 그리드
   - PricingCard 개별 플랜 카드

3. **플랜 데이터 및 디자인** ✅
   - src/data/plans.js에 플랜 정보 상수 정의
   - 3가지 플랜 카드 레이아웃 (Free, Pro, Max)
   - Pro 플랜 featured 강조 (⭐ 인기 배지)
   - 반응형 그리드 (모바일 1열, 태블릿 2열, 데스크톱 3열)

4. **사이드바 연동** ✅
   - GeneratorPageV2의 "플랜 업그레이드" 버튼을 navigate('/pricing')로 연결

5. **통합 기능** ✅
   - FAQ 섹션을 PricingCards에 통합
   - 플랜 변경 안내 정보 포함
   - 이메일 문의 및 라이브 채팅 버튼 (준비 중)

### 🔄 Phase 2: 상호작용 기능 (부분 완료)
1. **현재 플랜 표시** ✅
   - getCurrentUserPlan() 함수로 현재 플랜 관리 (임시: 'free')
   - 현재 플랜 카드에 "현재 사용 중" 배지 표시
   - 업그레이드 가능한 플랜만 버튼 활성화

2. **업그레이드 버튼 로직** ✅
   - Free → Pro/Max 업그레이드 버튼 활성화
   - 현재 플랜은 "현재 사용 중" 버튼으로 비활성화
   - Free 플랜은 "무료 플랜" 버튼으로 비활성화

3. **기능 비교** ✅ (카드 내 통합)
   - 각 플랜 카드에 기능별 체크마크/X표시
   - 기능값 표시 (10개/100개/무제한 등)
   - 플랜별 하이라이트 정보 포함

### Phase 3: 결제 시스템 연동
1. **업그레이드 플로우**
   - 플랜 선택 → 결제 페이지 이동
   - 결제 확인 → 플랜 업데이트
   - 성공/실패 피드백

2. **사용량 표시**
   - 현재 사용량 대비 제한 표시
   - 업그레이드 유도 메시지
   - 프로그레스 바 UI

### Phase 4: 고급 기능
1. **FAQ 섹션**
   - 자주 묻는 질문
   - 아코디언 UI
   - 검색 기능

2. **플랜 변경 이력**
   - 플랜 변경 히스토리
   - 다운그레이드 정책 안내

## 기술적 고려사항

### 1. 성능 최적화
- 이미지 lazy loading
- 컴포넌트 메모이제이션
- 플랜 데이터 캐싱

### 2. 접근성
- 키보드 네비게이션
- 스크린 리더 지원
- 색상 대비 최적화
- ARIA 라벨 적용

### 3. 반응형 디자인
```css
/* 모바일 (< 768px) */
.pricing-grid {
  grid-template-columns: 1fr;
  gap: 16px;
}

/* 태블릿 (768px ~ 1024px) */
.pricing-grid {
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* 데스크톱 (> 1024px) */
.pricing-grid {
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
}
```

### 4. 다국어 지원 준비
- 가격 형식 로컬라이제이션
- 텍스트 다국어 키 구조화
- 통화 단위 동적 변경

## 사용자 경험 고려사항

### 1. 업그레이드 유도 전략
- **현재 플랜 제한 표시**: 사용량이 제한에 가까워질 때 알림
- **기능 미리보기**: Pro/Max 전용 기능 살짝 보여주기
- **제한 기간 혜택**: 첫 달 할인 등 프로모션

### 2. 명확한 가치 제안
- **구체적인 숫자**: "월 100개"보다는 "일반 사용자 평균 30개, 여유있게 100개"
- **사용 사례**: "개인 브랜딩용", "중소기업용", "대기업용"
- **ROI 계산**: "시간 절약", "효율성 향상" 수치화

### 3. 신뢰도 향상
- **보안 배지**: 결제 보안 인증 표시
- **환불 정책**: 명확한 환불 조건 안내
- **고객 후기**: 플랜별 만족도 표시

### 4. 결정 장벽 제거
- **무료 체험**: Pro 플랜 7일 무료 체험
- **언제든 변경**: 플랜 변경의 유연성 강조
- **취소 용이**: 간단한 취소 절차 안내

## 예상 효과

### 비즈니스 목표
- 🎯 **수익 증대**: Free 사용자의 Pro 전환율 목표 15%
- 📈 **사용자 유지**: 유료 플랜 사용자 이탈률 감소
- 💡 **기능 인지**: 고급 기능에 대한 사용자 인식 향상

### 사용자 경험
- 🔍 **명확성**: 플랜별 차이점과 혜택 명확히 이해
- ⚡ **효율성**: 빠르고 간편한 업그레이드 프로세스
- 🛡️ **신뢰성**: 투명한 가격 정책과 안전한 결제

### 기술적 성과
- 📱 **반응형**: 모든 디바이스에서 최적화된 경험
- ♿ **접근성**: WCAG 2.1 AA 준수
- 🚀 **성능**: 3초 이내 페이지 로딩

## 다음 단계

### ✅ 완료된 작업 (Phase 1)
1. **라우팅 설정**: `/pricing` 경로 추가 완료
2. **기본 컴포넌트**: PricingPage, BackButton, PricingCards, PricingCard 구현 완료
3. **플랜 데이터**: src/data/plans.js에 PLANS 상수 정의 완료
4. **사이드바 연동**: GeneratorPageV2 "플랜 업그레이드" 버튼 연결 완료

### 🎯 현재 상태
- **Phase 1**: ✅ 완료 (기본 UI 및 정적 콘텐츠)
- **Phase 2**: 🔄 부분 완료 (현재 플랜 연동 및 상호작용)
- **Phase 3**: ⏳ 준비 중 (결제 시스템 및 고급 기능)

### 🚀 다음 우선순위
1. **Medium**: useAuth 훅과 실제 사용자 플랜 연동
2. **Medium**: 사용량 표시 기능 (대시보드 연동)
3. **Low**: 결제 시스템 연동 (토스페이먼츠, 아임포트)

### 외부 의존성
- **결제 시스템**: 토스페이먼츠, 아임포트 등 PG사 연동
- **사용량 추적**: 백엔드 API 개발 필요
- **플랜 관리**: 사용자 플랜 변경 시스템 구축

---

## 📋 구현 완료 요약 (2025-09-28)

### ✅ 완료된 기능
1. **전체 페이지 구조**: 심플하고 직관적인 디자인
2. **3개 플랜 카드**: Free, Pro (⭐ 인기), Max (💎 프리미엄)
3. **반응형 그리드**: 모바일/태블릿/데스크톱 최적화
4. **현재 플랜 표시**: "현재 사용 중" 배지 및 버튼 상태 관리
5. **업그레이드 로직**: 플랜별 버튼 활성화/비활성화
6. **FAQ 통합**: 플랜 변경, 요금 계산 관련 자주 묻는 질문
7. **네비게이션**: ← 뒤로가기 버튼 및 사이드바 연동

### 🎯 접근 방법
- **직접 접근**: `http://localhost:5174/pricing`
- **사이드바**: GeneratorPageV2 → "플랜 업그레이드" 클릭

### 📁 생성된 파일
```
src/
├── pages/PricingPage.jsx                    # 메인 페이지
├── components/pricing/BackButton.jsx        # 뒤로가기 버튼
├── components/pricing/PricingCards.jsx      # 플랜 그리드 + FAQ
├── components/pricing/PricingCard.jsx       # 개별 플랜 카드
├── data/plans.js                           # 플랜 정보 및 색상 상수
└── App.jsx                                 # 라우트 추가
```

**Phase 1 성공적으로 완료! 🎉**