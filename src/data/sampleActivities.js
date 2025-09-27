// 시현용 샘플 활동 데이터

export const ACTIVITY_TYPES = {
  TEMPLATE_CREATED: 'template_created',
  TEMPLATE_APPROVED: 'template_approved',
  TEMPLATE_MODIFIED: 'template_modified',
  TEMPLATE_REJECTED: 'template_rejected',
  TEMPLATE_SUBMITTED: 'template_submitted'
};

export const ACTIVITY_CONFIG = {
  [ACTIVITY_TYPES.TEMPLATE_CREATED]: {
    icon: '🎯',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    message: '새 알림톡 템플릿 생성'
  },
  [ACTIVITY_TYPES.TEMPLATE_APPROVED]: {
    icon: '✅',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    message: '템플릿 승인 완료'
  },
  [ACTIVITY_TYPES.TEMPLATE_MODIFIED]: {
    icon: '✏️',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    message: '템플릿 수정'
  },
  [ACTIVITY_TYPES.TEMPLATE_REJECTED]: {
    icon: '❌',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    message: '템플릿 승인 거부'
  },
  [ACTIVITY_TYPES.TEMPLATE_SUBMITTED]: {
    icon: '📤',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    message: '템플릿 승인 요청'
  }
};

export const SAMPLE_ACTIVITIES = [
  {
    id: 'activity-1',
    type: ACTIVITY_TYPES.TEMPLATE_CREATED,
    title: '여름 할인 이벤트 알림',
    description: '템플릿이 성공적으로 생성되었습니다',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2시간 전
    templateId: 'template-001'
  },
  {
    id: 'activity-2',
    type: ACTIVITY_TYPES.TEMPLATE_APPROVED,
    title: '신제품 출시 안내',
    description: '관리자 승인이 완료되었습니다',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5시간 전
    templateId: 'template-002'
  },
  {
    id: 'activity-3',
    type: ACTIVITY_TYPES.TEMPLATE_SUBMITTED,
    title: '배송 완료 알림',
    description: '승인 요청이 제출되었습니다',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 어제
    templateId: 'template-003'
  },
  {
    id: 'activity-4',
    type: ACTIVITY_TYPES.TEMPLATE_MODIFIED,
    title: '회원가입 환영 메시지',
    description: '변수 설정이 업데이트되었습니다',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2일 전
    templateId: 'template-004'
  },
  {
    id: 'activity-5',
    type: ACTIVITY_TYPES.TEMPLATE_APPROVED,
    title: '주문 확인 알림',
    description: '템플릿 검토가 완료되어 승인되었습니다',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3일 전
    templateId: 'template-005'
  },
  {
    id: 'activity-6',
    type: ACTIVITY_TYPES.TEMPLATE_REJECTED,
    title: '이벤트 당첨 알림',
    description: '템플릿 내용 수정이 필요합니다',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4일 전
    templateId: 'template-006'
  }
];

// 시간 포맷팅 함수
export const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const diffInMs = now - timestamp;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays === 1) {
    return '어제';
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  } else {
    return timestamp.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric'
    });
  }
};

// 활동 메시지 생성 함수
export const getActivityMessage = (type) => {
  return ACTIVITY_CONFIG[type]?.message || '알 수 없는 활동';
};