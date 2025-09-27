import React from 'react';
import PricingCard from './PricingCard';
import { PLANS, PLAN_ORDER } from '../../data/plans';

const PricingCards = ({ currentPlan, onUpgrade }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 플랜 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PLAN_ORDER.map((planId) => {
          const plan = PLANS[planId];
          const featured = planId === 'pro'; // Pro 플랜을 인기 플랜으로 강조

          return (
            <PricingCard
              key={planId}
              plan={plan}
              currentPlan={currentPlan}
              onUpgrade={onUpgrade}
              featured={featured}
            />
          );
        })}
      </div>

      {/* 추가 정보 */}
      <div className="mt-12 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-2xl mx-auto">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-blue-900 mb-2">플랜 변경 안내</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>언제든 변경 가능</strong>: 플랜은 언제든지 업그레이드하거나 다운그레이드할 수 있습니다</li>
                <li>• <strong>즉시 적용</strong>: 플랜 변경 시 새로운 기능이 즉시 적용됩니다</li>
                <li>• <strong>비례 환불</strong>: 다운그레이드 시 남은 기간에 대해 비례 환불해드립니다</li>
                <li>• <strong>무료 체험</strong>: Pro 플랜은 7일 무료 체험이 가능합니다</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 자주 묻는 질문 */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">자주 묻는 질문</h3>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">플랜을 변경하면 기존 템플릿은 어떻게 되나요?</h4>
            <p className="text-gray-600 text-sm">
              기존에 생성한 템플릿은 그대로 유지됩니다. 다만 저장 개수 제한이 있는 플랜으로 다운그레이드하는 경우,
              제한을 초과하는 템플릿은 읽기 전용으로 변경됩니다.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">월 중간에 플랜을 변경하면 요금은 어떻게 계산되나요?</h4>
            <p className="text-gray-600 text-sm">
              업그레이드 시에는 남은 기간에 대해 차액만 결제하고, 다운그레이드 시에는 남은 기간에 대해 비례 환불됩니다.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">API 사용량은 어떻게 확인할 수 있나요?</h4>
            <p className="text-gray-600 text-sm">
              대시보드에서 현재 사용량과 제한을 실시간으로 확인할 수 있습니다. 제한에 가까워지면 이메일로 알림을 보내드립니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCards;