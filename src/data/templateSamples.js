// 카테고리별 템플릿 샘플 데이터

export const templateSamples = {
  business: {
    title: "회의 일정 안내",
    content: "안녕하세요 #{수신자명}님,\n\n요청하신 회의 일정을 안내드립니다.",
    details: "▶ 회의 주제: #{회의주제}\n▶ 일시: #{회의일시}\n▶ 장소: #{회의장소}\n▶ 참석자: #{참석자명단}",
    footer: "※ 본 메시지는 회의 참석 대상자에게 발송되는 안내입니다.",
    buttons: [
      {
        text: "참석 확인",
        type: "primary"
      },
      {
        text: "일정 변경",
        type: "secondary"
      }
    ],
    icon: "📋",
    category: "비즈니스"
  },

  marketing: {
    title: "특별 할인 혜택 안내",
    content: "안녕하세요, #{고객명}님\n\n특별한 할인 혜택을 안내드립니다.",
    details: "▶ 할인율: #{할인율}\n▶ 할인 기간: #{할인기간}\n▶ 적용 상품: #{상품명}\n▶ 쿠폰 코드: #{쿠폰코드}",
    footer: "※ 본 메시지는 회원님께 발송되는 혜택 안내입니다.",
    buttons: [
      {
        text: "지금 주문하기",
        type: "primary"
      },
      {
        text: "상품 보기",
        type: "secondary"
      }
    ],
    icon: "🛒",
    category: "마케팅"
  },

  notice: {
    title: "시스템 점검 안내",
    content: "안녕하세요. #{수신자명}님.\n\n시스템 점검 일정을 안내드립니다.",
    details: "▶ 점검 일시: #{점검일시}\n▶ 점검 시간: #{점검시간}\n▶ 점검 내용: #{점검내용}\n▶ 영향 서비스: #{영향서비스}",
    footer: "※ 본 메시지는 서비스 이용자에게 발송되는 안내입니다.",
    buttons: [
      {
        text: "자세히 보기",
        type: "primary"
      },
      {
        text: "고객센터",
        type: "secondary"
      }
    ],
    icon: "🔧",
    category: "공지사항"
  }
};

// 카카오톡 스타일 색상 팔레트
export const kakaoColors = {
  yellow: "#FEE500",          // 카카오 메인 옐로우
  darkYellow: "#F5D000",      // 진한 옐로우
  brown: "#3A1D1D",           // 카카오 브라운
  lightBrown: "#8B4513",      // 연한 브라운
  gray: "#F8F9FA",            // 배경 그레이
  darkGray: "#495057",        // 텍스트 그레이
  white: "#FFFFFF",           // 화이트
  black: "#212529"            // 블랙
};

// 카카오톡 스타일 폰트 크기
export const kakaoFontSizes = {
  small: "13px",
  medium: "15px",
  large: "17px",
  title: "16px",
  subtitle: "14px",
  caption: "12px"
};

// 카카오톡 스타일 간격
export const kakaoSpacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  xxl: "24px"
};