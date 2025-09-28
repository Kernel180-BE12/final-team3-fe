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

export default function InfotalkGuide() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          인포톡 서비스 안내
        </h1>
        <p className="text-gray-600 leading-relaxed">
          카카오톡 인포톡은 기업과 고객 간의 효과적인 커뮤니케이션을 위한 비즈니스 메시징 서비스입니다.
          템플릿을 통해 정확하고 신뢰할 수 있는 정보를 전달할 수 있습니다.
        </p>
      </header>

      <div className="space-y-8">
        {/* 서비스 개요 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            서비스 개요
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>인포톡</strong>은 카카오톡 채널을 통해 고객에게 정보성 메시지를 발송할 수 있는 서비스입니다.
                  주문 확인, 배송 안내, 예약 알림 등 다양한 비즈니스 상황에서 활용할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 주요 특징 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            주요 특징
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">높은 도달률</h3>
              <p className="text-gray-600 text-sm">
                카카오톡의 높은 사용률과 알림 시스템을 통해 메시지가 확실하게 전달됩니다.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">템플릿 기반</h3>
              <p className="text-gray-600 text-sm">
                사전 승인된 템플릿을 사용하여 일관성 있고 신뢰할 수 있는 메시지를 발송할 수 있습니다.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">개인화 가능</h3>
              <p className="text-gray-600 text-sm">
                변수를 활용하여 개별 고객에게 맞춤화된 메시지를 발송할 수 있습니다.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">다양한 형태</h3>
              <p className="text-gray-600 text-sm">
                텍스트, 이미지, 버튼 등 다양한 형태의 메시지를 구성할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 메시지 타입 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            메시지 타입
          </h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">기본형 (Basic)</h3>
              <p className="text-gray-600 text-sm mb-2">
                텍스트만으로 구성된 가장 기본적인 메시지 형태입니다.
              </p>
              <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                예시: "주문이 완료되었습니다. 주문번호: #&#123;주문번호&#125;"
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">이미지형 (Image)</h3>
              <p className="text-gray-600 text-sm mb-2">
                이미지와 텍스트를 함께 사용하는 메시지 형태입니다.
              </p>
              <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                예시: 상품 이미지 + "주문하신 상품이 배송 준비 중입니다."
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">버튼형 (Button)</h3>
              <p className="text-gray-600 text-sm mb-2">
                클릭 가능한 버튼을 포함한 메시지 형태입니다.
              </p>
              <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                예시: "배송이 시작되었습니다." + [배송조회] 버튼
              </div>
            </div>
          </div>
        </section>

        {/* 이용 안내 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            이용 안내
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-800 mb-2">주의사항</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 광고성 메시지는 발송할 수 없습니다.</li>
              <li>• 템플릿은 사전 심사를 통과해야 사용 가능합니다.</li>
              <li>• 수신자가 카카오톡 채널을 추가한 상태여야 합니다.</li>
              <li>• 발송량과 발송 시간에 제한이 있을 수 있습니다.</li>
            </ul>
          </div>
        </section>

        {/* 관련 링크 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            관련 문서
          </h2>
          <div className="space-y-2">
            <a
              href="https://kakaobusiness.gitbook.io/main/ad/infotalk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm"
            >
              카카오비즈니스 인포톡 공식 가이드
              <ExternalLinkIcon className="ml-1" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}