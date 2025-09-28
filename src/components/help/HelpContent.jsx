import React from 'react';
import InfotalkGuide from './content/InfotalkGuide';
import ContentGuide from './content/ContentGuide';
import ImageGuide from './content/ImageGuide';
import AuditGuide from './content/AuditGuide';
import WhitelistGuide from './content/WhitelistGuide';
import BlacklistGuide from './content/BlacklistGuide';
import PublicTemplateGuide from './content/PublicTemplateGuide';

const contentComponents = {
  'infotalk': InfotalkGuide,
  'content-guide': ContentGuide,
  'image-guide': ImageGuide,
  'audit': AuditGuide,
  'whitelist': WhitelistGuide,
  'blacklist': BlacklistGuide,
  'public-template': PublicTemplateGuide,
};

// 에러 바운더리 컴포넌트
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Help content error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <div className="text-center text-red-500">
            <h3 className="font-medium mb-2">콘텐츠 로딩 중 오류가 발생했습니다</h3>
            <p className="text-sm text-gray-600">
              이 탭의 내용을 표시할 수 없습니다. 다른 탭을 선택해 주세요.
            </p>
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm">오류 상세 정보</summary>
              <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                {this.state.error?.toString()}
              </pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function HelpContent({ activeTab }) {
  const ContentComponent = contentComponents[activeTab];

  if (!ContentComponent) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">
          <p>선택된 탭의 콘텐츠를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ErrorBoundary>
        <ContentComponent />
      </ErrorBoundary>
    </div>
  );
}