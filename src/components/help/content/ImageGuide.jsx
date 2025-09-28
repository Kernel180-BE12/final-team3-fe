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

export default function ImageGuide() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          이미지 사용 가이드
        </h1>
        <p className="text-gray-600 leading-relaxed">
          인포톡 메시지에서 이미지를 사용할 때 준수해야 할 규격과 가이드라인을 안내합니다.
          적절한 이미지 사용으로 메시지의 효과를 높일 수 있습니다.
        </p>
      </header>

      <div className="space-y-8">
        {/* 이미지 규격 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            이미지 규격
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-blue-900 mb-3">파일 형식</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• JPG, PNG 형식 지원</li>
                  <li>• GIF 애니메이션 불가</li>
                  <li>• 투명 배경 PNG 권장</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-blue-900 mb-3">파일 크기</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 최대 파일 크기: 500KB</li>
                  <li>• 권장 크기: 300KB 이하</li>
                  <li>• 압축 최적화 필수</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-blue-900 mb-3">이미지 크기</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 가로: 500px 이상 권장</li>
                  <li>• 세로: 400px 이상 권장</li>
                  <li>• 비율: 5:4 또는 1:1 권장</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-blue-900 mb-3">해상도</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 최소 72dpi</li>
                  <li>• 권장 150dpi 이상</li>
                  <li>• 고해상도 디스플레이 고려</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 이미지 콘텐츠 가이드 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            이미지 콘텐츠 가이드
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-3">✅ 권장 이미지</h3>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• 상품 사진 (실제 판매 상품)</li>
                <li>• 브랜드 로고 및 아이덴티티</li>
                <li>• 정보 전달용 일러스트</li>
                <li>• 서비스 관련 아이콘</li>
                <li>• QR 코드 (필요시)</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-medium text-red-900 mb-3">❌ 금지 이미지</h3>
              <ul className="text-sm text-red-700 space-y-2">
                <li>• 광고성 이미지 (할인, 이벤트)</li>
                <li>• 타인의 저작권 침해 이미지</li>
                <li>• 선정적이거나 폭력적인 이미지</li>
                <li>• 허위 정보를 담은 이미지</li>
                <li>• 과도한 텍스트가 포함된 이미지</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 디자인 권장사항 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            디자인 권장사항
          </h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">1. 가독성 확보</h3>
              <p className="text-sm text-gray-600 mb-2">
                작은 화면에서도 선명하게 보이도록 디자인하세요.
              </p>
              <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
                💡 팁: 단순하고 명확한 디자인이 효과적입니다.
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">2. 브랜드 일관성</h3>
              <p className="text-sm text-gray-600 mb-2">
                브랜드 컬러와 폰트를 일관되게 사용하세요.
              </p>
              <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
                💡 팁: 브랜드 가이드라인에 따라 통일된 디자인을 유지하세요.
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">3. 텍스트 최소화</h3>
              <p className="text-sm text-gray-600 mb-2">
                이미지 내 텍스트는 최소한으로 사용하고, 메시지 텍스트에 의존하세요.
              </p>
              <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
                💡 팁: 이미지는 시각적 보완 역할에 집중하세요.
              </div>
            </div>
          </div>
        </section>

        {/* 최적화 팁 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            이미지 최적화 팁
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-yellow-600 font-bold mr-3">1.</span>
                <div>
                  <h3 className="font-medium text-yellow-900">압축 도구 활용</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    TinyPNG, ImageOptim 등의 도구로 파일 크기를 최적화하세요.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-600 font-bold mr-3">2.</span>
                <div>
                  <h3 className="font-medium text-yellow-900">포맷 선택</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    사진은 JPG, 로고나 아이콘은 PNG를 사용하는 것이 효율적입니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-600 font-bold mr-3">3.</span>
                <div>
                  <h3 className="font-medium text-yellow-900">반응형 고려</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    다양한 화면 크기에서 적절히 표시되도록 비율을 고려하세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 자주 하는 실수 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            자주 하는 실수
          </h2>
          <div className="space-y-3">
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <h3 className="font-medium text-red-900">파일 크기 초과</h3>
              <p className="text-sm text-red-700 mt-1">
                500KB를 초과하는 이미지는 업로드되지 않습니다. 미리 압축하세요.
              </p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <h3 className="font-medium text-red-900">저해상도 이미지</h3>
              <p className="text-sm text-red-700 mt-1">
                너무 작은 이미지는 확대될 때 품질이 떨어져 보입니다.
              </p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <h3 className="font-medium text-red-900">텍스트 과다 포함</h3>
              <p className="text-sm text-red-700 mt-1">
                이미지에 너무 많은 텍스트가 있으면 심사에서 거부될 수 있습니다.
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
              href="https://kakaobusiness.gitbook.io/main/ad/infotalk/content-guide/image"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm"
            >
              카카오비즈니스 이미지 가이드
              <ExternalLinkIcon className="ml-1" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}