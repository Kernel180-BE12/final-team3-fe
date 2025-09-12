import React from 'react';
import { Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";


// 아이콘 컴포넌트 (Lucide 아이콘 스타일의 인라인 SVG)
const BotIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

const CheckCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ClockIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);





// 2. 히어로 섹션 컴포넌트 (HOME-001-SCT-001, BTN-001)
const HeroSection = () => {
    console.log('HeroSection:', new Date().toLocaleTimeString());
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 text-center">
        {/* HOME-001-SCT-001: 핵심 메시지 */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          복잡한 알림톡 템플릿, <br className="hidden md:block" />
          <span className="text-indigo-600">3초 만에 AI가</span> 완성해 드려요
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          소상공인 사장님, 이제 카카오 알림톡 정책 때문에 고민하지 마세요. AI가 규정에 딱 맞는 템플릿을 자동으로 만들어 드립니다.
        </p>
        {/* HOME-001-BTN-001: 무료로 시작하기 (CTA) */}
        <a href="#" className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-indigo-700 transition-transform transform hover:scale-105 inline-block shadow-lg">
          무료로 시작하기
        </a>
      </div>
    </section>
  );
};

// 3. 기능 소개 섹션 컴포넌트 (HOME-001-SCT-002)
const FeatureSection = () => {
  const features = [
    {
      icon: <BotIcon className="w-10 h-10 text-indigo-500" />,
      title: "AI 기반 자동 생성",
      description: "원하는 내용만 입력하면 AI가 카카오 정책을 완벽하게 준수하는 템플릿을 즉시 생성합니다."
    },
    {
      icon: <CheckCircleIcon className="w-10 h-10 text-indigo-500" />,
      title: "100% 규정 준수",
      description: "수십 페이지의 가이드라인을 분석한 AI 덕분에, 반려 걱정 없이 한 번에 템플릿을 승인받을 수 있습니다."
    },
    {
      icon: <ClockIcon className="w-10 h-10 text-indigo-500" />,
      title: "혁신적인 시간 절약",
      description: "템플릿 작성과 검토에 쏟던 시간을 아끼고, 더 중요한 비즈니스에 집중하세요."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">핵심 기능</h2>
          <p className="text-gray-600 mt-2">AI 알림톡 생성기가 제공하는 특별한 기능을 만나보세요.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};





// 메인 랜딩 페이지 컴포넌트
export default function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const appEnv = import.meta.env.VITE_APP_ENV;
  const debugMode = import.meta.env.VITE_DEBUG_MODE;

  console.log('현재 환경:', appEnv);
  console.log('API URL:', apiUrl);
  console.log('디버그 모드:', debugMode);

    console.log('LandingPage 컴포넌트의 App 렌더링:', new Date().toLocaleTimeString());
    return (
        <div className="bg-white font-sans">
            {/* // 1. 헤더 컴포넌트 (HOME-001-HDR) */}
            <Header />
            <main>
                <HeroSection />
                <FeatureSection />
            </main>
             {/* // 4. 푸터 컴포넌트 (HOME-001-FTR-001) */}
            <Footer />
        </div>
    );
}
