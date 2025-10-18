// src/lib/validateAuth.ts
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/auth";
import { apiFetch } from "@/lib/api";
import { ProfileResponse, RefreshTokenResponse } from '@/types';

async function fetchUserProfile(): Promise<ProfileResponse> {
    return await apiFetch<ProfileResponse>("/users/profile");
}

export async function refreshToken(): Promise<string> {
    const res = await apiFetch<RefreshTokenResponse>("/users/refresh-token");
    const newToken = res.data.accessToken;
    useAuthStore.getState().updateAuthToken(newToken);
    return newToken;
}

export async function validateAuth(): Promise<void> {
    const { user, accessToken, setAuth, logout } = useAuthStore.getState();
    const token = accessToken ?? Cookies.get("auth-token");

    if (token && !user) {
        try {
            const userData = await fetchUserProfile();
            setAuth(userData.data, token);
        } catch {
            logout();
            window.location.href = "/login";
        }
        return;
    }

    if (user && !token) {
        logout();
        window.location.href = "/login";
    }
}
