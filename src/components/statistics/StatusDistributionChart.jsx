import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const StatusDistributionChart = ({ data }) => {
  if (!data) return null;

  const { statusDistribution } = data.summary;

  // 차트 데이터 변환
  const chartData = [
    {
      name: '승인됨',
      value: statusDistribution.APPROVED,
      status: 'APPROVED',
      percentage: ((statusDistribution.APPROVED / data.summary.totalTemplates) * 100).toFixed(1)
    },
    {
      name: '승인 요청',
      value: statusDistribution.APPROVE_REQUESTED,
      status: 'APPROVE_REQUESTED',
      percentage: ((statusDistribution.APPROVE_REQUESTED / data.summary.totalTemplates) * 100).toFixed(1)
    },
    {
      name: '생성됨',
      value: statusDistribution.CREATED,
      status: 'CREATED',
      percentage: ((statusDistribution.CREATED / data.summary.totalTemplates) * 100).toFixed(1)
    },
    {
      name: '거절됨',
      value: statusDistribution.REJECTED,
      status: 'REJECTED',
      percentage: ((statusDistribution.REJECTED / data.summary.totalTemplates) * 100).toFixed(1)
    },
    {
      name: '삭제됨',
      value: statusDistribution.DELETED,
      status: 'DELETED',
      percentage: ((statusDistribution.DELETED / data.summary.totalTemplates) * 100).toFixed(1)
    }
  ].filter(item => item.value > 0); // 0인 항목 제거

  // KakaoTalk 스타일 색상 정의
  const COLORS = {
    APPROVED: '#28A745',    // 초록색 - 성공
    APPROVE_REQUESTED: '#17A2B8',  // 파란색 - 진행중
    CREATED: '#FFC107',     // 노란색 - 대기
    REJECTED: '#DC3545',    // 빨간색 - 거절
    DELETED: '#6C757D'      // 회색 - 비활성
  };

  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            개수: <span className="font-medium">{data.value}개</span>
          </p>
          <p className="text-sm text-gray-600">
            비율: <span className="font-medium">{data.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // 커스텀 범례
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700">
              {entry.value} ({entry.payload.value}개)
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            템플릿 상태별 분포
          </h3>
          <div className="text-sm text-gray-500">
            총 {data.summary.totalTemplates}개
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.status]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 상태별 상세 정보 */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
          {chartData.map((item) => (
            <div key={item.status} className="text-center">
              <div
                className="w-4 h-4 rounded-full mx-auto mb-1"
                style={{ backgroundColor: COLORS[item.status] }}
              />
              <div className="text-xs text-gray-600">{item.name}</div>
              <div className="text-sm font-medium text-gray-900">{item.value}개</div>
              <div className="text-xs text-gray-500">{item.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusDistributionChart;