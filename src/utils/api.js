// API 요청을 위한 유틸리티 함수

const API_BASE_URL = 'http://localhost:8580/api';

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
  
  try {
    const response = await fetch(url, config);
    
    // 401 Unauthorized 처리
    if (response.status === 401) {
      // 토큰이 만료되었거나 유효하지 않음
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return null;
    }
    
    return response;
  } catch (error) {
    console.error('API 요청 오류:', error);
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
    const url = 'http://localhost:8580/auth/logout';
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
                refreshToken: localStorage.getItem('refreshToken') // 또는 적절한 refresh token
            })
    });
    if (response) {
      const data = await response.json();
      return data;
    }
    return { success: false };
  } catch (error) {
    console.error('로그아웃 오류:', error);
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
  }
};

export default api;