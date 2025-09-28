// API 요청을 위한 유틸리티 함수

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// 토큰을 포함한 헤더를 자동으로 생성하는 함수
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  console.log('Token 값:', token);
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    console.log('Authorization 헤더 추가됨:', `Bearer ${token}`);
  } else {
    console.log('Token이 없어서 Authorization 헤더 없음');
  }
  
  return headers;
};

// 기본 fetch wrapper
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  // Request 로깅
  console.log('API 요청 시작:', {
    url: url,
    method: config.method || 'GET',
    headers: config.headers,
    body: config.body ? JSON.parse(config.body) : null
  });

  try {
    const response = await fetch(url, config);

    // Response 로깅 (응답 데이터 복사)
    const responseClone = response.clone();
    let responseData = null;

    try {
      responseData = await responseClone.json();
    } catch (e) {
      responseData = await responseClone.text();
    }

    console.log('API 응답 수신:', {
      url: url,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: responseData
    });

    // 401 Unauthorized 처리
    if (response.status === 401) {
      // 토큰이 만료되었거나 유효하지 않음
      console.warn('인증 토큰 만료 - 로그인 페이지로 리다이렉트');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return null;
    }

    return response;
  } catch (error) {
    console.error('API 요청 오류:', {
      url: url,
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
};

// 각 HTTP 메서드별 편의 함수들
export const api = {
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
  
  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT', 
    body: JSON.stringify(data),
  }),
  
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),
};

// 로그아웃 API 호출 (토큰 포함)
export const logout = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
    const url = `${apiUrl}/auth/logout`;
    const requestBody = {
      refreshToken: localStorage.getItem('refreshToken') // 또는 적절한 refresh token
    };

    // Request 로깅
    console.log('로그아웃 API 요청 시작:', {
      url: url,
      method: 'POST',
      headers: getAuthHeaders(),
      body: requestBody
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(requestBody)
    });

    let data = null;
    if (response) {
      data = await response.json();

      // Response 로깅
      console.log('로그아웃 API 응답 수신:', {
        url: url,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: data
      });

      return data;
    }

    console.warn('로그아웃 API 응답 없음');
    return { success: false };
  } catch (error) {
    console.error('로그아웃 오류:', {
      url: `${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/auth/logout`,
      error: error.message,
      stack: error.stack
    });
    return { success: false };
  }
};

// 템플릿 관련 API 함수들
export const templateApi = {
  // 템플릿 생성 API 호출
  generateTemplate: async (requestContent, targetCustomer = '', purpose = '') => {
    try {
      const response = await api.post('/templates', {
        requestContent,
        targetCustomer,
        purpose
      });
      
      if (response && response.ok) {
        const data = await response.json();
        return data;
      }

      if (response && !response.ok) {
        const data = await response.json();
        return data;
      }
      
      throw new Error('템플릿 생성 실패 a');
    } catch (error) {
      console.error('템플릿 생성 오류 a:', error);
      throw error;
    }
  },
  
  // 내 템플릿 목록 조회
  getMyTemplates: async () => {
    try {
      const response = await api.get('/templates/my');

      if (response && response.ok) {
        const data = await response.json();
        return data;
      }

      throw new Error('템플릿 목록 조회 실패');
    } catch (error) {
      console.error('템플릿 목록 조회 오류:', error);
      throw error;
    }
  },

  // 템플릿 승인 요청
  approveTemplate: async (templateId) => {
    try {
      const response = await api.post(`/templates/${templateId}/approve-request`);

      if (response && response.ok) {
        const data = await response.json();
        return data;
      }

      if (response && !response.ok) {
        const data = await response.json();
        return data;
      }

      throw new Error('템플릿 승인 요청 실패');
    } catch (error) {
      console.error('템플릿 승인 요청 오류:', error);
      throw error;
    }
  },

  // 템플릿 목록 조회 API (페이지네이션 및 필터링 지원)
  getTemplates: async (params = {}) => {
    try {
      const { page = 1, size = 10, status = 'APPROVE_REQUESTED' } = params;

      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        status: status  // status는 항상 필수로 전송
      });

      const response = await api.get(`/templates?${queryParams.toString()}`);

      if (response && response.ok) {
        const data = await response.json();
        return data;
      }

      if (response && !response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      throw new Error('템플릿 목록 조회 실패');
    } catch (error) {
      console.error('템플릿 목록 조회 오류:', error);
      throw error;
    }
  }
};

export default api;