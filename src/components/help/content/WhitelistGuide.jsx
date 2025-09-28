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
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);

export default function WhitelistGuide() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          화이트리스트 (승인 기준)
        </h1>
        <p className="text-gray-600 leading-relaxed">
          인포톡 템플릿 심사에서 승인되는 내용과 표현 방식을 안내합니다.
          화이트리스트를 참고하여 승인 가능성이 높은 템플릿을 작성하세요.
        </p>
      </header>

      <div className="space-y-8">
        {/* 승인 가능한 메시지 유형 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            승인 가능한 메시지 유형
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CheckIcon className="text-green-600 mr-2" />
                <h3 className="font-medium text-green-900">거래 관련 알림</h3>
              </div>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• 주문 접수 및 확인</li>
                <li>• 결제 완료 안내</li>
                <li>• 배송 시작 및 완료</li>
                <li>• 취소/환불 처리 결과</li>
                <li>• 교환/반품 진행 상황</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CheckIcon className="text-green-600 mr-2" />
                <h3 className="font-medium text-green-900">예약 관련 알림</h3>
              </div>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• 예약 접수 확인</li>
                <li>• 예약 시간 변경 안내</li>
                <li>• 예약 취소 확인</li>
                <li>• 방문 예정 알림</li>
                <li>• 예약 완료 안내</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CheckIcon className="text-green-600 mr-2" />
                <h3 className="font-medium text-green-900">계정 관련 알림</h3>
              </div>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• 회원가입 완료</li>
                <li>• 비밀번호 변경 확인</li>
                <li>• 로그인 알림</li>
                <li>• 정보 수정 확인</li>
                <li>• 탈퇴 처리 완료</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CheckIcon className="text-green-600 mr-2" />
                <h3 className="font-medium text-green-900">서비스 안내</h3>
              </div>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• 이용 방법 안내</li>
                <li>• 정책 변경 공지</li>
                <li>• 시스템 점검 안내</li>
                <li>• 서비스 종료 알림</li>
                <li>• 문의 답변 안내</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 권장 표현 방식 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            권장 표현 방식
          </h2>
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-medium text-blue-900 mb-4">명확하고 구체적인 표현</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">✅ 좋은 예시</h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div className="bg-white p-3 rounded border">
                      "주문번호 #&#123;주문번호&#125;의 상품이 #&#123;날짜&#125;에 배송 시작됩니다."
                    </div>
                    <div className="bg-white p-3 rounded border">
                      "#&#123;고객명&#125;님의 #&#123;날짜&#125; #&#123;시간&#125; 예약이 확정되었습니다."
                    </div>
                    <div className="bg-white p-3 rounded border">
                      "결제 금액 #&#123;금액&#125;원이 정상적으로 처리되었습니다."
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">개선 필요한 표현</h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div className="bg-gray-100 p-3 rounded border">
                      "상품이 곧 배송될 예정입니다." → 언제인지 명시 필요
                    </div>
                    <div className="bg-gray-100 p-3 rounded border">
                      "예약이 접수되었습니다." → 구체적 정보 추가 필요
                    </div>
                    <div className="bg-gray-100 p-3 rounded border">
                      "처리가 완료되었습니다." → 무엇이 처리되었는지 명시
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 승인되는 버튼 텍스트 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            승인되는 버튼 텍스트
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-3">조회/확인 버튼</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 주문조회</li>
                <li>• 배송조회</li>
                <li>• 예약확인</li>
                <li>• 상세보기</li>
                <li>• 내역확인</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-3">이동/연결 버튼</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 홈페이지</li>
                <li>• 고객센터</li>
                <li>• 매장위치</li>
                <li>• 문의하기</li>
                <li>• 앱 실행</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-3">기능/서비스 버튼</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 취소신청</li>
                <li>• 변경요청</li>
                <li>• 리뷰작성</li>
                <li>• 재주문</li>
                <li>• 설정변경</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 권장 이미지 유형 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            권장 이미지 유형
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h3 className="font-medium text-indigo-900 mb-3">✅ 적절한 이미지</h3>
              <ul className="text-sm text-indigo-700 space-y-2">
                <li>• 실제 판매 상품 이미지</li>
                <li>• 브랜드 로고 및 심볼</li>
                <li>• 서비스 관련 아이콘</li>
                <li>• 매장 또는 시설 사진</li>
                <li>• QR 코드 (필요한 경우)</li>
                <li>• 정보 전달용 단순한 일러스트</li>
              </ul>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h3 className="font-medium text-indigo-900 mb-3">🎯 이미지 사용 팁</h3>
              <ul className="text-sm text-indigo-700 space-y-2">
                <li>• 메시지 내용과 관련성이 높은 이미지</li>
                <li>• 과도한 텍스트가 포함되지 않은 이미지</li>
                <li>• 고화질이면서 파일 크기가 적당한 이미지</li>
                <li>• 브랜드 이미지와 일치하는 디자인</li>
                <li>• 다양한 기기에서 선명하게 표시되는 이미지</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 변수 사용 가이드 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            변수 사용 모범 사례
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-medium text-yellow-900 mb-4">권장되는 변수 활용</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium text-gray-900 mb-2">개인화 정보</h4>
                <p className="text-sm text-gray-600 mb-2">고객 이름이나 개인 정보를 적절히 활용</p>
                <code className="text-sm bg-gray-100 p-2 rounded block">
                  "#&#123;고객명&#125;님, 주문해 주셔서 감사합니다."
                </code>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium text-gray-900 mb-2">거래 정보</h4>
                <p className="text-sm text-gray-600 mb-2">주문, 예약, 결제 등의 구체적 정보</p>
                <code className="text-sm bg-gray-100 p-2 rounded block">
                  "주문번호 #&#123;주문번호&#125;의 배송이 #&#123;배송일자&#125;에 시작됩니다."
                </code>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium text-gray-900 mb-2">날짜/시간 정보</h4>
                <p className="text-sm text-gray-600 mb-2">구체적인 일정과 시간 정보</p>
                <code className="text-sm bg-gray-100 p-2 rounded block">
                  "#&#123;날짜&#125; #&#123;시간&#125;에 예약된 #&#123;서비스명&#125; 일정을 확인해 주세요."
                </code>
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
              href="https://kakaobusiness.gitbook.io/main/ad/infotalk/audit/white-list"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm"
            >
              카카오비즈니스 화이트리스트 가이드
              <ExternalLinkIcon className="ml-1" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}