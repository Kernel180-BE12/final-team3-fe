# 사이드바 컴포넌트 재사용 가능화 작업 문서

## 🎯 작업 목표
GeneratorPageV2에서 사용하는 사이드바 컴포넌트를 독립적인 재사용 가능한 컴포넌트로 분리하여 다른 페이지에서도 활용할 수 있도록 리팩토링

## 📋 현재 상황 분석

### 현재 구조
- **위치**: `src/pages/GeneratorPageV2.jsx` 내부의 `Sidebar` 컴포넌트 (228-375줄)
- **의존성**: GeneratorPageV2 페이지에 강하게 결합되어 있음
- **기능**: 상단 메뉴, 사용자 메뉴, 도움말 모달 등을 포함

### 현재 사이드바가 포함하는 기능들
1. **상단 메뉴**
   - 새 템플릿 생성 (`/create` 이동)
   - 템플릿 보관함 (현재 비활성)

2. **사용자 메뉴** (하단)
   - 사용자 정보 표시
   - 플랜 업그레이드 (`/pricing` 이동)
   - 템플릿 맞춤 설정 (`/customization` 이동)
   - 설정 (`/settings` 이동)
   - 도움말 (HelpModal 호출)
   - 로그아웃

3. **아이콘 및 스타일링**
   - 모든 SVG 아이콘 컴포넌트들
   - Tailwind CSS 스타일링
   - 호버 효과 및 툴팁

## 🏗️ 리팩토링 방안

### 방안 1: 완전 분리 (권장)
**새로운 독립 컴포넌트 생성**

```
src/components/layout/
├── AppSidebar.jsx          # 메인 사이드바 컴포넌트
├── SidebarIcons.jsx        # 모든 아이콘 컴포넌트들
├── SidebarMenu.jsx         # 상단 메뉴 (새 템플릿, 보관함 등)
└── SidebarUserMenu.jsx     # 하단 사용자 메뉴
```

**장점:**
- 완전한 재사용성
- 관심사 분리로 유지보수성 향상
- 각 컴포넌트별 독립적 테스트 가능
- props를 통한 유연한 설정 가능

**단점:**
- 초기 작업량 많음
- 컴포넌트 간 props 전달 복잡도 증가

### 방안 2: 부분 분리
**핵심 기능만 분리하여 컴포넌트화**

```
src/components/layout/
├── AppSidebar.jsx          # 기본 사이드바 레이아웃
└── SidebarConfig.js        # 메뉴 설정 파일
```

**장점:**
- 작업량 적음
- 빠른 구현 가능

**단점:**
- 유연성 제한적
- 일부 기능은 여전히 페이지에 의존

## 📝 구현 계획 (방안 1 기준)

### Phase 1: 아이콘 컴포넌트 분리
- [ ] `src/components/layout/SidebarIcons.jsx` 생성
- [ ] 모든 SVG 아이콘 컴포넌트들을 이동
- [ ] 네이밍 표준화 (PascalCase 일관성 적용)

### Phase 2: 사이드바 메뉴 컴포넌트 분리
- [ ] `src/components/layout/SidebarMenu.jsx` 생성
- [ ] 상단 메뉴 로직 분리 (새 템플릿, 보관함)
- [ ] props 인터페이스 설계

### Phase 3: 사용자 메뉴 컴포넌트 분리
- [ ] `src/components/layout/SidebarUserMenu.jsx` 생성
- [ ] 사용자 메뉴 드롭다운 로직 분리
- [ ] 도움말 모달 통합

### Phase 4: 메인 사이드바 컴포넌트 생성
- [ ] `src/components/layout/AppSidebar.jsx` 생성
- [ ] 전체 레이아웃 및 조합 로직 구현
- [ ] props 인터페이스 완성

### Phase 5: 기존 페이지 업데이트
- [ ] GeneratorPageV2에서 새로운 AppSidebar 사용
- [ ] 기존 Sidebar 컴포넌트 제거
- [ ] 테스트 및 검증

## 🔧 Props 인터페이스 설계

### AppSidebar Props
```javascript
interface AppSidebarProps {
  // 사용자 정보
  user: {
    email: string;
    name?: string;
    avatar?: string;
  };

  // 메뉴 설정
  topMenuItems?: Array<{
    id: string;
    icon: ComponentType;
    tooltip: string;
    href?: string;
    onClick?: () => void;
    active?: boolean;
  }>;

  // 사용자 메뉴 설정
  userMenuItems?: Array<{
    id: string;
    icon: ComponentType;
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: 'default' | 'danger';
  }>;

  // 기능 토글
  showHelpModal?: boolean;
  showUserMenu?: boolean;

  // 이벤트 핸들러
  onLogout: () => void;
  onNavigate?: (path: string) => void;
}
```

### 기본 메뉴 설정 예시
```javascript
const DEFAULT_TOP_MENU = [
  {
    id: 'create',
    icon: PlusCircleIcon,
    tooltip: '새 템플릿 생성',
    href: '/create'
  },
  {
    id: 'templates',
    icon: LayoutGridIcon,
    tooltip: '템플릿 보관함',
    href: '/templates'
  }
];

const DEFAULT_USER_MENU = [
  {
    id: 'upgrade',
    icon: SparklesIcon,
    label: '플랜 업그레이드',
    href: '/pricing'
  },
  {
    id: 'customization',
    icon: SlidersHorizontalIcon,
    label: '템플릿 맞춤 설정',
    href: '/customization'
  },
  {
    id: 'settings',
    icon: SettingsIcon,
    label: '설정',
    href: '/settings'
  },
  {
    id: 'help',
    icon: LifeBuoyIcon,
    label: '도움말',
    onClick: () => setHelpModalOpen(true)
  },
  {
    id: 'logout',
    icon: LogOutIcon,
    label: '로그아웃',
    onClick: handleLogout,
    variant: 'danger'
  }
];
```

## 📁 파일 구조

### 최종 파일 구조
```
src/components/layout/
├── AppSidebar.jsx              # 메인 사이드바 컴포넌트
├── SidebarIcons.jsx            # 아이콘 컴포넌트들
├── SidebarMenu.jsx             # 상단 메뉴
├── SidebarUserMenu.jsx         # 사용자 메뉴
└── index.js                    # export 통합 파일

src/components/help/            # 기존 도움말 컴포넌트들
├── HelpModal.jsx
├── HelpTabs.jsx
└── ...

src/pages/
├── GeneratorPageV2.jsx         # 새 AppSidebar 사용
├── TemplatesPage.jsx           # AppSidebar 추가 가능
├── StatisticsPage.jsx          # AppSidebar 추가 가능
└── ...
```

## 🧪 사용 예시

### GeneratorPageV2에서 사용
```javascript
import AppSidebar from '@/components/layout/AppSidebar';

function GeneratorPageV2() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <AppSidebar
        user={user}
        onLogout={logout}
        onNavigate={navigate}
        showHelpModal={true}
      />
      <main className="flex-1">
        {/* 메인 콘텐츠 */}
      </main>
    </div>
  );
}
```

### TemplatesPage에서 사용 (커스텀 메뉴)
```javascript
import AppSidebar from '@/components/layout/AppSidebar';

function TemplatesPage() {
  const customTopMenu = [
    {
      id: 'create',
      icon: PlusCircleIcon,
      tooltip: '새 템플릿 생성',
      href: '/create'
    }
    // 보관함 메뉴는 제외 (현재 페이지이므로)
  ];

  return (
    <div className="flex h-screen">
      <AppSidebar
        user={user}
        topMenuItems={customTopMenu}
        onLogout={logout}
      />
      <main className="flex-1">
        {/* 템플릿 목록 */}
      </main>
    </div>
  );
}
```

## ⚠️ 주의사항

1. **기존 기능 유지**: 리팩토링 후에도 모든 기능이 정상 작동해야 함
2. **스타일 일관성**: Tailwind CSS 클래스와 호버 효과 유지
3. **접근성**: 툴팁, aria-label 등 접근성 속성 유지
4. **성능**: 불필요한 리렌더링 방지 (React.memo, useCallback 활용)
5. **타입 안정성**: TypeScript 도입 시 인터페이스 정의 필수

## 🎯 예상 효과

### 장점
- **재사용성**: 여러 페이지에서 일관된 사이드바 사용 가능
- **유지보수성**: 사이드바 관련 수정사항을 한 곳에서 관리
- **확장성**: 새로운 메뉴 항목이나 기능 추가 용이
- **테스트 용이성**: 각 컴포넌트별 독립적 테스트 가능

### 적용 가능한 페이지들
- TemplatesPage (템플릿 보관함)
- StatisticsPage (통계 페이지)
- PricingPage (요금제 페이지)
- SettingsPage (설정 페이지)
- 기타 대시보드 형태의 페이지들

## 📈 작업 우선순위

### 높음 (즉시 적용)
- GeneratorPageV2, TemplatesPage

### 중간 (단계적 적용)
- StatisticsPage, SettingsPage

### 낮음 (선택적 적용)
- PricingPage, 기타 정적 페이지들

## 🔄 롤백 계획

문제 발생 시:
1. 이전 커밋으로 롤백
2. 기존 GeneratorPageV2의 inline Sidebar 컴포넌트 복원
3. 단계별 디버깅 및 수정

---

이 문서를 검토하신 후 진행 여부와 선호하는 방안을 알려주시면 구현을 시작하겠습니다.