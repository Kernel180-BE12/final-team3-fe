import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { templateApi, logout as apiLogout } from '../utils/api';
import { useAuth } from '../hooks/useAuth';

// --- 헬퍼 아이콘 컴포넌트들 ---
const ArrowUpIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
);
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
// 중간 메뉴를 위한 아이콘
const MessageSquareIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const ArchiveIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="5" x="2" y="3" rx="1"></rect><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"></path><path d="M10 12h4"></path></svg>
);
const HomeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);


// --- 1. 사이드바 컴포넌트 ---
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
            {/* 상단 메뉴 */}
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
            {/* 중간 메뉴 */}
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
            {/* 하단 사용자 메뉴 - mt-auto로 하단에 배치 */}
            <div ref={menuRef} className="relative mt-auto mb-4">
                 <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                 >
                    <UserCircleIcon className="w-8 h-8 text-gray-400" />
                </button>
                {/* 메뉴 팝업 UI 및 위치 */}
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


// --- 2. 오른쪽 미리보기 패널 컴포넌트 ---
const Preview = ({ version, showVariables }) => {
  // 템플릿 변수를 처리하는 함수
  const formatContent = (content) => {
    if (!content) return '';

    // 변수값 표시가 활성화된 경우
    if (showVariables) {
      if (!version.variables || version.variables.length === 0) {
        return content;
      }
      return version.variables.reduce((acc, variable) => {
        return acc.replace(new RegExp(variable.placeholder, 'g'), variable.variableKey);
      }, content);
    }
    
    // 변수값 표시가 비활성화된 경우
    if (version.variables) {
      return version.variables.reduce((acc, variable) => {
        const highlightedVar = `<span class="font-bold text-yellow-700 bg-yellow-200 px-1 rounded-sm">${variable.placeholder}</span>`;
        return acc.replace(new RegExp(variable.placeholder, 'g'), highlightedVar);
      }, content);
    }
    return content;
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      {version ? (
        <div className="w-full max-w-sm mx-auto">
          <div className="bg-yellow-400 text-xs text-gray-700 px-4 py-2 rounded-t-lg">
            알림톡 도착
          </div>
          <div className="bg-white p-4 space-y-3 border-l border-r border-gray-200 max-h-96 overflow-y-auto">
            <p className="font-bold text-lg">{version.title}</p>
            <p 
              className="text-gray-800 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: formatContent(version.content) }}
            />
          </div>
          {version.buttons && version.buttons.length > 0 && (
             <div className="bg-white p-4 rounded-b-lg border-t border-gray-200 space-y-2">
                {version.buttons.map((button) => (
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
      ) : (
        <div className="text-center text-gray-500">
          <p>템플릿을 생성하면<br/>이곳에서 미리볼 수 있어요.</p>
        </div>
      )}
    </div>
  );
};

// --- 3. 왼쪽 챗봇 패널 컴포넌트 ---
const ChatPanel = ({ messages, onGenerate, onSelectVersion, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null); // 입력창 참조를 위한 ref

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // [수정됨] 입력 내용에 따라 textarea 높이를 동적으로 조절하는 로직
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이만큼 높이 설정
    }
  }, [prompt]);


  const handleGenerateClick = () => {
    if (!prompt.trim() || isLoading) return;
    onGenerate(prompt);
    setPrompt('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerateClick();
    }
  };

  return (
    <div className="w-full md:w-[400px] bg-white flex flex-col h-full border-r border-gray-200">
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-xs ${msg.type === 'user' ? 'bg-gray-200' : 'bg-white border'}`}>
              {msg.type === 'version' ? (
                <div>
                  <button 
                    onClick={() => onSelectVersion(msg.versionData)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-full font-bold hover:bg-gray-700 mb-2"
                  >
                    버전 {msg.versionData.id} &gt;
                  </button>
                  <p className="text-sm text-gray-700">{msg.text}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-800">{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 border-t bg-white">
        <div className="relative">
          {/* [수정됨] textarea 스타일 및 기능 변경 */}
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="1"
            className="w-full p-3 pr-12 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-500 resize-none max-h-[12rem]"
            placeholder="발송하고 싶은 내용을 입력해주세요"
          />
          {/* [수정됨] 버튼 위치를 하단에 고정 */}
          <button 
            onClick={handleGenerateClick}
            className="absolute right-3 bottom-3 bg-indigo-600 hover:bg-indigo-700 rounded-full p-2"
          >
            <ArrowUpIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 4. 메인 페이지 컴포넌트 (부모) ---
export default function GeneratorPage() {
  const [messages, setMessages] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVariables, setShowVariables] = useState(false);


  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await apiLogout(); // 백엔드 API 호출
    } catch (error) {
      console.error('백엔드 로그아웃 실패:', error);
    }
	
    logout();
    navigate('/login');
  };

  // AI 생성 요청 핸들러
  const handleGenerate = async (prompt) => {
    setIsLoading(true);
    const userMessage = { id: Date.now(), type: 'user', text: prompt };
    setMessages(prev => [...prev, userMessage]);

    try {
      // templateApi.generateTemplate 호출
      const response = await templateApi.generateTemplate(prompt);

      if (response) {
        const templateData = response.data;
        
        // API 응답을 기존 구조에 맞게 변환
        const newVersionData = {
          templateId: templateData.id || `TPL_${Date.now()}`,
          title: templateData.title || '생성된 템플릿',
          content: templateData.content || '',
          buttons: templateData.buttons || [],
          variables: templateData.variables || []
        };

        const botMessage = {
          id: Date.now() + 1,
          type: 'version',
          text: `'${prompt}' 요청에 대한 템플릿이 생성되었습니다. 총 ${newVersionData.variables.length}개의 변수가 적용되었습니다.`,
          versionData: newVersionData
        };
        setMessages(prev => [...prev, botMessage]);
        setSelectedVersion(newVersionData);
      }

    } catch (error) {
      console.error('템플릿 생성 실패:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: '템플릿 생성 중 오류가 발생했습니다. 네트워크 연결을 확인하고 다시 시도해주세요.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }





    // AI 응답 시뮬레이션 (새로운 JSON 구조 및 예시 값 추가)
    setTimeout(() => {
      const newVersionData = {
        id: messages.filter(m => m.type === 'version').length + 1,
        userId: 123,
        categoryId: "999999",
        title: "카페 주문 완료 알림",
        content: "안녕하세요, #{고객명}님.\n\n주문이 완료되었습니다.\n\n주문 내역: #{주문내용}\n\n픽업 예정 시간: #{픽업시간}\n\n문의사항은 #{카페이름} #{전화번호}로 연락 주세요.\n\n감사합니다.\n",
        imageUrl: null,
        type: "MESSAGE",
        buttons: [
          {
            id: 1,
            name: "자세히 보기",
            ordering: 1,
            linkPc: "https://example.com",
            linkAnd: null,
            linkIos: null
          }
        ],
        variables: [
          { id: 1, variableKey: "카페이름", placeholder: "#{카페이름}", inputType: "TEXT", sampleValue: "감성커피" },
          { id: 2, variableKey: "주문내용", placeholder: "#{주문내용}", inputType: "TEXT", sampleValue: "아이스 아메리카노 1잔" },
          { id: 3, variableKey: "전화번호", placeholder: "#{전화번호}", inputType: "TEXT", sampleValue: "02-1234-5678" },
          { id: 4, variableKey: "고객명", placeholder: "#{고객명}", inputType: "TEXT", sampleValue: "홍길동" },
          { id: 5, variableKey: "픽업시간", placeholder: "#{픽업시간}", inputType: "TEXT", sampleValue: "10분 후" }
        ],
        industry: [{ id: 9, name: "기타" }],
        purpose: [{ id: 1, name: "공지/안내" }, { id: 2, name: "예약알림/리마인드" }]
      };

      const botMessage = {
        id: Date.now() + 1,
        type: 'version',
        text: `'${prompt}' 요청에 대한 템플릿이 생성되었습니다. 총 ${newVersionData.variables.length}개의 변수가 적용되었습니다.`,
        versionData: newVersionData
      };
      setMessages(prev => [...prev, botMessage]);
      setSelectedVersion(newVersionData);
      setIsLoading(false);
    }, 1500);
  };
  
  useEffect(() => {
    setMessages([
      { id: 1, type: 'bot', text: '템플릿 생성을 위해 추가 정보가 필요합니다. 구체적인 목적, 대상 고객, 포함할 정보를 작성하시고, 마지막에 \'템플릿 생성\' 문구를 함께 입력해 주세요.' }
    ]);
  }, []);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
        <Sidebar onLogout={handleLogout} user={user} />
        <ChatPanel 
          messages={messages}
          onGenerate={handleGenerate}
          onSelectVersion={setSelectedVersion}
        />
        <main className="flex-1 flex flex-col bg-gradient-to-br from-blue-100 via-teal-100 to-green-100">
          <header className="flex justify-end items-center p-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">변수값 표시</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={showVariables} onChange={() => setShowVariables(!showVariables)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium">
                이 카톡 승인하기
              </button>
            </div>
          </header>
          <Preview version={selectedVersion} showVariables={showVariables} />
        </main>
    </div>
  );
}

