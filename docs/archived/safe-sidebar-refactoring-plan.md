# 안전한 사이드바 리팩토링 계획 문서

## 🎯 작업 배경

- **시연 준비**: 이번 주 시연이 예정되어 있어 기존 작동하는 코드의 안정성 최우선
- **위험 최소화**: 현재 잘 작동하는 GeneratorPageV2.jsx는 절대 수정하지 않음
- **점진적 접근**: 새로운 버전에서 테스트 후 검증된 경우에만 적용

## 🛡️ 안전한 접근 전략

### 핵심 원칙
1. **기존 코드 보존**: GeneratorPageV2.jsx는 그대로 유지
2. **병렬 개발**: GeneratorPageV3.jsx에서 새로운 구조 테스트
3. **점진적 마이그레이션**: 충분한 검증 후에만 교체
4. **즉시 롤백 가능**: 문제 발생 시 바로 이전 버전으로 복원

### 개발 환경 분리
```
현재 (시연용)    │  개발/테스트용
/create         │  /create-v3
GeneratorPageV2 │  GeneratorPageV3
기존 인라인     │  새로운 AppSidebar
사이드바        │  컴포넌트 사용
```

## 📋 단계별 실행 계획

### Phase 1: 복사 및 기본 설정
- [ ] GeneratorPageV2.jsx → GeneratorPageV3.jsx 완전 복사
- [ ] App.jsx에 `/create-v3` 라우트 추가
- [ ] 기본 동작 확인 (복사본이 정상 작동하는지)

### Phase 2: AppSidebar 컴포넌트 생성
- [ ] `src/components/layout/AppSidebar.jsx` 파일 생성
- [ ] GeneratorPageV2의 사이드바 코드를 기반으로 재사용 가능한 컴포넌트 작성
- [ ] 모든 아이콘, 메뉴, 상태 관리를 한 파일에 통합

### Phase 3: Props 인터페이스 설계
- [ ] 재사용을 위한 props 구조 설계
- [ ] 기본값 설정으로 기존 기능 100% 호환성 보장
- [ ] 유연한 메뉴 커스터마이징 옵션 제공

### Phase 4: GeneratorPageV3 수정
- [ ] 기존 인라인 Sidebar 제거
- [ ] 새로운 AppSidebar 컴포넌트 적용
- [ ] 모든 기능 동작 확인 (도움말, 네비게이션, 로그아웃 등)

### Phase 5: 검증 및 테스트
- [ ] `/create-v3`에서 모든 사이드바 기능 테스트
- [ ] 다른 페이지(TemplatesPage 등)에서도 AppSidebar 적용 테스트
- [ ] 반응형 디자인 및 접근성 확인

### Phase 6: 점진적 적용 (시연 후)
- [ ] 시연 완료 후 안정성 확인
- [ ] V2 → V3 교체 또는 V2 유지 결정
- [ ] 다른 페이지들에 AppSidebar 확산 적용

## 🔧 AppSidebar.jsx 구조 설계

### 단일 파일 통합 방식
```javascript
// src/components/layout/AppSidebar.jsx

// 1. 모든 아이콘 컴포넌트들 (파일 상단)
const PlusCircleIcon = (props) => (...)
const LayoutGridIcon = (props) => (...)
// ... 기타 모든 아이콘들

// 2. AppSidebar 메인 컴포넌트
export default function AppSidebar({
  user,
  onLogout,
  onNavigate,
  topMenuItems = DEFAULT_TOP_MENU,
  userMenuItems = DEFAULT_USER_MENU,
  showHelpModal = true,
  className = ""
}) {
  // 상태 관리
  // 이벤트 핸들러
  // 렌더링 로직
}

// 3. 기본 설정값들
const DEFAULT_TOP_MENU = [...]
const DEFAULT_USER_MENU = [...]
```

### Props 인터페이스
```javascript
interface AppSidebarProps {
  // 필수 props
  user: {
    email: string;
    name?: string;
    avatar?: string;
  };
  onLogout: () => void;

  // 선택적 props (기본값 제공)
  onNavigate?: (path: string) => void;
  topMenuItems?: MenuItem[];
  userMenuItems?: MenuItem[];
  showHelpModal?: boolean;
  className?: string;
}
```

## 🧪 테스트 시나리오

### 기능 테스트 체크리스트
- [ ] 새 템플릿 생성 버튼 → `/create` 이동
- [ ] 템플릿 보관함 버튼 (비활성 상태)
- [ ] 사용자 메뉴 드롭다운 열림/닫힘
- [ ] 플랜 업그레이드 → `/pricing` 이동
- [ ] 템플릿 맞춤 설정 → `/customization` 이동
- [ ] 설정 → `/settings` 이동
- [ ] 도움말 모달 열림/닫힘
- [ ] 로그아웃 기능
- [ ] 호버 효과 및 툴팁 표시
- [ ] 반응형 디자인 동작

### 호환성 테스트
- [ ] 기존 GeneratorPageV2와 동일한 UI/UX
- [ ] 모든 스타일링 일치 (색상, 간격, 애니메이션)
- [ ] 성능 이슈 없음 (렌더링 속도)

## 📍 라우팅 구조

### 현재 상태
```javascript
// App.jsx
<Route path="/create" element={<GeneratorPageV2 />} />  // 시연용 (건드리지 않음)
```

### 개발 단계
```javascript
// App.jsx
<Route path="/create" element={<GeneratorPageV2 />} />     // 시연용 (기존)
<Route path="/create-v3" element={<GeneratorPageV3 />} />  // 테스트용 (신규)
```

### 시연 후 최종 (옵션 1: V3 채택)
```javascript
// App.jsx
<Route path="/create" element={<GeneratorPageV3 />} />     // V3로 교체
// V2 파일 삭제 또는 백업
```

### 시연 후 최종 (옵션 2: V2 유지)
```javascript
// App.jsx
<Route path="/create" element={<GeneratorPageV2 />} />     // V2 유지
// V3는 실험용으로 보관 또는 삭제
```

## 📈 예상 효과

### 단기 효과
- **위험 제거**: 시연에 영향 없음
- **안전한 실험**: 새로운 구조 충분히 테스트 가능
- **학습 기회**: 컴포넌트 설계 및 재사용성 경험

### 장기 효과
- **재사용성**: 다른 페이지에서 일관된 사이드바 사용
- **유지보수성**: 사이드바 관련 수정을 한 곳에서 관리
- **확장성**: 새로운 메뉴나 기능 추가 용이

## ⚠️ 위험 요소 및 대응 방안

### 잠재적 위험
1. **복사본 동기화**: V2와 V3 간 기능 차이 발생 가능
2. **Props 설계 미스**: 재사용성 부족으로 재작업 필요
3. **성능 이슈**: 새로운 구조로 인한 렌더링 성능 저하

### 대응 방안
1. **체크리스트 활용**: 모든 기능을 체계적으로 검증
2. **단계적 적용**: 작은 단위로 나누어 점진적 개발
3. **롤백 계획**: 문제 발생 시 즉시 V2로 복원

## 🎯 성공 기준

### 완료 조건
1. **기능 동등성**: V3가 V2와 100% 동일한 기능 제공
2. **성능 유지**: 렌더링 속도나 반응성 저하 없음
3. **재사용성 확인**: 최소 2개 이상 페이지에서 성공적 적용
4. **안정성 검증**: 1주일 이상 오류 없이 동작

### 측정 지표
- [ ] 모든 기능 테스트 통과
- [ ] 시각적 차이 없음 (스크린샷 비교)
- [ ] 사용자 경험 일치
- [ ] 코드 품질 향상 (중복 제거, 재사용성)

## 📅 타임라인

### 즉시 실행 (오늘)
- GeneratorPageV3 생성 및 라우팅 추가
- AppSidebar 컴포넌트 기본 구조 생성

### 단기 (1-2일)
- AppSidebar 완성 및 V3 적용
- 기능 테스트 및 검증

### 중기 (시연 후)
- 안정성 확인 후 V2/V3 결정
- 다른 페이지들에 확산 적용

---

## 📝 결론

이 계획은 **안전성을 최우선**으로 하면서도 **코드 품질 향상**을 달성할 수 있는 최적의 방법입니다. 시연에는 전혀 영향을 주지 않으면서 새로운 아키텍처를 충분히 검증할 수 있습니다.

**다음 단계**: 이 문서에 따라 GeneratorPageV3 생성부터 시작하겠습니다! 🚀