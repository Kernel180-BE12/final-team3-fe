import React from 'react';
import { ACTIVITY_CONFIG, formatTimeAgo, getActivityMessage } from '@/data/sampleActivities';

const ActivityItem = ({ activity, isLast = false }) => {
  const config = ACTIVITY_CONFIG[activity.type];
  const timeAgo = formatTimeAgo(activity.timestamp);

  if (!config) {
    return null;
  }

  return (
    <div className="relative pb-8 activity-item">
      {/* 타임라인 연결선 */}
      {!isLast && (
        <span
          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 activity-timeline activity-transition"
          aria-hidden="true"
        />
      )}

      {/* 활동 내용 */}
      <div className="relative flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 activity-transition cursor-pointer">
        {/* 아이콘 */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${config.bgColor} border-2 ${config.borderColor} flex items-center justify-center shadow-sm`}>
          <span className="text-sm" role="img" aria-label={getActivityMessage(activity.type)}>
            {config.icon}
          </span>
        </div>

        {/* 활동 정보 */}
        <div className="flex-1 min-w-0">
          <div className="text-sm">
            <span className={`font-medium ${config.color}`}>
              {getActivityMessage(activity.type)}
            </span>
          </div>

          <div className="mt-1">
            <p className="text-sm font-medium text-gray-900 line-clamp-1">
              "{activity.title}"
            </p>
          </div>

          <div className="mt-1 flex items-center space-x-2 flex-wrap">
            <p className="text-xs text-gray-500">
              {activity.description}
            </p>
            <span className="text-xs text-gray-400">•</span>
            <time className="text-xs text-gray-500" dateTime={activity.timestamp.toISOString()}>
              {timeAgo}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;