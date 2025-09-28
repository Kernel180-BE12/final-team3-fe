// 채팅 기록 localStorage 관리 유틸리티

const CHAT_HISTORY_KEY = 'jober_chat_history';
const MAX_CHAT_SESSIONS = 10; // 최대 저장할 채팅 세션 수

/**
 * 첫 번째 메시지에서 채팅 제목 생성
 * @param {string} firstMessage - 첫 번째 사용자 메시지
 * @returns {string} - 생성된 제목
 */
const generateTitleFromMessage = (firstMessage) => {
  if (!firstMessage || typeof firstMessage !== 'string') {
    return `대화 ${new Date().toLocaleDateString()}`;
  }

  // 첫 30자만 사용하고 완전한 단어로 자름
  let title = firstMessage.trim().substring(0, 30);
  const lastSpaceIndex = title.lastIndexOf(' ');

  if (lastSpaceIndex > 10) {
    title = title.substring(0, lastSpaceIndex);
  }

  return title.length > 0 ? title + '...' : `대화 ${new Date().toLocaleDateString()}`;
};

/**
 * 상대적 시간 포맷팅
 * @param {string} timestamp - ISO 시간 문자열
 * @returns {string} - 상대적 시간 표현
 */
const formatRelativeTime = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now - time;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return '방금 전';
  } else if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else if (diffDays < 7) {
    return `${diffDays}일 전`;
  } else {
    return time.toLocaleDateString();
  }
};

/**
 * 채팅 기록 저장소 관리 객체
 */
export const chatHistoryStorage = {
  /**
   * 채팅 세션 저장
   * @param {Object} chatSession - 저장할 채팅 세션
   * @param {string} chatSession.title - 채팅 제목 (선택적)
   * @param {Array} chatSession.messages - 메시지 배열
   * @returns {string} - 생성된 채팅 세션 ID
   */
  save: (chatSession) => {
    try {
      if (!chatSession || !chatSession.messages || chatSession.messages.length === 0) {
        console.warn('빈 채팅 세션은 저장하지 않습니다.');
        return null;
      }

      // 사용자 메시지가 있는지 확인
      const hasUserMessage = chatSession.messages.some(msg => msg.type === 'user');
      if (!hasUserMessage) {
        console.warn('사용자 메시지가 없는 세션은 저장하지 않습니다.');
        return null;
      }

      const history = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY) || '[]');

      // 첫 번째 사용자 메시지 찾기
      const firstUserMessage = chatSession.messages.find(msg => msg.type === 'user')?.content || '';

      const newSession = {
        id: chatSession.id || `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: chatSession.title || generateTitleFromMessage(firstUserMessage),
        preview: firstUserMessage.substring(0, 100) + (firstUserMessage.length > 100 ? '...' : ''),
        messages: chatSession.messages,
        messageCount: chatSession.messages.length,
        createdAt: chatSession.createdAt || new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString(),
        tags: chatSession.tags || []
      };

      // 기존 세션 업데이트 또는 새 세션 추가
      const existingIndex = history.findIndex(session => session.id === newSession.id);

      if (existingIndex !== -1) {
        // 기존 세션 업데이트
        history[existingIndex] = newSession;
      } else {
        // 새 세션을 맨 앞에 추가
        history.unshift(newSession);
      }

      // 최대 개수 제한
      const limitedHistory = history.slice(0, MAX_CHAT_SESSIONS);

      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(limitedHistory));

      console.log(`채팅 세션 저장됨: ${newSession.id} (${newSession.title})`);
      return newSession.id;
    } catch (error) {
      console.error('채팅 기록 저장 실패:', error);
      return null;
    }
  },

  /**
   * 모든 채팅 기록 조회
   * @returns {Array} - 채팅 세션 배열 (최신순)
   */
  load: () => {
    try {
      const history = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY) || '[]');
      // 최신순으로 정렬
      return history.sort((a, b) => new Date(b.lastUpdatedAt) - new Date(a.lastUpdatedAt));
    } catch (error) {
      console.error('채팅 기록 조회 실패:', error);
      return [];
    }
  },

  /**
   * 특정 채팅 세션 조회
   * @param {string} sessionId - 채팅 세션 ID
   * @returns {Object|null} - 채팅 세션 또는 null
   */
  get: (sessionId) => {
    try {
      const history = chatHistoryStorage.load();
      return history.find(session => session.id === sessionId) || null;
    } catch (error) {
      console.error('채팅 세션 조회 실패:', error);
      return null;
    }
  },

  /**
   * 채팅 세션 삭제
   * @param {string} sessionId - 삭제할 채팅 세션 ID
   * @returns {boolean} - 삭제 성공 여부
   */
  delete: (sessionId) => {
    try {
      const history = chatHistoryStorage.load();
      const filteredHistory = history.filter(session => session.id !== sessionId);

      if (filteredHistory.length === history.length) {
        console.warn(`삭제할 채팅 세션을 찾을 수 없습니다: ${sessionId}`);
        return false;
      }

      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(filteredHistory));
      console.log(`채팅 세션 삭제됨: ${sessionId}`);
      return true;
    } catch (error) {
      console.error('채팅 세션 삭제 실패:', error);
      return false;
    }
  },

  /**
   * 모든 채팅 기록 삭제
   * @returns {boolean} - 삭제 성공 여부
   */
  clear: () => {
    try {
      localStorage.removeItem(CHAT_HISTORY_KEY);
      console.log('모든 채팅 기록이 삭제되었습니다.');
      return true;
    } catch (error) {
      console.error('채팅 기록 전체 삭제 실패:', error);
      return false;
    }
  },

  /**
   * 채팅 기록 검색
   * @param {string} query - 검색어
   * @returns {Array} - 검색 결과 배열
   */
  search: (query) => {
    try {
      if (!query || query.trim().length === 0) {
        return chatHistoryStorage.load();
      }

      const history = chatHistoryStorage.load();
      const searchTerm = query.toLowerCase().trim();

      return history.filter(session =>
        session.title.toLowerCase().includes(searchTerm) ||
        session.preview.toLowerCase().includes(searchTerm) ||
        session.messages.some(msg =>
          msg.content.toLowerCase().includes(searchTerm)
        )
      );
    } catch (error) {
      console.error('채팅 기록 검색 실패:', error);
      return [];
    }
  },

  /**
   * 저장소 통계 정보
   * @returns {Object} - 통계 정보
   */
  getStats: () => {
    try {
      const history = chatHistoryStorage.load();
      const totalSessions = history.length;
      const totalMessages = history.reduce((sum, session) => sum + session.messageCount, 0);

      // localStorage 사용량 추정 (KB)
      const storageData = localStorage.getItem(CHAT_HISTORY_KEY) || '[]';
      const storageSizeKB = Math.round((storageData.length * 2) / 1024); // UTF-16 고려

      return {
        totalSessions,
        totalMessages,
        storageSizeKB,
        maxSessions: MAX_CHAT_SESSIONS,
        oldestSession: history.length > 0 ? history[history.length - 1].createdAt : null,
        newestSession: history.length > 0 ? history[0].createdAt : null
      };
    } catch (error) {
      console.error('통계 정보 조회 실패:', error);
      return {
        totalSessions: 0,
        totalMessages: 0,
        storageSizeKB: 0,
        maxSessions: MAX_CHAT_SESSIONS,
        oldestSession: null,
        newestSession: null
      };
    }
  }
};

// 유틸리티 함수들 export
export { formatRelativeTime, generateTitleFromMessage };

export default chatHistoryStorage;