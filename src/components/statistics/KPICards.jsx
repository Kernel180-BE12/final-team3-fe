import React from 'react';

const KPICard = ({ title, value, icon, color, subtitle, trend }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    indigo: 'bg-indigo-500',
    red: 'bg-red-500'
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`w-8 h-8 ${colorClasses[color]} rounded-md flex items-center justify-center`}>
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                {trend && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${trendColors[trend.type]}`}>
                    <svg
                      className={`w-3 h-3 flex-shrink-0 self-center ${trend.type === 'up' ? '' : 'transform rotate-180'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414 6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="sr-only">
                      {trend.type === 'up' ? 'Increased' : 'Decreased'} by
                    </span>
                    {trend.value}
                  </div>
                )}
              </dd>
              {subtitle && (
                <dd className="text-sm text-gray-600 mt-1">
                  {subtitle}
                </dd>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function KPICards({ data }) {
  if (!data) return null;

  const { summary } = data;

  // 상태별 분포 계산
  const statusData = summary.statusDistribution;
  const processingTemplates = statusData.CREATED + statusData.APPROVE_REQUESTED;
  const processedTemplates = statusData.APPROVED + statusData.REJECTED;

  // 대기 중인 템플릿 계산
  const pendingTemplates = statusData.CREATED + statusData.APPROVE_REQUESTED;
  const pendingPercentage = ((pendingTemplates / summary.totalTemplates) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* 총 템플릿 수 */}
      <KPICard
        title="총 템플릿 수"
        value={`${summary.totalTemplates.toLocaleString()}개`}
        subtitle={`활성: ${summary.activeTemplates}개`}
        color="blue"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
        trend={{
          type: 'up',
          value: '+12개'
        }}
      />

      {/* 승인률 */}
      <KPICard
        title="전체 승인률"
        value={`${summary.approvalRate}%`}
        subtitle={`${statusData.APPROVED}개 승인 완료`}
        color="green"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        trend={{
          type: 'up',
          value: '+2.3%'
        }}
      />

      {/* 평균 승인 소요시간 */}
      <KPICard
        title="평균 승인시간"
        value={`${Math.round(summary.averageApprovalTime / 24)}일`}
        subtitle={`${summary.averageApprovalTime}시간`}
        color="yellow"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        trend={{
          type: 'down',
          value: '-0.5일'
        }}
      />

      {/* 대기 중인 템플릿 */}
      <KPICard
        title="대기 중인 템플릿"
        value={`${pendingTemplates}개`}
        subtitle={`전체의 ${pendingPercentage}%`}
        color="indigo"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        trend={{
          type: 'neutral',
          value: '±0개'
        }}
      />
    </div>
  );
}