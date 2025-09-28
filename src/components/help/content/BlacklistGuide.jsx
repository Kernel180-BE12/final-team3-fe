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

const AlertTriangleIcon = (props) => (
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
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const XIcon = (props) => (
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
    <path d="M18 6L6 18"></path>
    <path d="M6 6l12 12"></path>
  </svg>
);

export default function BlacklistGuide() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          블랙리스트 (거부 기준)
        </h1>
        <p className="text-gray-600 leading-relaxed">
          인포톡 템플릿 심사에서 거부되는 내용과 표현을 안내합니다.
          블랙리스트에 해당하는 내용을 피하여 승인 가능성을 높이세요.
        </p>
      </header>

      <div className="space-y-8">
        {/* 경고 메시지 */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertTriangleIcon className="text-red-600 mr-3 mt-1" />
            <div>
              <h3 className="font-medium text-red-900 mb-2">중요 안내</h3>
              <p className="text-sm text-red-700">
                아래 내용에 해당하는 템플릿은 심사에서 거부됩니다.
                템플릿 작성 시 반드시 확인하고 피해주세요.
              </p>
            </div>
          </div>
        </div>

        {/* 거부되는 메시지 유형 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            거부되는 메시지 유형
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <XIcon className="text-red-600 mr-2" />
                <h3 className="font-medium text-red-900">광고성 내용</h3>
              </div>
              <ul className="text-sm text-red-700 space-y-2">
                <li>• 할인, 이벤트, 특가 안내</li>
                <li>• 신제품 출시 홍보</li>
                <li>• 매장 오픈 안내</li>
                <li>• 마케팅 캠페인 참여 유도</li>
                <li>• 구매 권유 메시지</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <XIcon className="text-red-600 mr-2" />
                <h3 className="font-medium text-red-900">판촉성 내용</h3>
              </div>
              <ul className="text-sm text-red-700 space-y-2">
                <li>• "지금 주문하세요"</li>
                <li>• "한정 수량", "서둘러 주세요"</li>
                <li>• "무료", "공짜", "증정"</li>
                <li>• "최저가", "최대 할인"</li>
                <li>• 경쟁업체 비교 내용</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <XIcon className="text-red-600 mr-2" />
                <h3 className="font-medium text-red-900">허위/과장 내용</h3>
              </div>
              <ul className="text-sm text-red-700 space-y-2">
                <li>• 사실과 다른 정보</li>
                <li>• 과장된 효과 표현</li>
                <li>• 검증되지 않은 수치</li>
                <li>• 보장할 수 없는 약속</li>
                <li>• 오해를 유발하는 표현</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <XIcon className="text-red-600 mr-2" />
                <h3 className="font-medium text-red-900">부적절한 내용</h3>
              </div>
              <ul className="text-sm text-red-700 space-y-2">
                <li>• 선정적이거나 폭력적인 내용</li>
                <li>• 차별적이거나 혐오적인 표현</li>
                <li>• 정치적 성향 관련 내용</li>
                <li>• 타인의 명예를 훼손하는 내용</li>
                <li>• 불법적인 행위 관련 내용</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 거부되는 표현 예시 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            거부되는 표현 예시
          </h2>
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-medium text-red-900 mb-4">❌ 피해야 할 표현</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-red-800 mb-2">할인/이벤트 관련</h4>
                  <div className="space-y-2 text-sm text-red-700">
                    <div className="bg-white p-3 rounded border border-red-200">
                      "🔥 특가 할인! 지금 바로 주문하세요!"
                    </div>
                    <div className="bg-white p-3 rounded border border-red-200">
                      "한정 수량! 놓치면 후회하는 기회!"
                    </div>
                    <div className="bg-white p-3 rounded border border-red-200">
                      "무료 배송 + 추가 증정품까지!"
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-red-800 mb-2">판매 권유 관련</h4>
                  <div className="space-y-2 text-sm text-red-700">
                    <div className="bg-white p-3 rounded border border-red-200">
                      "구매하세요", "주문하세요"
                    </div>
                    <div className="bg-white p-3 rounded border border-red-200">
                      "최고의 제품을 만나보세요"
                    </div>
                    <div className="bg-white p-3 rounded border border-red-200">
                      "이번 기회를 놓치지 마세요"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 거부되는 버튼 텍스트 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            거부되는 버튼 텍스트
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-medium text-red-900 mb-3">판매 유도 버튼</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• 구매하기</li>
                <li>• 주문하기</li>
                <li>• 바로구매</li>
                <li>• 지금주문</li>
                <li>• 카트담기</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-medium text-red-900 mb-3">이벤트 참여 버튼</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• 이벤트참여</li>
                <li>• 할인받기</li>
                <li>• 쿠폰받기</li>
                <li>• 응모하기</li>
                <li>• 혜택보기</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-medium text-red-900 mb-3">모호한 표현 버튼</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• 자세히보기</li>
                <li>• 더보기</li>
                <li>• 확인하기</li>
                <li>• 클릭</li>
                <li>• 여기를</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 부적절한 이미지 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            부적절한 이미지
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-medium text-orange-900 mb-3">❌ 금지되는 이미지</h3>
              <ul className="text-sm text-orange-700 space-y-2">
                <li>• 할인율, 가격 정보가 포함된 이미지</li>
                <li>• "이벤트", "특가", "세일" 등 텍스트 포함</li>
                <li>• 타인의 저작권을 침해하는 이미지</li>
                <li>• 선정적이거나 부적절한 이미지</li>
                <li>• 허위 정보를 담은 이미지</li>
                <li>• 과도한 텍스트가 포함된 배너형 이미지</li>
              </ul>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-medium text-orange-900 mb-3">⚠️ 주의 사항</h3>
              <ul className="text-sm text-orange-700 space-y-2">
                <li>• 이미지 내 텍스트는 최소한으로 사용</li>
                <li>• 브랜드명, 상품명 정도만 포함 권장</li>
                <li>• 판매 의도가 드러나는 디자인 금지</li>
                <li>• 경쟁업체 비교 내용 포함 금지</li>
                <li>• 과장된 효과나 결과 표현 금지</li>
                <li>• 허위 인증이나 수상 내역 표시 금지</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 자주 하는 실수 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            자주 하는 실수
          </h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-medium text-yellow-900">무의식적인 판매 표현</h3>
              <p className="text-sm text-yellow-700 mt-1">
                정보 전달 목적이지만 무의식적으로 "구매", "주문" 등의 판매 유도 표현을 사용하는 경우
              </p>
              <div className="mt-2 text-xs text-yellow-600">
                💡 "결제가 완료되었습니다" (O) vs "주문해 주세요" (X)
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-medium text-yellow-900">애매한 표현 사용</h3>
              <p className="text-sm text-yellow-700 mt-1">
                "특별한", "최고의", "놀라운" 등 구체적이지 않고 과장으로 해석될 수 있는 표현
              </p>
              <div className="mt-2 text-xs text-yellow-600">
                💡 구체적이고 명확한 정보 위주로 작성
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-medium text-yellow-900">이벤트성 내용 포함</h3>
              <p className="text-sm text-yellow-700 mt-1">
                정보성 메시지에 할인이나 이벤트 정보를 함께 포함하는 경우
              </p>
              <div className="mt-2 text-xs text-yellow-600">
                💡 정보 전달과 판촉 내용은 분리하여 작성
              </div>
            </div>
          </div>
        </section>

        {/* 대안 제시 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            거부 사유별 대안
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-900 mb-2">❌ 거부될 표현</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>"신제품 출시! 지금 주문하세요"</div>
                    <div>"특가 할인 이벤트 참여하세요"</div>
                    <div>"최대 50% 할인 혜택을 받으세요"</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-green-900 mb-2">✅ 승인 가능한 대안</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>"#&#123;상품명&#125; 주문이 접수되었습니다"</div>
                    <div>"예약이 정상적으로 확정되었습니다"</div>
                    <div>"결제 #&#123;금액&#125;원이 완료되었습니다"</div>
                  </div>
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
              href="https://kakaobusiness.gitbook.io/main/ad/infotalk/audit/black-list"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm"
            >
              카카오비즈니스 블랙리스트 가이드
              <ExternalLinkIcon className="ml-1" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}