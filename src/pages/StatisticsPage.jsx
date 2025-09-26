import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KPICards from '@/components/statistics/KPICards';
import StatusDistributionChart from '@/components/statistics/StatusDistributionChart';
import ApprovalTrendChart from '@/components/statistics/ApprovalTrendChart';

// Mock 데이터 import
import templateStatistics from '@/data/mock/templateStatistics.json';
import rejectionReasons from '@/data/mock/rejectionReasons.json';
import templateActivity from '@/data/mock/templateActivity.json';

export default function StatisticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 데이터 로딩
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Mock API 호출 시뮬레이션
      setTimeout(() => {
        setData({
          statistics: templateStatistics,
          rejections: rejectionReasons,
          activity: templateActivity
        });
        setLoading(false);
      }, 500);
    };

    loadData();
  }, [selectedPeriod, selectedCategory, selectedStatus]);

  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1">
          <Header />
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-lg shadow">
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow h-80"></div>
                  <div className="bg-white p-6 rounded-lg shadow h-80"></div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1">
        <Header />

        {/* 메인 콘텐츠 */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">

            {/* 헤더 섹션 */}
            <div className="mb-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">템플릿 승인 통계</h1>
                  <p className="mt-2 text-gray-600">
                    템플릿 승인 프로세스 현황과 성과를 분석하여 운영 효율성을 개선하세요
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <div className="flex space-x-3">
                    {/* 기간 선택 */}
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="7d">최근 7일</option>
                      <option value="30d">최근 30일</option>
                      <option value="90d">최근 90일</option>
                      <option value="all">전체 기간</option>
                    </select>

                    {/* 카테고리 필터 */}
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="all">전체 카테고리</option>
                      <option value="주문/배송 알림">주문/배송 알림</option>
                      <option value="시스템 알림">시스템 알림</option>
                      <option value="고객 서비스">고객 서비스</option>
                      <option value="프로모션/마케팅">프로모션/마케팅</option>
                    </select>

                    {/* 상태 필터 */}
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="all">전체 상태</option>
                      <option value="CREATED">생성됨</option>
                      <option value="APPROVE_REQUESTED">승인 요청</option>
                      <option value="APPROVED">승인됨</option>
                      <option value="REJECTED">거절됨</option>
                      <option value="DELETED">삭제됨</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI 카드 섹션 */}
            <KPICards data={data?.statistics} />

            {/* 차트 섹션 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* 상태별 분포 차트 */}
              <StatusDistributionChart data={data?.statistics} />

              {/* 승인 트렌드 차트 */}
              <ApprovalTrendChart data={data?.statistics} />
            </div>

            {/* 최근 활동 섹션 */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  최근 템플릿 활동
                </h3>
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {data?.activity.recentActivity.slice(0, 8).map((activity) => (
                      <li key={activity.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white ${
                              activity.currentStatus === 'APPROVED' ? 'bg-green-500' :
                              activity.currentStatus === 'REJECTED' ? 'bg-red-500' :
                              activity.currentStatus === 'APPROVE_REQUESTED' ? 'bg-blue-500' :
                              activity.currentStatus === 'DELETED' ? 'bg-gray-500' :
                              'bg-yellow-500'
                            }`}>
                              {activity.currentStatus === 'APPROVED' ? '✓' :
                               activity.currentStatus === 'REJECTED' ? '✗' :
                               activity.currentStatus === 'APPROVE_REQUESTED' ? '→' :
                               activity.currentStatus === 'DELETED' ? '−' : '○'}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {activity.templateName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {activity.category} • {activity.previousStatus} → {activity.currentStatus}
                            </p>
                            {activity.reason && (
                              <p className="text-xs text-red-600 mt-1">
                                {activity.reason}
                              </p>
                            )}
                          </div>
                          <div className="flex-shrink-0 text-sm text-gray-500">
                            {new Date(activity.timestamp).toLocaleString('ko-KR', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    더 보기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}