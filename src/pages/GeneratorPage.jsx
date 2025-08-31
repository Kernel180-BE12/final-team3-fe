import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';

// --- 헬퍼 아이콘 컴포넌트들 ---
const ArrowUpIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
);

// --- 1. 오른쪽 미리보기 패널 컴포넌트 ---
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

// --- 2. 왼쪽 챗봇 패널 컴포넌트 ---
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
    <div className="w-full md:w-96 bg-white flex flex-col h-full">
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

// --- 3. 메인 페이지 컴포넌트 (부모) ---
export default function GeneratorPage() {
  // 대화 내용을 저장할 배열 상태
  const [messages, setMessages] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVariables, setShowVariables] = useState(false);

  // AI 생성 요청 핸들러
  const handleGenerate = (prompt) => {
    setIsLoading(true);
    isLoading;
      
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* 앱의 메인 컨테이너 (그림자, 둥근 모서리 적용) */}
        <div className="flex h-[85vh] w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden">
          {/* 왼쪽 챗봇 패널 */}
          <ChatPanel 
            messages={messages}
            onGenerate={handleGenerate}
            onSelectVersion={setSelectedVersion}
          />
          
          {/* 오른쪽 미리보기 영역 */}
          <main className="flex-1 flex flex-col bg-gradient-to-br from-blue-100 via-teal-100 to-green-100">
            {/* 상단 헤더 */}
            <header className="flex justify-end items-center p-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">변수값 표시</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={showVariables} onChange={() => setShowVariables(!showVariables)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium">
                  보관함에 저장
                </button>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium">
                  템플릿 복사
                </button>
              </div>
            </header>
            
            {/* 미리보기 컴포넌트 */}
            <Preview version={selectedVersion} showVariables={showVariables} />
          </main>
        </div>
      </div>
    </div>
  );
}
