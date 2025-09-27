// 플랜 정보 상수 정의
export const PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    displayName: '무료',
    price: 0,
    priceText: '무료',
    badge: null,
    color: 'gray',
    description: '개인 사용자를 위한 기본 플랜',
    features: [
      { name: '월 템플릿 생성', value: '10개', included: true },
      { name: 'AI 모델', value: '기본', included: true },
      { name: '템플릿 저장', value: '5개', included: true },
      { name: '고객 지원', value: '이메일', included: true },
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
    description: '비즈니스 사용자를 위한 고급 플랜',
    features: [
      { name: '월 템플릿 생성', value: '100개', included: true },
      { name: 'AI 모델', value: '고급', included: true },
      { name: '템플릿 저장', value: '50개', included: true },
      { name: '고객 지원', value: '우선 지원', included: true },
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
    description: '대규모 팀을 위한 프리미엄 플랜',
    features: [
      { name: '템플릿 생성', value: '무제한', included: true },
      { name: 'AI 모델', value: '최신', included: true },
      { name: '템플릿 저장', value: '무제한', included: true },
      { name: '고객 지원', value: '전용 매니저', included: true },
      { name: '버전 관리', value: '고급', included: true },
      { name: '팀 협업', value: '무제한', included: true },
      { name: 'API 접근', value: '고급', included: true }
    ],
    highlights: [
      '대용량 비즈니스용',
      '모든 기능 무제한 사용',
      '전용 고객 지원 매니저'
    ]
  }
};

// 플랜 순서 (표시용)
export const PLAN_ORDER = ['free', 'pro', 'max'];

// 플랜 색상 매핑
export const PLAN_COLORS = {
  gray: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-900',
    button: 'bg-gray-600 hover:bg-gray-700',
    badge: 'bg-gray-100 text-gray-800'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-900',
    button: 'bg-orange-600 hover:bg-orange-700',
    badge: 'bg-orange-100 text-orange-800'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-900',
    button: 'bg-purple-600 hover:bg-purple-700',
    badge: 'bg-purple-100 text-purple-800'
  }
};

// 사용자 현재 플랜 (임시)
export const getCurrentUserPlan = () => {
  // TODO: 실제 API에서 사용자 플랜 정보 가져오기
  return 'free';
};