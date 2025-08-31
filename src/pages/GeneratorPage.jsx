import React, { useState, useEffect, useRef } from 'react';

// --- 헬퍼 아이콘 컴포넌트들 ---
const ArrowUpIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
);
// 사이드바용 새 아이콘들
const PlusCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
);
const LayoutGridIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
);
const UserCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>
);


// --- 1. 사이드바 컴포넌트 ---
const Sidebar = () => {
    // 팝업 메뉴의 표시 상태를 관리하는 state
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // 팝업 외부 클릭 감지를 위한 ref
    const menuRef = useRef(null);

    // 메뉴 외부 클릭 시 닫기 처리
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        // 이벤트 리스너 등록
        document.addEventListener("mousedown", handleClickOutside);
        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="w-16 bg-gray-800 text-white flex flex-col items-center justify-between py-4">
            {/* 상단 메뉴 */}
            <nav className="flex flex-col space-y-4">
                <button className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors">
                    <PlusCircleIcon className="w-6 h-6" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <LayoutGridIcon className="w-6 h-6 text-gray-400" />
                </button>
            </nav>
            {/* 하단 사용자 메뉴 */}
            <div ref={menuRef} className="relative">
                 <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} // 아이콘 클릭 시 메뉴 토글
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                 >
                    <UserCircleIcon className="w-8 h-8 text-gray-400" />
                </button>

                {/* isMenuOpen이 true일 때만 팝업 메뉴를 표시 */}
                {isMenuOpen && (
                    <div className="absolute bottom-full mb-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">템플릿 보관함</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">계정 설정</a>
                        <div className="border-t my-1 border-gray-100"></div>
                        <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">로그아웃</a>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- 2. 오른쪽 미리보기 패널 컴포넌트 ---
const Preview = ({ version, showVariables }) => {
  // 변수 표시 토글에 따라 텍스트를 가공하는 함수
  const formatContent = (content) => {
    if (!content) return '';
    if (showVariables) {
      // 변수를 실제 예시 값으로 치환
      return content
        .replace(/#\{고객명\}/g, '홍길동')
        .replace(/#\{과목명\}/g, '가을학기 오리엔테이션')
        .replace(/#\{연락처\}/g, '010-1234-5678');
    }
    // 변수를 강조 표시
    return content.replace(/(#\{.*?\})/g, '<span class="font-bold text-yellow-700 bg-yellow-200 px-1 rounded-sm">$1</span>');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      {version ? (
        <div className="w-full max-w-sm mx-auto">
          {/* 알림톡 상단 */}
          <div className="bg-yellow-400 text-xs text-gray-700 px-4 py-2 rounded-t-lg">
            알림톡 도착
          </div>
          {/* 알림톡 본문 */}
          <div className="bg-white p-4 space-y-3 border-l border-r border-gray-200">
            <p className="font-bold text-lg">{version.title}</p>
            <p 
              className="text-gray-800 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: formatContent(version.content) }}
            />
          </div>
          {/* 알림톡 버튼 */}
          <div className="bg-white p-4 rounded-b-lg border-t border-gray-200">
            <button className="w-full text-center py-2 border border-gray-300 rounded-md text-blue-500 font-semibold bg-gray-50 hover:bg-gray-100">
              과제 확인하기
            </button>
          </div>
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
const ChatPanel = ({ messages, onGenerate, onSelectVersion }) => {
  const [prompt, setPrompt] = useState('');
  const chatEndRef = useRef(null);

  // 새 메시지가 추가될 때마다 맨 아래로 스크롤
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleGenerateClick = () => {
    if (!prompt.trim()) return;
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
    <div className="w-full md:w-96 bg-white flex flex-col h-full border-r border-gray-200">
      {/* 대화 내용이 표시되는 영역 */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-xs ${msg.type === 'user' ? 'bg-gray-200' : 'bg-white border'}`}>
              {/* 메시지 타입에 따라 다른 UI 렌더링 */}
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
      {/* 메시지 입력 영역 */}
      <div className="p-4 border-t bg-white">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="1"
            className="w-full p-3 pr-12 border rounded-full bg-gray-100 focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="발송하고 싶은 내용을 입력해주세요"
          />
          <button 
            onClick={handleGenerateClick}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 rounded-full p-2"
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
  // 대화 내용을 저장할 배열 상태
  const [messages, setMessages] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVariables, setShowVariables] = useState(false);

  // AI 생성 요청 핸들러
  const handleGenerate = (prompt) => {
    setIsLoading(true);
    
    // 1. 사용자 메시지를 대화에 추가
    const userMessage = { id: Date.now(), type: 'user', text: prompt };
    setMessages(prev => [...prev, userMessage]);

    // 2. AI 응답 시뮬레이션
    setTimeout(() => {
      const newVersionId = messages.filter(m => m.type === 'version').length + 1;
      const newVersionData = {
        id: newVersionId,
        title: '[과제 안내]',
        content: `안녕하세요, #{고객명}학부모님.\n#{과목명} 과제 관련 안내드립니다.\n\n📝 과제명: 과제 제출 안내\n\n문의 사항은 연락처 #{연락처}로 연락 주세요.`
      };

      // 3. AI(봇) 메시지를 대화에 추가 (버전 정보 포함)
      const botMessage = {
        id: Date.now() + 1,
        type: 'version',
        text: `'${prompt}' 문구에 대한 카카오 알림톡 템플릿이 성공적으로 생성되었습니다. 총 3개의 변수가 적용되었습니다.`,
        versionData: newVersionData
      };
      setMessages(prev => [...prev, botMessage]);
      setSelectedVersion(newVersionData); // 새로 생성된 버전을 바로 미리보기에 표시
      setIsLoading(false);
    }, 1500);
  };
  
  // 컴포넌트가 처음 로드될 때 초기 데이터 생성
  useEffect(() => {
    setMessages([
      { id: 1, type: 'bot', text: '템플릿 생성을 위해 추가 정보가 필요합니다. 구체적인 목적, 대상 고객, 포함할 정보를 작성하시고, 마지막에 \'템플릿 생성\' 문구를 함께 입력해 주세요.' }
    ]);
  }, []);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
        {/* 왼쪽 사이드바 */}
        <Sidebar />
        
        {/* 챗봇 패널 */}
        <ChatPanel 
          messages={messages}
          onGenerate={handleGenerate}
          onSelectVersion={setSelectedVersion}
        />
        
        {/* 오른쪽 미리보기 영역 */}
        <main className="flex-1 flex flex-col bg-gradient-to-br from-blue-100 via-teal-100 to-green-100">
          <header className="flex justify-end items-center p-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">변수값 표시</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={showVariables} onChange={() => setShowVariables(!showVariables)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium">
                이 카톡 발송하기
              </button>
            </div>
          </header>
          
          <Preview version={selectedVersion} showVariables={showVariables} />
        </main>
    </div>
  );
}


