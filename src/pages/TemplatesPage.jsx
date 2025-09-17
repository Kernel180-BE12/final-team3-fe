import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- 헬퍼 아이콘 컴포넌트들 ---
const PlusCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
);
const LayoutGridIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
);
const UserCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>
);
const SparklesIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3z"/><path d="M3 12L4.5 9.5L7 8L4.5 6.5L3 4"/><path d="M17 20L19.5 18.5L21 16L19.5 13.5L17 12"/></svg>
);
const SlidersHorizontalIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="21" x2="14" y1="4" y2="4"></line><line x1="10" x2="3" y1="4" y2="4"></line><line x1="21" x2="12" y1="12" y2="12"></line><line x1="8" x2="3" y1="12" y2="12"></line><line x1="21" x2="16" y1="20" y2="20"></line><line x1="12" x2="3" y1="20" y2="20"></line><line x1="14" x2="14" y1="2" y2="6"></line><line x1="8" x2="8" y1="10" y2="14"></line><line x1="16" x2="16" y1="18" y2="22"></line></svg>
);
const SettingsIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const LifeBuoyIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" x2="9.17" y1="4.93" y2="9.17"></line><line x1="14.83" x2="19.07" y1="14.83" y2="19.07"></line><line x1="14.83" x2="19.07" y1="9.17" y2="4.93"></line><line x1="4.93" x2="9.17" y1="19.07" y2="14.83"></line></svg>
);
const LogOutIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
);
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
const HomeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);
const MessageSquareIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const ArchiveIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="5" x="2" y="3" rx="1"></rect><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"></path><path d="M10 12h4"></path></svg>
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


const Sidebar = ({ onLogout, user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="w-16 bg-gray-800 text-white flex flex-col items-center z-20">
            <nav className="flex flex-col space-y-2 py-4">
                <div className="relative group flex justify-center">
                    <button className="p-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors">
                        <PlusCircleIcon className="w-6 h-6" />
                    </button>
                    <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        새 템플릿 생성
                    </div>
                </div>
                <div className="relative group flex justify-center">
                    <button className="p-3 rounded-lg hover:bg-gray-700 transition-colors">
                        <LayoutGridIcon className="w-6 h-6 text-gray-400" />
                    </button>
                    <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        템플릿 보관함
                    </div>
                </div>
            </nav>
            <nav className="flex flex-col space-y-2 py-4 border-t border-gray-700">
                <div className="relative group flex justify-center">
                    <a href="/" className="p-3 rounded-lg hover:bg-gray-700 transition-colors">
                        <HomeIcon className="w-6 h-6 text-gray-400" />
                    </a>
                    <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        홈
                    </div>
                </div>
                 <div className="relative group flex justify-center">
                    <button className="p-3 rounded-lg hover:bg-gray-700 transition-colors">
                        <MessageSquareIcon className="w-6 h-6 text-gray-400" />
                    </button>
                    <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        대화 목록
                    </div>
                </div>
                 <div className="relative group flex justify-center">
                    <button className="p-3 rounded-lg hover:bg-gray-700 transition-colors">
                        <ArchiveIcon className="w-6 h-6 text-gray-400" />
                    </button>
                    <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        저장된 항목
                    </div>
                </div>
            </nav>
            <div ref={menuRef} className="relative mt-auto mb-4">
                 <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                 >
                    <UserCircleIcon className="w-8 h-8 text-gray-400" />
                </button>
                {isMenuOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-56 bg-gray-900 text-gray-200 rounded-lg shadow-lg">
                        <div className="p-2">
                            <div className="flex items-center w-full px-3 py-2 text-sm">
                                <UserCircleIcon className="w-5 h-5 mr-3" />
                                <span>{user?.email || 'user@example.com'}</span>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 my-1"></div>
                        <div className="p-2">
                            <a href="#" className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700">
                                 <SparklesIcon className="mr-3" /> <span>플랜 업그레이드</span>
                            </a>
                            <a href="#" className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700">
                                 <SlidersHorizontalIcon className="mr-3" /> <span>템플릿 맞춤 설정</span>
                            </a>
                             <a href="#" className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700">
                                 <SettingsIcon className="mr-3" /> <span>설정</span>
                            </a>
                        </div>
                        <div className="border-t border-gray-700 my-1"></div>
                        <div className="p-2">
                             <a href="#" className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700">
                                 <LifeBuoyIcon className="mr-3" /> <span>도움말</span>
                            </a>
                            <a href="#" onClick={onLogout} className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700">
                                 <LogOutIcon className="mr-3 text-red-500" /> <span className="text-red-500">로그아웃</span>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
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


export default function DashboardPage() {
  const user = { email: 'user@example.com' };
  const logout = () => {
    alert('로그아웃 되었습니다.');
  };
  
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
      <div className="flex h-screen bg-gray-100">
        <Sidebar onLogout={logout} user={user} />
        <main className="flex-1 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-gray-500">
              <LoaderIcon />
              <span>데이터를 불러오는 중입니다...</span>
            </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={logout} user={user} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">템플릿 보관함</h1>
            <p className="text-gray-600 mt-1">저장한 템플릿을 관리하고 재사용할 수 있습니다.</p>
          </header>

          <div className="mb-6 space-y-4 p-4 bg-white rounded-lg shadow">
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


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.length > 0 ? (
              templates.map((template) => (
                <div key={template.id} className="bg-white rounded-lg shadow-md flex flex-col border transform transition duration-300 hover:-translate-y-1">
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
                  <div className="p-4 flex-grow">
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
              <div className="col-span-full text-center py-16 bg-white rounded-lg shadow">
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
    </div>
  );
}

