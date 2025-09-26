import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';

const ApprovalTrendChart = ({ data }) => {
  const [chartType, setChartType] = useState('line'); // 'line', 'bar', 'composed'
  const [timeRange, setTimeRange] = useState(30); // 30일, 7일, 90일

  if (!data) return null;

  // 최근 N일 데이터 필터링
  const filteredData = data.trends.slice(-timeRange).map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric'
    }),
    successRate: item.approved + item.rejected > 0 ?
      ((item.approved / (item.approved + item.rejected)) * 100).toFixed(1) : 0
  }));

  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600">{entry.dataKey}:</span>
              <span className="font-medium text-gray-900">
                {entry.dataKey === 'successRate' ? `${entry.value}%` : `${entry.value}개`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // 차트 렌더링 함수
  const renderChart = () => {
    const commonProps = {
      data: filteredData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="created" name="생성됨" fill="#FFC107" radius={[2, 2, 0, 0]} />
            <Bar dataKey="approveRequested" name="승인요청" fill="#17A2B8" radius={[2, 2, 0, 0]} />
            <Bar dataKey="approved" name="승인됨" fill="#28A745" radius={[2, 2, 0, 0]} />
            <Bar dataKey="rejected" name="거절됨" fill="#DC3545" radius={[2, 2, 0, 0]} />
          </BarChart>
        );

      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="approved" name="승인됨" fill="#28A745" opacity={0.6} />
            <Bar yAxisId="left" dataKey="rejected" name="거절됨" fill="#DC3545" opacity={0.6} />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="successRate"
              name="승인률(%)"
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        );

      default: // line
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="created"
              name="생성됨"
              stroke="#FFC107"
              strokeWidth={2}
              dot={{ fill: '#FFC107', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="approveRequested"
              name="승인요청"
              stroke="#17A2B8"
              strokeWidth={2}
              dot={{ fill: '#17A2B8', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="approved"
              name="승인됨"
              stroke="#28A745"
              strokeWidth={2}
              dot={{ fill: '#28A745', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="rejected"
              name="거절됨"
              stroke="#DC3545"
              strokeWidth={2}
              dot={{ fill: '#DC3545', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            승인 활동 트렌드
          </h3>
          <div className="flex items-center space-x-2">
            {/* 기간 선택 */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(parseInt(e.target.value))}
              className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={7}>최근 7일</option>
              <option value={30}>최근 30일</option>
              <option value={90}>최근 90일</option>
            </select>

            {/* 차트 타입 선택 */}
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1 text-xs font-medium rounded-l-md border ${
                  chartType === 'line'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                선형
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1 text-xs font-medium border-t border-b ${
                  chartType === 'bar'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                막대
              </button>
              <button
                onClick={() => setChartType('composed')}
                className={`px-3 py-1 text-xs font-medium rounded-r-md border ${
                  chartType === 'composed'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                혼합
              </button>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>

        {/* 기간별 통계 요약 */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-sm text-gray-600">총 생성</div>
            <div className="text-lg font-semibold text-gray-900">
              {filteredData.reduce((sum, item) => sum + item.created, 0)}개
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">총 승인</div>
            <div className="text-lg font-semibold text-green-600">
              {filteredData.reduce((sum, item) => sum + item.approved, 0)}개
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">총 거절</div>
            <div className="text-lg font-semibold text-red-600">
              {filteredData.reduce((sum, item) => sum + item.rejected, 0)}개
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">평균 승인률</div>
            <div className="text-lg font-semibold text-indigo-600">
              {filteredData.length > 0 ?
                (filteredData.reduce((sum, item) => sum + parseFloat(item.successRate || 0), 0) / filteredData.length).toFixed(1)
                : 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalTrendChart;