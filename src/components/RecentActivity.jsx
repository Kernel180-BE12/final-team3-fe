import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityItem from './ActivityItem';
import { SAMPLE_ACTIVITIES } from '@/data/sampleActivities';

const EmptyActivityState = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12">
      <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </div>

      <h4 className="text-lg font-medium text-gray-900 mb-2">
        활동을 시작해보세요!
      </h4>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
        첫 번째 알림톡 템플릿을 생성하면 여기에 활동 내역이 표시됩니다.
      </p>

      <div className="space-y-3">
        <button
          onClick={() => navigate('/create')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <span className="mr-2" role="img" aria-label="목표">🎯</span>
          첫 번째 템플릿 만들기
        </button>

        <div className="text-sm">
          <button
            onClick={() => navigate('/templates')}
            className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
          >
            템플릿 예시 보기 →
          </button>
        </div>
      </div>
    </div>
  );
};

const RecentActivity = ({
  activities = [],
  showSampleData = true,
  maxItems = 5
}) => {
  // 실제 활동이 있으면 사용하고, 없으면 샘플 데이터 사용 (시현용)
  const displayActivities = activities.length > 0
    ? activities.slice(0, maxItems)
    : (showSampleData ? SAMPLE_ACTIVITIES.slice(0, maxItems) : []);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            최근 활동
          </h3>
          {displayActivities.length > 0 && (
            <span className="text-sm text-gray-500">
              {displayActivities.length}개의 활동
            </span>
          )}
        </div>

        {displayActivities.length === 0 ? (
          <EmptyActivityState />
        ) : (
          <div className="flow-root">
            <ul className="-mb-8" role="list">
              {displayActivities.map((activity, index) => (
                <li key={activity.id}>
                  <ActivityItem
                    activity={activity}
                    isLast={index === displayActivities.length - 1}
                  />
                </li>
              ))}
            </ul>

            {/* 더보기 링크 (필요한 경우) */}
            {activities.length > maxItems && (
              <div className="mt-6 text-center">
                <button className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200">
                  모든 활동 보기 ({activities.length}개)
                </button>
              </div>
            )}

            {/* 샘플 데이터 표시 중일 때 알림 (개발용) */}
            {showSampleData && activities.length === 0 && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-xs text-yellow-800">
                  💡 시현용 샘플 데이터가 표시되고 있습니다.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;