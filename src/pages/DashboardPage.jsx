import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import RecentActivity from '@/components/RecentActivity';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1">
        <Header />

        {/* 메인 콘텐츠 */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                대시보드
              </h2>
              <p className="text-gray-600">
                AI를 활용한 알림톡 메시지를 생성하고 관리하세요.
              </p>
            </div>

            {/* 기능 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* AI 메시지 생성 카드 */}
              <div
                onClick={() => navigate('/create')}
                className="bg-white overflow-hidden shadow rounded-lg cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          새 알림톡 생성
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          AI로 메시지 생성
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="font-medium text-indigo-700">
                      시작하기 →
                    </span>
                  </div>
                </div>
              </div>

              {/* 템플릿 관리 카드 */}
              <div
                onClick={() => navigate('/templates')}
                className="bg-white overflow-hidden shadow rounded-lg cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          메시지 템플릿
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          저장된 템플릿 관리
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="font-medium text-green-700">
                      관리하기 →
                    </span>
                  </div>
                </div>
              </div>

              {/* 템플릿 통계 카드 */}
              <div
                onClick={() => navigate('/statistics')}
                className="bg-white overflow-hidden shadow rounded-lg cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          템플릿 통계
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          승인 현황 분석
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="font-medium text-yellow-700">
                      분석하기 →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 최근 활동 */}
            <RecentActivity showSampleData={true} maxItems={5} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
