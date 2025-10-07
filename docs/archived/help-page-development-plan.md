# 도움말 페이지 개발 계획서

## 📋 개요

카카오 알림톡 템플릿 생성기 사용자를 위한 도움말 시스템을 구축합니다. 카카오 비즈니스 공식 가이드를 기반으로 사용자가 쉽게 참조할 수 있는 도움말을 제공합니다.

## 🎯 목표

- 사용자가 템플릿 생성 중 빠르게 가이드를 참조할 수 있는 시스템
- 카카오 비즈니스 공식 가이드라인 준수
- 직관적이고 접근하기 쉬운 UI/UX
- 템플릿 생성 작업 흐름을 방해하지 않는 구조

## 📍 접근 방식 분석

### Option 1: 별도 페이지 (/help)
**장점:**
- URL 직접 접근 가능
- 북마크 및 공유 용이
- 상세한 내용 포함 가능
- SEO 친화적

**단점:**
- 템플릿 생성 작업에서 벗어남
- 페이지 전환으로 인한 컨텍스트 손실
- 빠른 참조에 부적합

### Option 2: 모달 시스템 (추천 ⭐)
**장점:**
- 현재 작업 컨텍스트 유지
- 빠른 참조 및 즉시 적용 가능
- 템플릿 생성 중 실시간 가이드 제공
- 사용자 경험 연속성 보장

**단점:**
- 제한된 화면 공간
- URL 직접 접근 불가
- 복잡한 가이드 표시 제약

## 🎨 추천 방향: 모달 + 탭 시스템

**이유:**
1. **템플릿 생성 특성**: 사용자가 작업 중 가이드를 참조하는 패턴
2. **즉시성**: 빠른 확인 후 바로 적용 필요
3. **컨텍스트 유지**: 입력 중인 데이터 보존
4. **카카오 알림톡 특성**: 가이드라인이 복잡하여 실시간 참조 필요

## 🏗️ 구조 설계

### 모달 구조
```
📱 도움말 모달 (최대 1200px 너비)
├── 📑 헤더
│   ├── 제목: "알림톡 템플릿 가이드"
│   └── 닫기 버튼
├── 🗂️ 탭 네비게이션 (7개 섹션)
│   ├── 개요
│   ├── 작성 가이드
│   ├── 이미지 가이드
│   ├── 심사 기준
│   ├── 승인/거부 사유
│   ├── 공용 템플릿
│   └── 운영 정책
└── 📄 컨텐츠 영역 (스크롤 가능)
```

### 탭별 내용 구성

#### 1. 개요 (Overview)
- 알림톡이란?
- 템플릿 승인 프로세스
- 기본 용어 정리
- 빠른 시작 가이드

#### 2. 작성 가이드 (Content Guide)
- 텍스트 작성 규칙
- 금지 단어 및 표현
- 변수 사용법
- 버튼 설정 가이드

#### 3. 이미지 가이드 (Image Guide)
- 이미지 규격 및 용량
- 허용되는 이미지 형식
- 이미지 콘텐츠 가이드라인
- 좋은 예시 vs 나쁜 예시

#### 4. 심사 기준 (Audit Guidelines)
- 승인 기준
- 거부 사유
- 심사 프로세스
- 재심사 방법

#### 5. 승인/거부 사유 (Approval Status)
- 화이트리스트 (승인 기준)
- 블랙리스트 (거부 사유)
- 자주 거부되는 사례
- 수정 방법

#### 6. 공용 템플릿 (Public Templates)
- 공용 템플릿이란?
- 사용 방법
- 장점 및 제한사항
- 추천 템플릿

#### 7. 운영 정책 (Operations)
- 정책 업데이트 정보
- 문의 방법
- FAQ
- 고객센터 연결

## 🔧 기술적 구현 방안

### 컴포넌트 구조 및 파일 위치
```
src/
├── components/
│   └── help/                           # 도움말 전용 폴더
│       ├── HelpModal.jsx               # 메인 도움말 모달
│       ├── HelpHeader.jsx              # 모달 헤더 (제목, 닫기 버튼)
│       ├── HelpTabs.jsx                # 탭 네비게이션 (7개 탭)
│       ├── HelpContent.jsx             # 컨텐츠 컨테이너
│       └── content/                    # 각 탭별 컨텐츠 컴포넌트
│           ├── OverviewContent.jsx     # 알림톡 개요
│           ├── ContentGuideContent.jsx # 작성 가이드
│           ├── ImageGuideContent.jsx   # 이미지 가이드
│           ├── AuditContent.jsx        # 심사 기준
│           ├── ApprovalContent.jsx     # 승인/거부 사유
│           ├── PublicTemplateContent.jsx # 공용 템플릿
│           └── OperationsContent.jsx   # 운영 정책
├── hooks/
│   └── useHelp.js                      # 도움말 상태 관리 훅
└── pages/
    └── GeneratorPageV2.jsx             # 도움말 버튼 연결 (기존 파일)
```

### 파일별 역할 정의

#### 📁 `src/components/help/`
- **HelpModal.jsx**: 메인 모달 컨테이너 (배경, 크기, 애니메이션)
- **HelpHeader.jsx**: 모달 상단 (제목, 검색바, 닫기 버튼)
- **HelpTabs.jsx**: 7개 탭 네비게이션 바
- **HelpContent.jsx**: 선택된 탭의 컨텐츠를 렌더링하는 컨테이너

#### 📁 `src/components/help/content/`
각 탭별 세부 컨텐츠 컴포넌트들이 위치하는 폴더

#### 📁 `src/hooks/`
- **useHelp.js**: 모달 열기/닫기, 활성 탭, 검색 상태 관리

### 기존 파일 수정
```javascript
// src/pages/GeneratorPageV2.jsx에서 수정할 부분
// 라인 346: 도움말 버튼 (현재 href="#"로 되어 있음)

// 현재 코드:
<a
  href="#"
  className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700"
>
  <LifeBuoyIcon className="mr-3" /> <span>도움말</span>
</a>

// 변경될 코드:
<button
  onClick={() => setIsHelpOpen(true)}
  className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700"
>
  <LifeBuoyIcon className="mr-3" /> <span>도움말</span>
</button>
```

### 상태 관리
```javascript
const useHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  return {
    isOpen, setIsOpen,
    activeTab, setActiveTab,
    searchQuery, setSearchQuery
  };
};
```

### 데이터 구조
```javascript
// 각 탭의 컨텐츠를 외부 링크와 내부 설명으로 구성
const helpContent = {
  overview: {
    title: "알림톡 개요",
    description: "알림톡 서비스의 기본 개념과 템플릿 시스템",
    externalLink: "https://kakaobusiness.gitbook.io/main/ad/infotalk",
    sections: [...]
  },
  contentGuide: {
    title: "작성 가이드",
    description: "템플릿 텍스트 및 버튼 작성 규칙",
    externalLink: "https://kakaobusiness.gitbook.io/main/ad/infotalk/content-guide",
    sections: [...]
  }
  // ... 기타 탭들
};
```

## 🎯 개발 단계별 계획

### Phase 1: 기본 모달 구조 (우선순위: 높음)
- [ ] HelpModal.jsx 기본 모달 레이아웃
- [ ] 탭 네비게이션 구현
- [ ] GeneratorPageV2에서 도움말 버튼 연결
- [ ] 모달 열기/닫기 기능

### Phase 2: 컨텐츠 구현 (우선순위: 높음)
- [ ] 각 탭별 컨텐츠 컴포넌트 생성
- [ ] 카카오 가이드 링크 연동
- [ ] 기본 설명 텍스트 작성
- [ ] 외부 링크 새 창 열기

### Phase 3: 사용자 경험 개선 (우선순위: 중간)
- [ ] 검색 기능 구현
- [ ] 즐겨찾기/북마크 기능
- [ ] 최근 본 항목 기록
- [ ] 키보드 단축키 지원

### Phase 4: 고급 기능 (우선순위: 낮음)
- [ ] 오프라인 캐싱
- [ ] 다국어 지원 (영어)
- [ ] 인쇄 친화적 레이아웃
- [ ] 모바일 최적화

## 📊 카카오 가이드 링크 매핑

| 탭 | 링크 | 내용 |
|----|------|------|
| 개요 | https://kakaobusiness.gitbook.io/main/ad/infotalk | 알림톡 기본 개념 |
| 작성 가이드 | https://kakaobusiness.gitbook.io/main/ad/infotalk/content-guide | 템플릿 작성 규칙 |
| 이미지 가이드 | https://kakaobusiness.gitbook.io/main/ad/infotalk/content-guide/image | 이미지 가이드라인 |
| 심사 기준 | https://kakaobusiness.gitbook.io/main/ad/infotalk/audit | 승인/거부 기준 |
| 화이트리스트 | https://kakaobusiness.gitbook.io/main/ad/infotalk/audit/white-list | 승인 기준 |
| 블랙리스트 | https://kakaobusiness.gitbook.io/main/ad/infotalk/audit/black-list | 거부 사유 |
| 공용 템플릿 | https://kakaobusiness.gitbook.io/main/ad/infotalk/publictemplate | 공용 템플릿 가이드 |
| 운영 정책 | https://kakaobusiness.gitbook.io/main/ad/infotalk/operations | 운영 규정 |

## 🎨 UI/UX 디자인 가이드

### 모달 디자인
- **크기**: 최대 1200px 너비, 80vh 높이
- **배경**: 반투명 오버레이 (backdrop-blur)
- **애니메이션**: 부드러운 페이드인/아웃
- **스크롤**: 컨텐츠 영역만 스크롤 가능

### 색상 체계
- **기본**: 기존 프로젝트 색상 팔레트 활용
- **강조**: 카카오 브랜드 컬러 (#FEE500) 포인트 사용
- **링크**: 외부 링크는 파란색으로 구분
- **탭**: 활성 탭은 indigo-600 색상

### 타이포그래피
- **제목**: text-lg font-semibold
- **본문**: text-sm text-gray-700
- **링크**: text-blue-600 hover:text-blue-800
- **강조**: font-medium text-gray-900

### 반응형 대응
```css
/* 데스크톱 (1024px+) */
- 전체 모달 표시
- 좌우 패딩 충분히

/* 태블릿 (768px ~ 1023px) */
- 모달 너비 90%
- 탭을 스크롤 가능하게

/* 모바일 (767px 이하) */
- 전체 화면 모달
- 탭을 드롭다운으로 변경
```

## 🔍 검색 기능 설계

### 검색 범위
- 각 탭의 제목 및 설명
- 주요 키워드 태깅
- FAQ 내용

### 검색 결과 표시
- 탭별 결과 그룹핑
- 관련도 순 정렬
- 하이라이팅 표시

## 📱 접근성 고려사항

### 키보드 네비게이션
- Tab키로 탭 간 이동
- Enter/Space로 탭 활성화
- Escape키로 모달 닫기

### 스크린 리더 지원
- 모든 요소에 적절한 aria-label
- 탭 패널 역할(role) 명시
- 모달 상태 안내

### 시각적 접근성
- 충분한 색상 대비 (WCAG AA 준수)
- Focus 상태 명확히 표시
- 텍스트 크기 조절 가능

## ⚠️ 고려사항 및 제약

### 외부 링크 의존성
1. **카카오 가이드 변경**: 외부 링크가 변경될 수 있음
2. **콘텐츠 동기화**: 카카오 정책 업데이트 반영 필요
3. **링크 검증**: 정기적인 링크 유효성 검사

### 성능 고려사항
1. **모달 지연 로딩**: 필요할 때만 컨텐츠 로드
2. **이미지 최적화**: 가이드 이미지 압축
3. **캐싱 전략**: 자주 보는 컨텐츠 브라우저 캐시

### 콘텐츠 관리
1. **정기 업데이트**: 카카오 정책 변경 시 반영
2. **다국어 준비**: 향후 영어 지원 고려
3. **사용자 피드백**: 도움말 개선을 위한 피드백 수집

## 📊 예상 개발 일정

| 단계 | 소요 시간 | 누적 시간 |
|------|-----------|-----------|
| Phase 1: 기본 모달 구조 | 4-6시간 | 4-6시간 |
| Phase 2: 컨텐츠 구현 | 8-12시간 | 12-18시간 |
| Phase 3: UX 개선 | 6-8시간 | 18-26시간 |
| Phase 4: 고급 기능 | 4-6시간 | 22-32시간 |

## 🔍 검토 포인트

구현 전 검토해야 할 사항들:

1. **카카오 가이드 분석**: 각 링크의 실제 내용 파악
2. **사용자 워크플로우**: 도움말 사용 시나리오 검증
3. **모바일 사용성**: 작은 화면에서의 가독성
4. **로딩 성능**: 모달 오픈 속도 최적화
5. **브라우저 호환성**: IE11+ 지원 여부

## 🎯 최종 추천

**모달 + 탭 시스템**으로 구현하되, 다음 우선순위로 개발:

1. **1차**: 기본 모달 + 7개 탭 + 외부 링크 연동
2. **2차**: 검색 기능 + 즐겨찾기
3. **3차**: 모바일 최적화 + 접근성 개선

이 방향으로 개발하시겠습니까? 추가로 고려할 사항이나 수정이 필요한 부분이 있다면 말씀해주세요.