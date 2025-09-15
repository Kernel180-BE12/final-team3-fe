import React, { useState, useMemo, useEffect } from 'react';

// 아이콘 컴포넌트 (Lucide 아이콘 스타일의 인라인 SVG)
const SearchIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const CopyIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v2"></path></svg>
);
const TrashIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
);
const LoaderIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);
const AlertTriangleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="17" y2="17"></line></svg>
);

// API 호출 실패 시를 대비한 예시용 목업 데이터
const mockTemplatesForFallback = [
  { id: 1, title: '[부동산 분양 안내]', content: '#{회원명}님, 신규 부동산 분양을 안내드립니다.\n위치: #{위치}\n가격: #{가격}', createdAt: '2025-09-10T23:33:40' },
  { id: 2, title: '[자동차 판매 안내]', content: '#{회원명}님, 자동차 판매를 안내드립니다.\n모델명: #{모델명}\n가격: #{가격}', createdAt: '2025-09-10T23:33:40' },
  { id: 3, title: '[상품 광고]', content: '#{회원명}님, 최신 상품을 만나보세요.\n상품명: #{상품명}\n가격: #{가격}', createdAt: '2025-09-10T23:33:40' },
];


export default function DashboardPage() {
  // 컴포넌트의 상태(State)를 관리합니다.
  const [templates, setTemplates] = useState([]); // 템플릿 목록 (초기값: 빈 배열)
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 컴포넌트가 마운트될 때 서버에서 데이터를 가져옵니다.
  useEffect(() => {
    const fetchTemplates = async () => {
      // [수정됨] API 호출 로직을 주석 처리하고 목업 데이터를 사용합니다.
      // try {
      //   const response = await fetch('http://localhost:8580/api/templates?page=1&size=10&status=REJECTED');
      //   if (!response.ok) {
      //     throw new Error('서버 응답 오류');
      //   }
      //   const result = await response.json();
      //   if (result.success) {
      //     setTemplates(result.data.items);
      //   } else {
      //     throw new Error(result.message || 'API 요청 실패');
      //   }
      // } catch (err) {
      //   console.error("API 호출 실패:", err);
      //   setError("서버 연결에 실패했습니다. 예시 데이터를 표시합니다.");
      //   setTemplates(mockTemplatesForFallback);
      // } finally {
      //   setIsLoading(false);
      // }

      // 목업 데이터를 사용하여 화면을 구성합니다.
      setTimeout(() => { // 실제 로딩처럼 보이게 하기 위해 약간의 딜레이를 줍니다.
        setTemplates(mockTemplatesForFallback);
        setIsLoading(false);
      }, 500);
    };

    fetchTemplates();
  }, []);

  // 검색어에 따라 템플릿 목록을 필터링합니다.
  const filteredTemplates = useMemo(() => {
    if (!searchTerm) return templates;
    return templates.filter(
      (template) =>
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [templates, searchTerm]);

  // 내용 복사 버튼 핸들러
  const handleCopy = (content) => {
    const textArea = document.createElement('textarea');
    textArea.value = content;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert('템플릿 내용이 복사되었습니다.');
    } catch (err) {
      alert('복사에 실패했습니다.' + err);
    }
    document.body.removeChild(textArea);
  };

  // 삭제 버튼 핸들러
  const handleDelete = (templateId) => {
    if (window.confirm('정말로 이 템플릿을 삭제하시겠습니까?')) {
      setTemplates(templates.filter((t) => t.id !== templateId));
    }
  };
  
  // 로딩 중일 때 표시할 UI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-500">
          <LoaderIcon />
          <span>데이터를 불러오는 중입니다...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">템플릿 보관함</h1>
          <p className="text-gray-600 mt-1">저장한 템플릿을 관리하고 재사용할 수 있습니다.</p>
        </header>

        {error && (
            <div className="mb-6 flex items-center space-x-2 text-yellow-800 bg-yellow-100 p-4 rounded-lg">
                <AlertTriangleIcon className="text-yellow-500" />
                <span>{error}</span>
            </div>
        )}

        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="템플릿 제목 또는 내용으로 검색..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg shadow-md flex flex-col border">
                <div className="p-4 border-b">
                    <h3 className="font-bold text-gray-800 truncate">{template.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">저장일: {template.createdAt.split('T')[0]}</p>
                </div>
                <div className="p-4 flex-grow">
                    <div className="bg-yellow-400 text-xs text-gray-700 px-3 py-1 rounded-t-md inline-block">
                        알림톡 도착
                    </div>
                    <div className="bg-white p-4 border rounded-b-md rounded-r-md">
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{template.content}</p>
                    </div>
                </div>
                <div className="p-4 border-t bg-gray-50 flex space-x-2">
                  <button 
                    onClick={() => handleCopy(template.content)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <CopyIcon className="mr-2 w-4 h-4"/> 복사
                  </button>
                  <button 
                    onClick={() => handleDelete(template.id)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                  >
                    <TrashIcon className="mr-2 w-4 h-4"/> 삭제
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-lg shadow">
              <p className="text-gray-500">
                {searchTerm ? `'${searchTerm}'에 대한 검색 결과가 없습니다.` : '표시할 템플릿이 없습니다.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

