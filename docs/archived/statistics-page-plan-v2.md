# 템플릿 승인 통계 페이지 개발 계획서 v2.0

## 📋 프로젝트 개요 (수정됨)

**목적**: KakaoTalk 알림톡 템플릿의 승인 프로세스 및 관리 현황을 통계로 시각화하여 운영 효율성을 분석

**대상**: 템플릿 관리자, 운영팀, 비즈니스 오너

**핵심 관점**: 템플릿 생명주기 관리 및 승인 프로세스 최적화

---

## 🏷 템플릿 상태 정의

### 상태 흐름 (State Flow)
```
CREATED → APPROVE_REQUESTED → APPROVED
                ↓
              REJECTED
                ↓
            (수정 후 재요청)
                ↓
        APPROVE_REQUESTED → APPROVED

모든 상태에서 → DELETED 가능
```

### 상태별 의미
- **CREATED**: 템플릿 생성 완료, 검토 전
- **APPROVE_REQUESTED**: 승인 요청 제출
- **APPROVED**: 카카오 승인 완료, 사용 가능
- **REJECTED**: 카카오 거절, 수정 필요
- **DELETED**: 템플릿 삭제 (사용자 또는 관리자)

---

## 🎯 핵심 KPI 및 메트릭스

### 1. 상태 분포 현황 (Status Distribution)
- **전체 템플릿 수**: 총 생성된 템플릿 개수
- **상태별 분포**: 각 상태별 템플릿 수 및 비율
- **활성 템플릿 비율**: APPROVED / (전체 - DELETED) × 100

### 2. 승인 프로세스 효율성 (Approval Efficiency)
- **승인률**: APPROVED / APPROVE_REQUESTED × 100
- **거절률**: REJECTED / APPROVE_REQUESTED × 100
- **평균 승인 소요시간**: APPROVE_REQUESTED → APPROVED 시간
- **평균 검토 소요시간**: CREATED → APPROVE_REQUESTED 시간

### 3. 템플릿 생성 활동 (Creation Activity)
- **일별 생성량**: 날짜별 신규 템플릿 생성 수
- **주간/월간 트렌드**: 시간대별 생성 패턴
- **생성 완료율**: CREATED 상태에서 실제 승인 요청까지의 비율

### 4. 품질 지표 (Quality Metrics)
- **1차 승인률**: 최초 요청에서 바로 승인되는 비율
- **재요청 횟수**: 거절 후 재요청 평균 횟수
- **카테고리별 승인률**: 템플릿 유형별 승인 성공률

---

## 📊 페이지 구성 및 시각화

### 1. 페이지 레이아웃 구조
```
Header (기간 선택, 전체/카테고리 필터)
├── Status Overview Cards (4개 주요 지표)
├── Template Status Flow Diagram (상태 전환 플로우)
├── Charts Section
│   ├── 상태별 분포 (Donut Chart)
│   ├── 승인 트렌드 (Line Chart)
│   ├── 승인 소요시간 분포 (Histogram)
│   └── 카테고리별 승인률 (Bar Chart)
├── Process Analysis
│   ├── 승인 프로세스 깔때기 (Funnel Chart)
│   ├── 거절 사유 분석 (Treemap/Bar Chart)
│   └── 시간대별 활동 히트맵
└── Recent Template Activity (최근 상태 변경 로그)
```

### 2. 새로운 차트 및 시각화
- **상태 플로우 다이어그램**: Sankey 차트로 상태 전환 시각화
- **깔때기 차트**: 승인 프로세스 단계별 전환율
- **히스토그램**: 승인 소요시간 분포
- **히트맵**: 요일 × 시간대별 템플릿 활동
- **트리맵**: 거절 사유별 비중

### 3. 인터랙티브 요소
- **상태 필터**: 특정 상태의 템플릿만 보기
- **카테고리 필터**: 프로모션, 알림, 안내 등 유형별
- **기간 선택**: 7일/30일/90일/전체 기간
- **드릴다운**: 차트 클릭 시 상세 템플릿 목록
- **상태 변경 이력**: 개별 템플릿의 상태 변경 타임라인

---

## 🎨 KakaoTalk 비즈니스 관리자 스타일

### 1. 관리자 대시보드 특징
- **데이터 집약적**: 많은 정보를 효율적으로 표시
- **액션 지향적**: 문제 상황을 빠르게 파악하고 액션 가능
- **상태 중심**: 색상으로 상태를 직관적으로 구분
- **트렌드 분석**: 시간에 따른 변화 패턴 강조

### 2. 색상 시스템 (상태별)
```css
/* 상태별 색상 정의 */
CREATED: #FFF3CD (노란색 - 대기)
APPROVE_REQUESTED: #CCE5FF (파란색 - 진행중)
APPROVED: #D4EDDA (초록색 - 성공)
REJECTED: #F8D7DA (빨간색 - 거절)
DELETED: #E2E3E5 (회색 - 비활성)

/* KakaoTalk 브랜드 컬러 활용 */
Primary: #FEE500 (액센트 색상)
Success: #28A745 (승인)
Warning: #FFC107 (대기/검토중)
Danger: #DC3545 (거절)
Info: #17A2B8 (정보)
```

### 3. 컴포넌트 스타일
- **상태 뱃지**: 둥근 모서리, 아이콘 포함
- **프로그레스 링**: 승인률을 원형 진행률로 표시
- **상태 카드**: 좌측 색상 바로 상태 구분
- **알림 표시**: 문제 상황 (낮은 승인률, 지연) 강조

---

## 📊 확장된 메트릭스 아이디어

### 1. 운영 효율성 지표
- **템플릿 생산성**: 일평균 승인 완료 템플릿 수
- **리드 타임**: 생성부터 승인까지 전체 소요 시간
- **작업 백로그**: 승인 대기 중인 템플릿 적체 현황
- **재작업률**: 거절 후 수정하여 재요청하는 비율

### 2. 품질 관리 지표
- **승인 일관성**: 동일 카테고리 내 승인률 편차
- **검토자 간 편차**: 검토자별 승인/거절 패턴 차이
- **시간대별 승인률**: 검토 시간에 따른 승인률 변화
- **복잡도 지표**: 템플릿 길이/버튼 수에 따른 승인률

### 3. 비즈니스 인사이트
- **계절성 분석**: 월별/분기별 템플릿 생성 패턴
- **사용자 행동**: 거절 후 재시도 vs 포기 비율
- **템플릿 수명**: 승인 후 삭제까지 평균 기간
- **성과 예측**: 승인률 트렌드 기반 예측

### 4. 알림 및 액션 아이템
- **지연 알림**: 승인 요청 후 X일 경과 시 알림
- **품질 저하 감지**: 승인률 급감 시 경고
- **용량 관리**: 승인된 템플릿 수 한도 관리
- **컴플라이언스**: 정책 위반 가능성 있는 템플릿 플래그

---

## 🛠 기술적 구현 방안 (업데이트)

### 1. 데이터 구조
```typescript
interface TemplateStatistics {
  summary: {
    totalTemplates: number;
    statusDistribution: {
      CREATED: number;
      APPROVE_REQUESTED: number;
      APPROVED: number;
      REJECTED: number;
      DELETED: number;
    };
    approvalRate: number;
    averageApprovalTime: number; // 시간 (시간 단위)
    activeTemplates: number;
  };
  trends: {
    date: string;
    created: number;
    approveRequested: number;
    approved: number;
    rejected: number;
  }[];
  approvalFunnel: {
    created: number;
    requested: number;
    approved: number;
    rejected: number;
  };
  rejectionReasons: {
    reason: string;
    count: number;
    percentage: number;
  }[];
  categoryStats: {
    category: string;
    total: number;
    approvalRate: number;
    averageTime: number;
  }[];
  recentActivity: {
    templateId: string;
    templateName: string;
    previousStatus: TemplateStatus;
    currentStatus: TemplateStatus;
    timestamp: string;
    reason?: string;
  }[];
}
```

### 2. 새로운 차트 컴포넌트
- **SankeyChart**: 상태 전환 플로우 (react-vis 또는 커스텀)
- **FunnelChart**: 승인 프로세스 깔때기
- **Histogram**: 승인 소요시간 분포
- **Heatmap**: 시간대별 활동 패턴
- **ProgressRing**: 원형 진행률 표시

### 3. 상태 관리
```javascript
// 상태별 필터링 및 실시간 업데이트
const useTemplateStatistics = () => {
  const [filters, setFilters] = useState({
    dateRange: '30d',
    status: 'all',
    category: 'all'
  });

  const { data, isLoading } = useQuery(
    ['templateStats', filters],
    () => fetchTemplateStatistics(filters),
    {
      refetchInterval: 30000, // 30초마다 업데이트
      keepPreviousData: true
    }
  );
};
```

---

## 📁 폴더 구조 (업데이트)

```
src/
├── pages/
│   └── StatisticsPage.jsx
├── components/
│   └── statistics/
│       ├── StatusOverviewCards.jsx
│       ├── StatusDistributionChart.jsx
│       ├── ApprovalTrendChart.jsx
│       ├── ApprovalFunnelChart.jsx
│       ├── RejectionAnalysis.jsx
│       ├── CategoryPerformance.jsx
│       ├── ActivityHeatmap.jsx
│       └── RecentActivity.jsx
├── data/
│   └── mock/
│       ├── templateStatistics.json
│       ├── rejectionReasons.json
│       └── templateActivity.json
├── hooks/
│   ├── useTemplateStatistics.js
│   └── useStatusFilters.js
└── utils/
    ├── statusHelpers.js
    ├── timeCalculations.js
    └── chartConfigs.js
```

---

## 📊 Mock 데이터 시나리오

### 1. 현실적인 승인 프로세스 시뮬레이션
- **승인률**: 75-85% (현실적 수치)
- **거절률**: 15-25% (정책 위반, 형식 오류 등)
- **평균 승인 시간**: 2-5일 (카카오 검토 기간)
- **재요청 비율**: 거절된 것 중 60% 정도 재요청

### 2. 거절 사유 카테고리
```json
{
  "rejectionReasons": [
    {
      "reason": "광고성 내용 포함",
      "count": 45,
      "percentage": 35.2
    },
    {
      "reason": "개인정보 수집 명시 부족",
      "count": 28,
      "percentage": 21.9
    },
    {
      "reason": "템플릿 형식 오류",
      "count": 25,
      "percentage": 19.5
    },
    {
      "reason": "부적절한 표현",
      "count": 18,
      "percentage": 14.1
    },
    {
      "reason": "기타",
      "count": 12,
      "percentage": 9.4
    }
  ]
}
```

### 3. 템플릿 카테고리별 데이터
- **주문/배송 알림**: 승인률 95% (표준화된 형식)
- **프로모션/마케팅**: 승인률 65% (광고성 검토 엄격)
- **시스템 알림**: 승인률 90% (안전한 내용)
- **고객 서비스**: 승인률 80% (개인정보 관련 주의)

---

## 🎯 시연 시나리오

### 1. 대시보드 스토리텔링
1. **전체 현황**: "현재 총 300개 템플릿 중 85%가 승인 완료"
2. **문제 인식**: "프로모션 카테고리 승인률이 65%로 낮음"
3. **원인 분석**: "주요 거절 사유는 광고성 내용 포함"
4. **트렌드 확인**: "지난 주부터 승인률이 개선되는 추세"
5. **액션 플랜**: "템플릿 작성 가이드라인 업데이트 필요"

### 2. 인터랙션 시연
- 상태별 필터링으로 거절된 템플릿들만 보기
- 카테고리별 드릴다운으로 문제 영역 파악
- 시간대별 히트맵으로 최적 제출 시간 분석
- 최근 활동에서 실시간 상태 변경 확인

---

## 📅 개발 일정 (수정됨)

### Phase 1: 핵심 통계 (2-3일)
1. **상태별 분포 차트** (도넛 차트)
2. **KPI 카드 4개** (총 템플릿, 승인률, 평균 소요시간, 활성 템플릿)
3. **승인 트렌드 차트** (라인 차트)
4. **Mock 데이터 생성** (3개월치)

### Phase 2: 프로세스 분석 (2-3일)
1. **승인 깔때기 차트** 구현
2. **거절 사유 분석** 차트
3. **카테고리별 성과** 바 차트
4. **필터링 시스템** (상태, 카테고리, 기간)

### Phase 3: 고급 기능 (1-2일)
1. **활동 히트맵** (시간대별)
2. **최근 활동 로그** 테이블
3. **반응형 디자인** 완성
4. **애니메이션 및 인터랙션**

---

## 💡 추가 기능 아이디어

### 1. 관리 기능
- **대량 상태 변경**: 선택된 템플릿들을 일괄 처리
- **승인 예상 시간**: 현재 대기열 기반 예상 시간 계산
- **템플릿 복제**: 승인된 템플릿 기반으로 새 템플릿 생성
- **가이드라인 링크**: 거절 사유별 개선 가이드 제공

### 2. 알림 시스템
- **슬랙/이메일 연동**: 상태 변경 시 알림
- **일일/주간 리포트**: 통계 요약 자동 발송
- **임계치 알림**: 승인률 저하, 대기 시간 증가 시 경고

### 3. 데이터 내보내기
- **CSV/Excel 다운로드**: 통계 데이터 추출
- **PDF 리포트**: 주간/월간 통계 보고서 생성
- **API 연동**: 다른 시스템과 데이터 연동

---

**작성일**: 2025-09-26
**문서 버전**: 2.0
**변경사항**: 알림톡 발송 통계 → 템플릿 승인 프로세스 통계로 전면 수정