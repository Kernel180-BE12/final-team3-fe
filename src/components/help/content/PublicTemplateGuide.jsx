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

const BookIcon = (props) => (
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
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const CopyIcon = (props) => (
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
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

export default function PublicTemplateGuide() {
  const publicTemplates = [
    {
      category: "주문/배송",
      templates: [
        {
          title: "주문 접수 확인",
          content: "#{고객명}님, 주문번호 #{주문번호}로 주문이 접수되었습니다. 주문 내역을 확인해 주세요.",
          variables: ["고객명", "주문번호"]
        },
        {
          title: "배송 시작 안내",
          content: "주문번호 #{주문번호}의 상품이 #{배송일자}에 배송 시작됩니다. 배송 조회를 통해 실시간 위치를 확인하세요.",
          variables: ["주문번호", "배송일자"]
        },
        {
          title: "배송 완료 안내",
          content: "#{고객명}님, 주문하신 상품이 배송 완료되었습니다. 수령 확인 후 리뷰를 남겨주시면 감사하겠습니다.",
          variables: ["고객명"]
        }
      ]
    },
    {
      category: "예약/방문",
      templates: [
        {
          title: "예약 확정 안내",
          content: "#{고객명}님의 #{예약일시} #{서비스명} 예약이 확정되었습니다. 예약 시간 10분 전까지 방문해 주세요.",
          variables: ["고객명", "예약일시", "서비스명"]
        },
        {
          title: "예약 변경 확인",
          content: "예약 일정이 #{변경된일시}로 변경되었습니다. 변경된 예약 정보를 확인해 주세요.",
          variables: ["변경된일시"]
        },
        {
          title: "방문 전 알림",
          content: "#{고객명}님, 내일 #{예약시간}에 예약된 #{서비스명} 일정을 확인해 주세요. 문의사항이 있으시면 연락 바랍니다.",
          variables: ["고객명", "예약시간", "서비스명"]
        }
      ]
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    });
  };

  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          공용 템플릿 가이드
        </h1>
        <p className="text-gray-600 leading-relaxed">
          자주 사용되는 인포톡 템플릿 예시를 제공합니다.
          이 템플릿들을 참고하여 승인 가능성이 높은 메시지를 작성하세요.
        </p>
      </header>

      <div className="space-y-8">
        {/* 사용법 안내 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            공용 템플릿 활용법
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <BookIcon className="text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">활용 방법</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 아래 템플릿을 그대로 사용하거나 필요에 맞게 수정하여 사용</li>
                  <li>• 변수를 실제 데이터로 교체하여 개인화</li>
                  <li>• 브랜드나 서비스 특성에 맞게 문구 조정</li>
                  <li>• 여러 템플릿을 조합하여 새로운 템플릿 생성</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 템플릿 목록 */}
        {publicTemplates.map((category, categoryIndex) => (
          <section key={categoryIndex}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {category.category} 템플릿
            </h2>
            <div className="space-y-4">
              {category.templates.map((template, templateIndex) => (
                <div key={templateIndex} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-medium text-gray-900">{template.title}</h3>
                    <button
                      onClick={() => copyToClipboard(template.content)}
                      className="inline-flex items-center px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                    >
                      <CopyIcon className="mr-1" />
                      복사
                    </button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {template.content}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">사용된 변수:</h4>
                    <div className="flex flex-wrap gap-2">
                      {template.variables.map((variable, varIndex) => (
                        <span
                          key={varIndex}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded"
                        >
                          #{variable}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* 관련 링크 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            관련 문서
          </h2>
          <div className="space-y-2">
            <a
              href="https://kakaobusiness.gitbook.io/main/ad/infotalk/publictemplate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm"
            >
              카카오비즈니스 공용 템플릿 가이드
              <ExternalLinkIcon className="ml-1" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}