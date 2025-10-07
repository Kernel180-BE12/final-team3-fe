# SPA 라우팅 404 에러 문제 분석 및 해결방안

## 🚨 문제 상황

### 발생 환경
- **로컬 개발**: `localhost:5173/create` → `/templates` 이동 시 **정상 작동** ✅
- **배포 환경**: `https://www.telosform.shop/create` → `/templates` 이동 시 **404 NOT_FOUND** ❌

### 에러 시나리오
1. 사용자가 `https://www.telosform.shop/create` 페이지에 접속
2. 사이드바에서 "템플릿 목록" 버튼 클릭
3. `/templates` 경로로 이동 시도
4. **404: NOT_FOUND** 에러 발생

## 🔍 원인 분석

### SPA (Single Page Application) vs 서버 라우팅

#### 로컬 개발 환경 (Vite Dev Server)
```
localhost:5173/templates 요청
    ↓
Vite Dev Server가 요청 감지
    ↓
index.html 반환 (SPA 앱 로드)
    ↓
React Router가 클라이언트에서 /templates 경로 처리
    ↓
TemplatesPageV3 컴포넌트 렌더링 ✅
```

#### 배포 환경 (Vercel/Netlify/웹서버)
```
https://www.telosform.shop/templates 요청
    ↓
웹 서버가 /templates 경로에서 파일 검색
    ↓
/templates 디렉토리나 templates 파일이 존재하지 않음
    ↓
404 NOT_FOUND 응답 ❌
```

### 핵심 문제: History API Fallback 누락

**문제**: 웹 서버가 React Router의 클라이언트 사이드 라우팅을 모르고 실제 파일/디렉토리를 찾으려고 시도함

**해결 필요**: 모든 경로 요청을 `index.html`로 리다이렉트하여 React 앱이 라우팅을 처리하도록 설정

## 🛠 해결방안

### 방안 1: Vercel 설정 수정 (현재 환경에 적합) ⭐

#### 현재 vercel.json 문제점
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://54.116.0.21:8080/api/:path*"
    }
  ]
}
```

**문제**: API 프록시만 설정되어 있고, SPA 라우팅 처리 없음

#### 해결된 vercel.json
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://54.116.0.21:8080/api/:path*"
    },
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}
```

**설명**:
- `/api/*` 경로는 백엔드 서버로 프록시
- **나머지 모든 경로**는 `index.html`로 라우팅 (SPA 처리)
- `(?!api/).*` 정규식: "api/"로 시작하지 않는 모든 경로

### 방안 2: Vite 빌드 설정 추가 (백업 방안)

#### vite.config.js 수정
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      }
    }
  },
  // 개발 서버 히스토리 API fallback
  server: {
    host: 'localhost',
    port: 5173,
    open: false,
    historyApiFallback: true, // 추가
    hmr: {
      host: 'localhost',
      port: 5173
    }
  }
})
```

### 방안 3: 다른 호스팅 서비스 대응

#### Netlify (_redirects 파일)
```bash
# public/_redirects
/*    /index.html   200
```

#### Apache (.htaccess 파일)
```apache
# public/.htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Handle Angular and React Router
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx 설정
```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🎯 권장 해결책: Vercel 설정 수정

### 단계별 적용 방법

#### 1단계: vercel.json 수정
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://54.116.0.21:8080/api/:path*"
    },
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}
```

#### 2단계: 배포 및 테스트
```bash
# 변경사항 커밋
git add vercel.json
git commit -m "fix: Add SPA routing fallback for Vercel"
git push

# Vercel 자동 재배포 확인
# 또는 수동 재배포: vercel --prod
```

#### 3단계: 테스트 확인
```
✅ https://www.telosform.shop/templates (직접 접속)
✅ https://www.telosform.shop/create → /templates (내부 이동)
✅ https://www.telosform.shop/dashboard (직접 접속)
✅ 브라우저 새로고침 (F5) 모든 페이지에서
```

## 🔧 추가 최적화 방안

### 1. 404 페이지 개선
```javascript
// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-8">페이지를 찾을 수 없습니다.</p>
        <Link
          to="/dashboard"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          대시보드로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
```

### 2. 라우터에 404 페이지 추가
```javascript
// src/App.jsx에 추가
<Routes>
  {/* 기존 라우트들... */}

  {/* 404 페이지 - 마지막에 추가 */}
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

### 3. 에러 바운더리 추가
```javascript
// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('라우팅 에러:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">페이지 로딩 중 오류가 발생했습니다</h2>
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              새로고침
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## 📊 문제 발생 원인 요약

### 왜 로컬에서는 작동하는가?
- **Vite Dev Server**가 내장된 History API Fallback 제공
- 존재하지 않는 경로 요청 시 자동으로 `index.html` 반환
- React Router가 클라이언트에서 정상 처리

### 왜 배포 환경에서는 실패하는가?
- **정적 파일 서버** (Vercel)가 실제 파일/디렉토리 검색
- `/templates` 경로에 해당하는 파일이 존재하지 않음
- React 앱이 로드되지 않아 라우팅 처리 불가

## ⚡ 즉시 적용 가능한 해결책

### 1. vercel.json 수정 (1분 작업)
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://54.116.0.21:8080/api/:path*"
    },
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. 커밋 및 배포
```bash
git add vercel.json
git commit -m "fix: Add SPA routing fallback to resolve 404 errors"
git push
```

### 3. 테스트
- 배포 완료 후 `https://www.telosform.shop/templates` 직접 접속 테스트
- 사이드바 내비게이션 테스트

**예상 해결 시간**: 5분 이내
**영향 범위**: 모든 클라이언트 사이드 라우팅 정상화

이 해결책을 적용하면 배포 환경에서도 로컬과 동일하게 라우팅이 작동할 것입니다! 🚀