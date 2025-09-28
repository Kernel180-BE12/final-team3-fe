import React from 'react';

const ExternalLinkIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15,3 21,3 21,9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const ClockIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12,6 12,12 16,14"></polyline>
  </svg>
);

export default function AuditGuide() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          템플릿 심사 안내
        </h1>
        <p className="text-gray-600 leading-relaxed">
          인포톡 템플릿 심사 프로세스와 기준을 안내합니다.
          심사 과정을 이해하고 승인 가능성을 높이는 방법을 확인하세요.
        </p>
      </header>

      <div className="space-y-8">
        {/* 심사 프로세스 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            심사 프로세스
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <ClockIcon className="text-blue-600 mr-2" />
              <span className="font-medium text-blue-900">평균 심사 기간: 1-3 영업일</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-4 mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-blue-900">템플릿 제출</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    작성한 템플릿을 심사 요청합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-4 mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-blue-900">자동 검수</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    시스템이 기본적인 규칙 위반 사항을 확인합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-4 mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-blue-900">인력 심사</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    전문 심사자가 내용과 규정 준수 여부를 검토합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-4 mt-1">
                  4
                </div>
                <div>
                  <h3 className="font-medium text-blue-900">결과 통보</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    승인 또는 거부 결과와 사유를 안내합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 심사 기준 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            주요 심사 기준
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-3">✅ 승인 기준</h3>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• 정보 전달 목적의 내용</li>
                  <li>• 명확하고 구체적인 표현</li>
                  <li>• 사실에 기반한 정확한 정보</li>
                  <li>• 적절한 변수 사용</li>
                  <li>• 규정된 글자 수 준수</li>
                  <li>• 고객에게 유용한 내용</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-900 mb-3">❌ 거부 기준</h3>
                <ul className="text-sm text-red-700 space-y-2">
                  <li>• 광고, 홍보, 마케팅 내용</li>
                  <li>• 할인, 이벤트 등 판촉 내용</li>
                  <li>• 허위 또는 과장된 정보</li>
                  <li>• 부적절한 표현 사용</li>
                  <li>• 글자 수 제한 초과</li>
                  <li>• 규정에 위반되는 이미지</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 심사 상태 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            심사 상태 안내
          </h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
              <div>
                <h3 className="font-medium text-yellow-900">심사 대기</h3>
                <p className="text-sm text-yellow-700">심사 요청이 접수되어 대기 중입니다.</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
              <div>
                <h3 className="font-medium text-blue-900">심사 중</h3>
                <p className="text-sm text-blue-700">현재 심사가 진행 중입니다.</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <div>
                <h3 className="font-medium text-green-900">승인 완료</h3>
                <p className="text-sm text-green-700">심사가 완료되어 사용할 수 있습니다.</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
              <div>
                <h3 className="font-medium text-red-900">거부</h3>
                <p className="text-sm text-red-700">심사에서 거부되었습니다. 사유를 확인하고 수정 후 재요청하세요.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 심사 통과 팁 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            심사 통과를 위한 팁
          </h2>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-indigo-600 font-bold mr-3">💡</span>
                <div>
                  <h3 className="font-medium text-indigo-900">사전 점검</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    제출 전에 콘텐츠 가이드와 화이트리스트/블랙리스트를 참고하여 자체 점검하세요.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-indigo-600 font-bold mr-3">💡</span>
                <div>
                  <h3 className="font-medium text-indigo-900">명확한 표현</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    모호한 표현보다는 구체적이고 명확한 표현을 사용하세요.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-indigo-600 font-bold mr-3">💡</span>
                <div>
                  <h3 className="font-medium text-indigo-900">고객 관점</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    고객에게 정말 필요하고 유용한 정보인지 고려하여 작성하세요.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-indigo-600 font-bold mr-3">💡</span>
                <div>
                  <h3 className="font-medium text-indigo-900">재심사 활용</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    거부된 경우 사유를 정확히 파악하고 수정하여 재심사를 요청하세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 자주 묻는 질문 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Q. 심사 기간이 얼마나 걸리나요?</h3>
              <p className="text-sm text-gray-600">
                A. 일반적으로 1-3 영업일이 소요되며, 복잡한 내용의 경우 더 오래 걸릴 수 있습니다.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Q. 거부된 템플릿을 수정해서 다시 제출할 수 있나요?</h3>
              <p className="text-sm text-gray-600">
                A. 네, 거부 사유를 반영하여 수정한 후 재심사를 요청할 수 있습니다.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Q. 심사 중에 내용을 수정할 수 있나요?</h3>
              <p className="text-sm text-gray-600">
                A. 심사 중인 템플릿은 수정할 수 없습니다. 심사 완료 후 결과를 확인하고 필요시 재요청하세요.
              </p>
            </div>
          </div>
        </section>

        {/* 관련 링크 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            관련 문서
          </h2>
          <div className="space-y-2">
            <a
              href="https://kakaobusiness.gitbook.io/main/ad/infotalk/audit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm"
            >
              카카오비즈니스 심사 안내
              <ExternalLinkIcon className="ml-1" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}