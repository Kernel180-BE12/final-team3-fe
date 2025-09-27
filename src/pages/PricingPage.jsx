import React, { useState } from 'react';
import BackButton from '../components/pricing/BackButton';
import PricingCards from '../components/pricing/PricingCards';
import { getCurrentUserPlan } from '../data/plans';

const PricingPage = () => {
  // 현재 사용자 플랜 (임시로 하드코딩, 추후 useAuth에서 가져올 예정)
  const [currentPlan] = useState(getCurrentUserPlan());

  // 플랜 업그레이드 핸들러
  const handleUpgrade = (planId) => {
    // TODO: 실제 업그레이드 로직 구현
    // 1. 결제 페이지로 이동
    // 2. 또는 결제 모달 표시
    // 3. 결제 완료 후 플랜 업데이트

    console.log(`Upgrading to ${planId} plan`);
    alert(`${planId} 플랜으로 업그레이드를 진행합니다. (결제 시스템 연동 예정)`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 메인 컨테이너 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 뒤로가기 버튼 */}
        <BackButton />

        {/* 페이지 제목 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            알맞은 플랜을 선택하세요
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            더 많은 템플릿과 고급 기능을 이용해보세요.
            언제든지 플랜을 변경할 수 있습니다.
          </p>
        </div>

        {/* 플랜 카드들 */}
        <PricingCards
          currentPlan={currentPlan}
          onUpgrade={handleUpgrade}
        />

        {/* 하단 안내 */}
        <div className="mt-16 text-center">
          <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              더 궁금한 점이 있으신가요?
            </h3>
            <p className="text-gray-600 mb-6">
              플랜 선택이나 기능에 대해 더 자세히 알고 싶으시면 언제든 연락주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@company.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                이메일 문의
              </a>
              <button
                onClick={() => alert('라이브 채팅 기능 준비 중입니다.')}
                className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                라이브 채팅
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;