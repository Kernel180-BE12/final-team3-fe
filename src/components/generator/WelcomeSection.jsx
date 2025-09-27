import React from 'react';

// 아이콘 컴포넌트들
const SparklesIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3z" />
    <path d="M3 12L4.5 9.5L7 8L4.5 6.5L3 4" />
    <path d="M17 20L19.5 18.5L21 16L19.5 13.5L17 12" />
  </svg>
);

const ExampleCard = ({ icon, title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-indigo-300 transition-all duration-200 cursor-pointer group"
    >
      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 text-base">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const WelcomeSection = ({ onExampleClick }) => {
  const examples = [
    {
      icon: "🛍️",
      title: "쇼핑몰 주문 확인",
      description: "고객님의 주문이 접수되었습니다. 주문 번호와 배송 정보를 안내합니다.",
      prompt: "쇼핑몰 주문 확인 알림톡 템플릿을 생성해주세요. 주문번호, 상품명, 배송정보를 포함해주세요."
    },
    {
      icon: "📦",
      title: "배송 알림",
      description: "상품이 배송 중입니다. 배송 현황을 실시간으로 확인하세요.",
      prompt: "배송 시작 알림톡 템플릿을 생성해주세요. 송장번호와 예상 도착시간을 포함해주세요."
    },
    {
      icon: "🎉",
      title: "이벤트 안내",
      description: "특별 할인 혜택을 놓치지 마세요. 한정 기간 이벤트 진행 중!",
      prompt: "할인 이벤트 안내 알림톡 템플릿을 생성해주세요. 할인율과 이벤트 기간을 포함해주세요."
    }
  ];

  return (
    <div className="text-center py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 메인 헤더 */}
        <div className="mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <SparklesIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI 알림톡 템플릿 생성
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            원하는 내용을 설명해주시면 카카오톡 알림톡 템플릿을 자동으로 생성해드립니다.
          </p>
        </div>

        {/* 예시 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {examples.map((example, index) => (
            <ExampleCard
              key={index}
              icon={example.icon}
              title={example.title}
              description={example.description}
              onClick={() => onExampleClick?.(example.prompt)}
            />
          ))}
        </div>

        {/* 사용 팁 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-2xl mx-auto">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">💡</span>
              </div>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-blue-900 mb-2">효과적인 템플릿 생성 팁</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>구체적인 목적</strong>을 명시해주세요 (주문 확인, 배송 알림 등)</li>
                <li>• <strong>대상 고객</strong>을 설명해주세요 (신규 고객, 기존 회원 등)</li>
                <li>• <strong>포함할 정보</strong>를 나열해주세요 (주문번호, 날짜, 링크 등)</li>
                <li>• 마지막에 <strong>'템플릿 생성'</strong> 문구를 함께 입력해주세요</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 시작 안내 */}
        <div className="mt-8">
          <p className="text-gray-500 text-sm">
            아래 입력창에 내용을 작성하고 전송 버튼을 눌러보세요 ↓
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;