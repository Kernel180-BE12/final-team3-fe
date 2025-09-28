import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- 템플릿 페이지 전용 아이콘들 ---
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
const CheckIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const ChevronLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6"/></svg>
);
const ChevronRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>
);


const mockApiResponse = {
  "data": {
    "items": [
      { "id": 32041, "userId": 103, "title": "카페 주문 완료 알림 (긴급)", "content": "안녕하세요, #{고객명}님.\n\n주문이 완료되었습니다.", "status": "APPROVE_REQUESTED", "createdAt": "2025-09-16T23:44:59", "buttons": [{"id": 20116, "name": "주문 상세 보기"}], "variables": [] },
      { "id": 32042, "userId": 103, "title": "주문 완료 안내", "content": "안녕하세요, #{고객명}님.\n\n주문이 완료되었습니다.", "status": "APPROVED", "createdAt": "2025-09-17T15:21:43", "buttons": [{"id": 20117, "name": "자세히 보기"}], "variables": [] },
      { "id": 32043, "userId": 103, "title": "병원 예약 알림", "content": "#{환자명}님, #{병원명} 예약일자 1일 전입니다.", "status": "APPROVED", "createdAt": "2025-09-18T14:00:00", "buttons": [], "variables": [] },
      { "id": 32044, "userId": 103, "title": "배송 출발 안내", "content": "#{고객명}님께서 주문하신 #{상품명}이(가) 발송되었습니다.", "status": "REJECTED", "createdAt": "2025-09-18T18:20:00", "buttons": [], "variables": [] },
      { "id": 32045, "userId": 103, "title": "주말 이벤트 공지", "content": "이번 주말, 특별 할인 이벤트를 진행합니다!", "status": "APPROVE_REQUESTED", "createdAt": "2025-09-19T11:00:00", "buttons": [], "variables": [] },
      { "id": 32046, "userId": 103, "title": "비밀번호 초기화", "content": "#{사이트명} 비밀번호가 초기화되었습니다.", "status": "APPROVED", "createdAt": "2025-09-19T09:05:00", "buttons": [], "variables": [] },
      { "id": 32047, "userId": 103, "title": "구독 갱신 안내", "content": "#{고객명}님의 구독이 만료될 예정입니다.", "status": "REJECTED", "createdAt": "2025-09-20T16:45:00", "buttons": [], "variables": [] },
      { "id": 32048, "userId": 103, "title": "서비스 점검 공지", "content": "더 나은 서비스를 위해 서버 점검이 진행될 예정입니다.", "status": "APPROVED", "createdAt": "2025-09-20T10:00:00", "buttons": [], "variables": [] },
      { "id": 32049, "userId": 103, "title": "신규 상품 입고", "content": "기다리시던 #{상품명}이 재입고되었습니다.", "status": "APPROVE_REQUESTED", "createdAt": "2025-09-21T13:00:00", "buttons": [], "variables": [] },
      { "id": 32050, "userId": 103, "title": "설문조사 참여 요청", "content": "안녕하세요, #{고객명}님. 서비스 개선을 위해 잠시 시간을 내어주세요.", "status": "APPROVED", "createdAt": "2025-09-22T15:00:00", "buttons": [], "variables": [] }
    ],
    "page": 1,
    "size": 10,
    "total": 10
  }
};




const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentPage === number
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </nav>
  );
};


export default function TemplatesPageV3() {
  const user = { email: 'user@example.com' };
  const logout = () => {
    alert('로그아웃 되었습니다.');
  };

  // Header + Footer 레이아웃으로 변경 (AppSidebar 제거)
  
  const [templates, setTemplates] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      setError(null);
      
      // --- 실제 API 호출 로직 (주석 처리됨) ---
      // 나중에 이 부분을 주석 해제하여 사용하세요.
      /*
      try {
        const params = new URLSearchParams({
            page: currentPage,
            size: itemsPerPage,
        });
        if (statusFilter !== 'ALL') {
            params.append('status', statusFilter);
        }
        if (searchTerm) {
            params.append('query', searchTerm);
        }
        
        const response = await fetch(`http://localhost:8580/api/templates?${params.toString()}`);
        if (!response.ok) {
          throw new Error('서버 응답 오류');
        }
        const result = await response.json();
        if (result.success) {
          setTemplates(result.data.items);
          setTotalPages(Math.ceil(result.data.total / result.data.size));
        } else {
          throw new Error(result.message || 'API 요청 실패');
        }
      } catch (err) {
        setError(err.message);
        setTemplates([]); // 에러 발생 시 템플릿 목록을 비웁니다.
      } finally {
        setIsLoading(false);
      }
      */
      
      // --- 목업 데이터를 사용한 시뮬레이션 로직 ---
      // 실제 API를 사용할 때는 이 부분을 삭제하세요.
      setTimeout(() => {
        let filteredItems = mockApiResponse.data.items;

        if (statusFilter !== 'ALL') {
          filteredItems = filteredItems.filter(item => item.status === statusFilter);
        }

        if (searchTerm) {
          filteredItems = filteredItems.filter(
            item =>
              item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.content.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setTotalPages(Math.ceil(filteredItems.length / itemsPerPage));
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setTemplates(filteredItems.slice(startIndex, endIndex));

        setIsLoading(false);
      }, 500);
    };

    fetchTemplates();
  }, [currentPage, statusFilter, searchTerm, itemsPerPage]);


  const handleSearch = () => {
      setCurrentPage(1);
  };


  const handleCopy = async (templateId, content) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(templateId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedId(templateId);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (fallbackErr) {
        alert('템플릿 복사에 실패했습니다.' + fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleDelete = (templateId) => {
    if (window.confirm('정말로 이 템플릿을 삭제하시겠습니까?')) {
        // This would be a DELETE API call in a real app
        const updatedTotal = mockApiResponse.data.total - 1;
        mockApiResponse.data.items = mockApiResponse.data.items.filter(t => t.id !== templateId);
        mockApiResponse.data.total = updatedTotal;
        
        handlePageChange(currentPage); // Refetch current page
    }
  };

  const handlePageChange = (page) => {
      const newTotalPages = Math.ceil(mockApiResponse.data.total / itemsPerPage);
      if(page < 1 || (page > newTotalPages && newTotalPages > 0)) return;
      setCurrentPage(page);
  }
  
  if (isLoading && templates.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-6 py-8 flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center space-x-2 text-gray-500">
            <LoaderIcon />
            <span>데이터를 불러오는 중입니다...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">템플릿 보관함</h1>
            <p className="text-gray-600 mt-1">저장한 템플릿을 관리하고 재사용할 수 있습니다.</p>
          </header>

          <div className="mb-8 space-y-4 p-6 bg-white rounded-lg shadow-sm border">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="템플릿 제목 또는 내용으로 검색..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center space-x-4">
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex-shrink-0 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 py-2 px-3"
                >
                    <option value="ALL">전체 상태</option>
                    <option value="APPROVE_REQUESTED">요청</option>
                    <option value="APPROVED">승인</option>
                    <option value="REJECTED">반려</option>
                </select>
                <button 
                    onClick={handleSearch}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    검색
                </button>
              </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {templates.length > 0 ? (
              templates.map((template) => (
                <div key={template.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg flex flex-col border border-gray-200 transform transition duration-300 hover:-translate-y-1">
                  <div className="p-4 border-b flex justify-between items-center">
                      <div>
                          <h3 className="font-bold text-gray-800 truncate">{template.title}</h3>
                          <p className="text-xs text-gray-400 mt-1">저장일: {template.createdAt.split('T')[0]}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          template.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          template.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                      }`}>
                          {template.status === 'APPROVED' ? '승인' :
                           template.status === 'REJECTED' ? '반려' :
                           '요청'}
                      </span>
                  </div>
                  <div className="p-4 flex-grow bg-[#A9D2F0]">
                      <div className="bg-yellow-400 text-xs text-gray-700 px-3 py-1 rounded-t-md inline-block">
                          알림톡 도착
                      </div>
                      <div className="bg-white p-4 border rounded-b-md rounded-r-md min-h-[150px]">
                          <p className="text-sm text-gray-800 whitespace-pre-wrap">{template.content}</p>
                      </div>
                      {template.buttons && template.buttons.length > 0 && (
                        <div className="bg-white pt-2 space-y-2">
                           {template.buttons.map((button) => (
                               <button 
                                   key={button.id} 
                                   className="w-full text-center py-2 border border-gray-300 rounded-md text-blue-500 font-semibold bg-gray-50 hover:bg-gray-100"
                               >
                                   {button.name}
                               </button>
                           ))}
                       </div>
                      )}
                  </div>
                  <div className="p-4 border-t bg-gray-50 flex space-x-2">
                    <button 
                      onClick={() => handleCopy(template.id, template.content)}
                      className={`flex-1 inline-flex items-center justify-center px-3 py-2 border shadow-sm text-sm font-medium rounded-md transition-colors ${
                        copiedId === template.id
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                      disabled={copiedId === template.id}
                    >
                      {copiedId === template.id ? (
                        <>
                          <CheckIcon className="mr-2 w-4 h-4" /> 복사 완료!
                        </>
                      ) : (
                        <>
                          <CopyIcon className="mr-2 w-4 h-4"/> 복사
                        </>
                      )}
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
              <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== 'ALL' ? '필터링된 결과가 없습니다.' : '표시할 템플릿이 없습니다.'}
                </p>
              </div>
            )}
          </div>
          {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
              </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

