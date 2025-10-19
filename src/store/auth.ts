// src/stores/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { User } from '@/types'



interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    setAuth: (user: User, accessToken: string) => void;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
    updateAuthToken: (accessToken: string) => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isLoading: false,

            setAuth: (user, accessToken) => {
                Cookies.set('auth-token', accessToken, {
                    maxAge: 60 * 60 * 24 * 7,
                    secure: true,
                    sameSite: 'lax',
                    path: '/',
                });

                set({
                    user,
                    accessToken,
                    isAuthenticated: true,
                    isLoading: false,
                });
            },


            logout: () => {
                Cookies.remove('auth-token');
                set({
                    user: null,
                    accessToken: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            },

            updateUser: (userData) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } : null,
                })),

            updateAuthToken: (accessToken) => {
                Cookies.set('auth-token', accessToken, {
                    maxAge: 60 * 60 * 24 * 7,
                    secure: true,
                    sameSite: 'lax',
                    path: '/',
                });

                set({
                    accessToken,
                });
            },

            setLoading: (loading) =>
                set({ isLoading: loading }),
        }),


        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectAccessToken = (state: AuthState) => state.accessToken;