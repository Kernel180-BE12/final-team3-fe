import React, { useState, useEffect } from 'react';
import { chatHistoryStorage, formatRelativeTime } from '@/utils/chatHistoryStorage';

// 아이콘 컴포넌트들
const ClockIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const MessageCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const TrashIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 6h18"></path>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const SearchIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

/**
 * 채팅 기록 패널 컴포넌트
 * 사이드바에서 호버 시 표시되는 채팅 기록 목록
 */
const ChatHistoryPanel = ({
  isVisible,
  onSelectChat,
  onDeleteChat,
  className = ""
}) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredHistory, setFilteredHistory] = useState([]);

  // 채팅 기록 로드
  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      try {
        const history = chatHistoryStorage.load();
        setChatHistory(history);
        setFilteredHistory(history);
      } catch (error) {
        console.error('채팅 기록 로드 실패:', error);
        setChatHistory([]);
        setFilteredHistory([]);
      } finally {
        setIsLoading(false);
      }
    }
  }, [isVisible]);

  // 검색 필터링
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredHistory(chatHistory);
    } else {
      const filtered = chatHistoryStorage.search(searchTerm);
      setFilteredHistory(filtered);
    }
  }, [searchTerm, chatHistory]);

  // 채팅 선택 핸들러
  const handleSelectChat = (chatSession) => {
    if (onSelectChat) {
      onSelectChat(chatSession);
    }
  };

  // 채팅 삭제 핸들러
  const handleDeleteChat = (e, sessionId) => {
    e.stopPropagation(); // 선택 이벤트 방지

    if (window.confirm('이 대화를 삭제하시겠습니까?')) {
      const success = chatHistoryStorage.delete(sessionId);
      if (success) {
        // 로컬 상태 업데이트
        const updatedHistory = chatHistory.filter(session => session.id !== sessionId);
        setChatHistory(updatedHistory);
        setFilteredHistory(updatedHistory.filter(session =>
          searchTerm.trim() === '' ||
          session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.preview.toLowerCase().includes(searchTerm.toLowerCase())
        ));

        if (onDeleteChat) {
          onDeleteChat(sessionId);
        }
      } else {
        alert('대화 삭제에 실패했습니다.');
      }
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`absolute left-full ml-2 w-80 bg-white shadow-xl rounded-lg border border-gray-200 transition-all duration-200 z-50 ${className}`}>
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <MessageCircleIcon className="mr-2 text-indigo-600" />
            채팅 기록
          </h3>
          <span className="text-xs text-gray-500">
            {filteredHistory.length}개
          </span>
        </div>

        {/* 검색 입력 */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="대화 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* 채팅 기록 목록 */}
      <div className="max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto mb-2"></div>
            로딩 중...
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchTerm.trim() === '' ? (
              <div>
                <MessageCircleIcon className="mx-auto mb-2 text-gray-300" size={24} />
                <p className="text-sm">저장된 대화가 없습니다</p>
                <p className="text-xs text-gray-400 mt-1">
                  새 템플릿을 생성하면 대화가 자동으로 저장됩니다
                </p>
              </div>
            ) : (
              <div>
                <SearchIcon className="mx-auto mb-2 text-gray-300" size={24} />
                <p className="text-sm">검색 결과가 없습니다</p>
                <p className="text-xs text-gray-400 mt-1">
                  다른 검색어를 시도해보세요
                </p>
              </div>
            )}
          </div>
        ) : (
          filteredHistory.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className="p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* 제목 */}
                  <h4 className="font-medium text-sm text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                    {chat.title}
                  </h4>

                  {/* 미리보기 */}
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {chat.preview}
                  </p>

                  {/* 메타 정보 */}
                  <div className="flex items-center mt-2 text-xs text-gray-400 space-x-3">
                    <span className="flex items-center">
                      <ClockIcon className="mr-1" />
                      {formatRelativeTime(chat.createdAt)}
                    </span>
                    <span className="flex items-center">
                      <MessageCircleIcon className="mr-1" />
                      {chat.messageCount}개
                    </span>
                  </div>
                </div>

                {/* 삭제 버튼 */}
                <button
                  onClick={(e) => handleDeleteChat(e, chat.id)}
                  className="ml-2 p-1 rounded hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="대화 삭제"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 푸터 (통계 정보) */}
      {filteredHistory.length > 0 && (
        <div className="p-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>총 {chatHistory.length}개 대화</span>
            <span>최대 50개까지 저장</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistoryPanel;