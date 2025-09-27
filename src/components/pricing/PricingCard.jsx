import React from 'react';
import { PLAN_COLORS } from '../../data/plans';

const PricingCard = ({ plan, currentPlan, onUpgrade, featured = false }) => {
  const colors = PLAN_COLORS[plan.color];
  const isCurrentPlan = currentPlan === plan.id;
  const canUpgrade = !isCurrentPlan && plan.id !== 'free';

  return (
    <div
      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
        featured
          ? 'border-orange-300 shadow-lg scale-105'
          : colors.border
      } ${colors.bg}`}
    >
      {/* 인기/프리미엄 배지 */}
      {plan.badge && (
        <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
          {plan.badge}
        </div>
      )}

      {/* 현재 플랜 배지 */}
      {isCurrentPlan && (
        <div className="absolute -top-3 right-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
          현재 플랜
        </div>
      )}

      {/* 플랜 이름 */}
      <div className="text-center mb-6">
        <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>
          {plan.displayName}
        </h3>
        <p className="text-gray-600 text-sm">{plan.description}</p>
      </div>

      {/* 가격 */}
      <div className="text-center mb-8">
        <div className={`text-4xl font-bold ${colors.text} mb-1`}>
          {plan.priceText}
        </div>
        {plan.billing && (
          <div className="text-gray-500 text-sm">{plan.billing}</div>
        )}
      </div>

      {/* 기능 목록 */}
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            {feature.included ? (
              <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
              {feature.name}
              {feature.value && (
                <span className="font-medium ml-1">({feature.value})</span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {/* 버튼 */}
      <div className="text-center">
        {isCurrentPlan ? (
          <button
            disabled
            className="w-full py-3 px-4 bg-green-100 text-green-800 rounded-lg font-semibold cursor-default"
          >
            현재 사용 중
          </button>
        ) : canUpgrade ? (
          <button
            onClick={() => onUpgrade?.(plan.id)}
            className={`w-full py-3 px-4 text-white rounded-lg font-semibold transition-colors duration-200 ${colors.button}`}
          >
            업그레이드
          </button>
        ) : (
          <button
            disabled
            className="w-full py-3 px-4 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
          >
            무료 플랜
          </button>
        )}
      </div>

      {/* 하이라이트 (Pro, Max 플랜) */}
      {plan.highlights && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <ul className="space-y-1">
            {plan.highlights.map((highlight, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-center">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PricingCard;