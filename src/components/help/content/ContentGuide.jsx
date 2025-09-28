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

const CheckIcon = (props) => (
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
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);

const XIcon = (props) => (
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
    <path d="M18 6L6 18"></path>
    <path d="M6 6l12 12"></path>
  </svg>
);

export default function ContentGuide() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          콘텐츠 작성 가이드
        </h1>
        <p className="text-gray-600 leading-relaxed">
          인포톡 메시지 템플릿 작성 시 준수해야 할 가이드라인과 모범 사례를 안내합니다.
          효과적이고 승인 가능한 메시지를 작성하는 방법을 확인하세요.
        </p>
      </header>

      <div className="space-y-8">
        {/* 기본 원칙 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            기본 원칙
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckIcon className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-green-900 mb-1">정보성 내용</h3>
                  <p className="text-sm text-green-700">
                    고객에게 유용한 정보를 제공하는 내용으로 작성
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckIcon className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-green-900 mb-1">명확한 표현</h3>
                  <p className="text-sm text-green-700">
                    이해하기 쉽고 구체적인 내용으로 작성
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <XIcon className="text-red-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-red-900 mb-1">광고성 내용</h3>
                  <p className="text-sm text-red-700">
                    판매, 홍보, 마케팅 목적의 내용은 금지
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <XIcon className="text-red-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-red-900 mb-1">오해 소지</h3>
                  <p className="text-sm text-red-700">
                    모호하거나 오해를 유발할 수 있는 표현 금지
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 텍스트 작성 가이드 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            텍스트 작성 가이드
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">글자 수 제한</h3>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>기본형:</strong> 최대 400자 (공백 포함)</li>
                  <li>• <strong>이미지형:</strong> 최대 400자 (공백 포함)</li>
                  <li>• <strong>버튼명:</strong> 최대 10자</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">권장 표현</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">✅ 좋은 예시</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• "주문이 완료되었습니다"</li>
                    <li>• "배송이 시작되었습니다"</li>
                    <li>• "예약이 확정되었습니다"</li>
                    <li>• "결제가 완료되었습니다"</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">❌ 피해야 할 표현</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• "특가 할인!", "이벤트 진행 중"</li>
                    <li>• "구매하세요", "지금 주문하세요"</li>
                    <li>• "한정 수량", "서둘러 주세요"</li>
                    <li>• "무료", "공짜", "증정"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 변수 사용법 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            변수 사용법
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">변수 형식</h3>
              <p className="text-sm text-gray-600 mb-3">
                변수는 #&#123;변수명&#125; 형태로 사용하며, 영문, 숫자, 언더스코어(_)만 사용 가능합니다.
              </p>
              <div className="bg-white p-3 rounded border text-sm text-gray-700">
                <code>안녕하세요 #&#123;고객명&#125;님, 주문번호 #&#123;주문번호&#125;의 배송이 시작되었습니다.</code>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">자주 사용되는 변수</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded p-4">
                  <h4 className="font-medium text-gray-900 mb-2">고객 정보</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• #&#123;고객명&#125;, #&#123;이름&#125;</li>
                    <li>• #&#123;연락처&#125;, #&#123;전화번호&#125;</li>
                    <li>• #&#123;이메일&#125;</li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded p-4">
                  <h4 className="font-medium text-gray-900 mb-2">주문 정보</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• #&#123;주문번호&#125;, #&#123;주문일시&#125;</li>
                    <li>• #&#123;상품명&#125;, #&#123;수량&#125;</li>
                    <li>• #&#123;금액&#125;, #&#123;배송지&#125;</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 승인 팁 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            승인 가능성을 높이는 팁
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-yellow-600 font-bold mr-3">1.</span>
                <div>
                  <h3 className="font-medium text-yellow-900">명확한 목적 표시</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    메시지의 목적(주문 확인, 배송 안내 등)을 명확히 표현하세요.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-600 font-bold mr-3">2.</span>
                <div>
                  <h3 className="font-medium text-yellow-900">정확한 정보 제공</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    허위 또는 과장된 정보는 포함하지 말고, 사실에 기반한 내용만 작성하세요.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-600 font-bold mr-3">3.</span>
                <div>
                  <h3 className="font-medium text-yellow-900">간결한 표현</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    필요한 정보만 포함하여 간결하고 이해하기 쉽게 작성하세요.
                  </p>
                </div>
              </div>
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
              href="https://kakaobusiness.gitbook.io/main/ad/infotalk/content-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm"
            >
              카카오비즈니스 콘텐츠 가이드
              <ExternalLinkIcon className="ml-1" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}