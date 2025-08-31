import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      // 사용자 상태
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      // 로그인 액션
      login: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
        });
      },
      
      // 로그아웃 액션
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      
      // 사용자 정보 업데이트
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },
      
      // 로딩 상태 설정
      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'user-storage', // localStorage 키
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }), // 로딩 상태는 제외하고 저장
    }
  )
);

export default useUserStore;