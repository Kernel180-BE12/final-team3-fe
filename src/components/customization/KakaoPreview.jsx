import React from "react";
import { templateSamples, kakaoColors, kakaoFontSizes, kakaoSpacing } from "../../data/templateSamples";

const KakaoPreview = ({ settings }) => {
  // 현재 카테고리에 맞는 템플릿 가져오기
  const currentTemplate = templateSamples[settings.defaults.category] || templateSamples.business;

  // 카카오 알림톡 공식 색상 (가이드 기준)
  const getKakaoColors = () => {
    if (settings.style.theme === 'dark') {
      return {
        background: '#2C2C2C',           // 카카오톡 다크 배경
        cardBackground: '#3A3A3A',       // 메시지 배경
        logoBackground: '#F9F9F9',       // 로고 영역 (항상 밝음)
        text: '#FFFFFF',                 // 주요 텍스트
        subtext: '#B8B8B8',             // 보조 텍스트
        border: '#4A4A4A',              // 테두리
        button: settings.style.primaryColor, // 버튼 색상
        buttonText: '#FFFFFF'            // 버튼 텍스트
      };
    }
    return {
      background: '#F7F7F7',           // 카카오톡 기본 배경
      cardBackground: '#FFFFFF',       // 메시지 배경
      logoBackground: '#F9F9F9',       // 로고 영역 배경
      text: '#333333',                 // 주요 텍스트
      subtext: '#888888',             // 보조 텍스트
      border: '#E5E5E5',              // 테두리
      button: settings.style.primaryColor, // 버튼 색상
      buttonText: '#FFFFFF'            // 버튼 텍스트
    };
  };

  const kakaoColors = getKakaoColors();

  // 폰트 크기 매핑
  const getFontSize = (type = 'medium') => {
    const sizeMap = {
      small: kakaoFontSizes.small,
      medium: kakaoFontSizes.medium,
      large: kakaoFontSizes.large
    };
    return sizeMap[settings.style.fontSize] || sizeMap[type];
  };

  // 버튼 스타일 생성
  const getButtonStyle = (buttonType) => {
    const baseStyle = {
      padding: `${kakaoSpacing.sm} ${kakaoSpacing.lg}`,
      borderRadius: settings.style.buttonStyle === 'rounded' ? '20px' : '8px',
      border: 'none',
      fontSize: kakaoFontSizes.subtitle,
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '80px'
    };

    if (buttonType === 'primary') {
      return {
        ...baseStyle,
        backgroundColor: settings.style.primaryColor,
        color: '#FFFFFF',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      };
    }

    return {
      ...baseStyle,
      backgroundColor: 'transparent',
      color: settings.style.primaryColor,
      border: `1px solid ${settings.style.primaryColor}`
    };
  };

  // 레이아웃에 따른 간격 조정
  const getSpacing = (size) => {
    const multiplier = settings.style.layout === 'spacious' ? 1.5 : 1;
    const baseValue = parseInt(kakaoSpacing[size]);
    return `${Math.round(baseValue * multiplier)}px`;
  };

  return (
    <div
      className="w-full max-w-sm mx-auto"
      style={{
        backgroundColor: kakaoColors.background,
        padding: getSpacing('sm'),
        borderRadius: '8px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* 카카오 알림톡 메시지 카드 */}
      <div
        style={{
          backgroundColor: kakaoColors.cardBackground,
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          border: `1px solid ${kakaoColors.border}`,
          overflow: 'hidden'
        }}
      >
        {/* 로고형 이미지 영역 */}
        <div
          style={{
            backgroundColor: kakaoColors.logoBackground,
            padding: getSpacing('md'),
            textAlign: 'center',
            borderBottom: `1px solid ${kakaoColors.border}`
          }}
        >
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#333333'
          }}>
            {currentTemplate.icon} {settings.defaults.companyName || '[회사명]'}
          </div>
        </div>

        {/* 메시지 본문 영역 */}
        <div style={{ padding: getSpacing('lg') }}>
          {/* 메시지 제목 */}
          <div
            style={{
              fontSize: getFontSize(),
              fontWeight: '600',
              color: kakaoColors.text,
              marginBottom: getSpacing('md'),
              lineHeight: '1.4'
            }}
          >
            {currentTemplate.title}
          </div>

          {/* 기본형 메시지 내용 (1,300자 제한) */}
          <div
            style={{
              fontSize: kakaoFontSizes.subtitle,
              color: kakaoColors.text,
              marginBottom: getSpacing('lg'),
              lineHeight: '1.6',
              whiteSpace: 'pre-line'
            }}
          >
            {currentTemplate.content.replace(/#{(\w+)}/g, (match, varName) => {
              const varMap = {
                '수신자명': settings.defaults.companyName || '홍길동',
                '고객명': settings.defaults.companyName || '홍길동',
                '회사명': settings.defaults.companyName || '[회사명]'
              };
              return varMap[varName] || `[${varName}]`;
            })}
          </div>

          {/* 상세 정보 영역 */}
          <div
            style={{
              fontSize: kakaoFontSizes.subtitle,
              color: kakaoColors.text,
              marginBottom: getSpacing('lg'),
              lineHeight: '1.6',
              whiteSpace: 'pre-line'
            }}
          >
            {currentTemplate.details.replace(/#{(\w+)}/g, (match, varName) => {
              const varMaps = {
                business: {
                  '회의주제': '월간 성과 검토 회의',
                  '회의일시': '2024년 12월 15일 오후 2시',
                  '회의장소': '본사 2층 회의실',
                  '참석자명단': '팀장, 부장, 실무진 5명'
                },
                marketing: {
                  '할인율': '30%',
                  '할인기간': '12월 1일 ~ 12월 31일',
                  '상품명': '겨울 의류 전상품',
                  '쿠폰코드': 'WINTER2024'
                },
                notice: {
                  '점검일시': '2024년 12월 1일',
                  '점검시간': '새벽 2시 ~ 6시 (4시간)',
                  '점검내용': '서버 성능 개선 및 보안 업데이트',
                  '영향서비스': '전체 서비스 일시 중단'
                }
              };

              const categoryMap = varMaps[settings.defaults.category] || varMaps.business;
              return categoryMap[varName] || `[${varName}]`;
            })}
          </div>

          {/* 액션 버튼들 */}
          <div style={{
            display: 'flex',
            gap: getSpacing('sm'),
            marginBottom: getSpacing('md'),
            flexWrap: 'wrap'
          }}>
            {currentTemplate.buttons.map((button, index) => (
              <button
                key={index}
                style={{
                  padding: `${getSpacing('sm')} ${getSpacing('lg')}`,
                  borderRadius: settings.style.buttonStyle === 'rounded' ? '20px' : '4px',
                  border: button.type === 'primary' ? 'none' : `1px solid ${kakaoColors.button}`,
                  fontSize: kakaoFontSizes.subtitle,
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: button.type === 'primary' ? kakaoColors.button : 'transparent',
                  color: button.type === 'primary' ? kakaoColors.buttonText : kakaoColors.button,
                  minWidth: '80px',
                  flex: 1
                }}
                onMouseEnter={(e) => {
                  if (button.type === 'primary') {
                    e.target.style.opacity = '0.9';
                  } else {
                    e.target.style.backgroundColor = kakaoColors.button + '10';
                  }
                }}
                onMouseLeave={(e) => {
                  if (button.type === 'primary') {
                    e.target.style.opacity = '1';
                  } else {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {button.text}
              </button>
            ))}
          </div>

          {/* 안내 문구 */}
          <div
            style={{
              fontSize: kakaoFontSizes.caption,
              color: kakaoColors.subtext,
              marginBottom: getSpacing('sm'),
              lineHeight: '1.4'
            }}
          >
            {currentTemplate.footer}
          </div>
        </div>

        {/* 보조 정보 영역 (500자 제한) */}
        <div
          style={{
            backgroundColor: kakaoColors.logoBackground,
            padding: getSpacing('md'),
            borderTop: `1px solid ${kakaoColors.border}`,
            fontSize: kakaoFontSizes.caption,
            color: '#666666',
            textAlign: 'center'
          }}
        >
          문의: {settings.defaults.contactInfo || '[연락처]'}
        </div>
      </div>

      {/* 미리보기 정보 */}
      <div style={{
        marginTop: getSpacing('md'),
        textAlign: 'center',
        fontSize: kakaoFontSizes.caption,
        color: kakaoColors.subtext
      }}>
        <div style={{ marginBottom: getSpacing('xs') }}>
          📱 카카오 알림톡 미리보기
        </div>
        <div style={{ fontSize: '11px' }}>
          {settings.style.theme === 'dark' ? '다크' : '라이트'} •
          {settings.style.fontSize === 'small' ? '작게' :
           settings.style.fontSize === 'large' ? '크게' : '보통'} •
          {currentTemplate.category}
        </div>
        <div style={{
          fontSize: '10px',
          marginTop: getSpacing('xs'),
          opacity: 0.7
        }}>
          기본형 템플릿 (최대 1,300자)
        </div>
      </div>
    </div>
  );
};

export default KakaoPreview;